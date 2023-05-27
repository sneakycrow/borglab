use sea_orm_migration::prelude::*;

use super::m20230522_231609_create_viewer_table::Viewers;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Avatars::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Avatars::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Avatars::ViewerId).uuid().not_null())
                    .col(ColumnDef::new(Avatars::Structure).json_binary().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_avatar_viewer")
                            .from(Avatars::Table, Avatars::Id)
                            .to(Viewers::Table, Viewers::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Avatars::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Avatars {
    Table,
    Id,
    ViewerId,
    Structure,
}
