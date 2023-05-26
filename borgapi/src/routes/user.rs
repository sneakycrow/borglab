use axum::http::StatusCode;
use axum::Json;
use chrono::Utc;
use sea_orm::prelude::Uuid;
use sea_orm::ActiveValue::Set;
use sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter, QuerySelect};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use tracing::{error, info};

use entity::{avatar, viewer};

use crate::routes::connect;

// the input to our `create_user` handler
#[derive(Deserialize)]
pub(crate) struct CreateUser {
    username: String,
}

// the output to our `create_user` handler
#[derive(Serialize)]
pub(crate) struct User {
    id: Uuid,
    username: String,
}

pub(crate) async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<()>) {
    info!("New viewer attempting to register {}", payload.username);
    // insert your application logic here
    let viewer = viewer::ActiveModel {
        id: Set(Uuid::new_v4()),
        username: Set(payload.username),
        created_at: Set(Utc::now()),
        updated_at: Set(Utc::now()),
    };

    // create db connection
    let db = connect().await.unwrap();

    // insert viewer into db
    match viewer.insert(&db).await {
        Ok(_) => {
            db.close().await.unwrap();
            (StatusCode::CREATED, Json(()))
        }
        Err(err) => {
            db.close().await.unwrap();
            error!("Failed to register user: {}", err);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(()))
        }
    }
}

pub(crate) async fn get_users() -> (StatusCode, Json<Value>) {
    use viewer::Entity as Viewer;

    let db = connect().await.unwrap();
    let viewers: Vec<(Value, Option<Value>)> = Viewer::find()
        .find_also_related(avatar::Entity)
        .select_only()
        .columns([
            viewer::Column::Username,
            viewer::Column::CreatedAt,
            viewer::Column::UpdatedAt,
        ])
        .into_json()
        .all(&db)
        .await
        .unwrap();
    db.close().await.unwrap();
    (StatusCode::OK, Json(json!({ "viewers": viewers })))
}

#[derive(Deserialize)]
pub(crate) struct SaveAvatar {
    viewer_id: String,
    structure: Value,
}

pub(crate) async fn save_avatar(Json(payload): Json<SaveAvatar>) -> (StatusCode, Json<()>) {
    use viewer::Entity as Viewer;
    let db = connect().await.unwrap();
    // Get viewer
    // Save avatar
    let viewer: Option<viewer::Model> = Viewer::find()
        .filter(viewer::Column::Id.eq(payload.viewer_id))
        .one(&db)
        .await
        .expect("Failed querying database for viewer");

    match viewer {
        Some(viewer) => {
            let avatar = avatar::ActiveModel {
                id: Set(Uuid::new_v4()),
                viewer_id: Set(viewer.id),
                structure: Set(payload.structure),
                created_at: Set(Utc::now()),
                updated_at: Set(Utc::now()),
            };
            avatar.insert(&db).await.expect("Failed to insert avatar");
            db.close().await.unwrap();
            (StatusCode::CREATED, Json(()))
        }
        None => {
            db.close().await.unwrap();
            (StatusCode::NOT_FOUND, Json(()))
        }
    }
}
