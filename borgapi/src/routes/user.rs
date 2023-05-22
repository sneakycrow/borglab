use axum::http::StatusCode;
use axum::Json;
use sea_orm::prelude::Uuid;
use sea_orm::ActiveModelTrait;
use sea_orm::ActiveValue::Set;
use serde::{Deserialize, Serialize};

use entity::viewer;

use crate::routes::connect;

// the input to our `create_user` handler
#[derive(Deserialize)]
pub(crate) struct CreateUser {
    username: String,
}

pub(crate) async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<()>) {
    // insert your application logic here
    let viewer = viewer::ActiveModel {
        id: Set(Uuid::new_v4()),
        username: Set(payload.username),
        created_at: Default::default(),
        updated_at: Default::default(),
    };

    // create db connection
    let db = connect().await.unwrap();

    // insert viewer into db
    match viewer.insert(&db).await {
        Ok(_) => (StatusCode::CREATED, Json(())),
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(())),
    }
}

// the output to our `create_user` handler
#[derive(Serialize)]
pub(crate) struct User {
    id: Uuid,
    username: String,
}
