use chrono::Utc;
use sea_orm::entity::prelude::*;
use sea_orm::ActiveValue::Set;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "avatars")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: Uuid,
    pub structure: Json,
    pub created_at: DateTimeUtc,
    pub updated_at: DateTimeUtc,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::viewer::Entity",
        from = "Column::Id",
        to = "super::viewer::Column::Id"
    )]
    Viewer,
}

impl Related<super::viewer::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Viewer.def()
    }
}

impl ActiveModelBehavior for ActiveModel {
    /// Create a new ActiveModel with default values. Also used by `Default::default()`.
    fn new() -> Self {
        Self {
            id: Set(Uuid::new_v4()),
            structure: Set(serde_json::json!({})),
            created_at: Set(Utc::now()),
            updated_at: Set(Utc::now()),
            ..ActiveModelTrait::default()
        }
    }
}
