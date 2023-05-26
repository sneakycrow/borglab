pub use sea_orm_migration::prelude::*;

mod m20230522_231609_create_viewer_table;
mod m20230526_010150_create_avatar_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20230522_231609_create_viewer_table::Migration),
            Box::new(m20230526_010150_create_avatar_table::Migration),
        ]
    }
}
