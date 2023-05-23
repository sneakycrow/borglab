use crate::sea_orm::NotSet;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Viewers::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Viewers::Id).uuid().not_null().primary_key())
                    .col(
                        ColumnDef::new(Viewers::Username)
                            .string()
                            .unique_key()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Viewers::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Viewers::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Viewers::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Viewers {
    Table,
    Id,
    Username,
    CreatedAt,
    UpdatedAt,
}
