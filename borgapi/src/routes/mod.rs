use std::time::Duration;

use sea_orm::{ConnectOptions, Database, DatabaseConnection, DbErr};
use tracing::log;

pub(crate) mod user;

/// Function for making a connection to the database, automatically configured and pooled
pub(crate) async fn connect() -> Result<DatabaseConnection, DbErr> {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let mut opt = ConnectOptions::new(db_url);
    opt.max_connections(10)
        .min_connections(5)
        .connect_timeout(Duration::from_secs(30))
        .acquire_timeout(Duration::from_secs(90))
        .idle_timeout(Duration::from_secs(30))
        .max_lifetime(Duration::from_secs(30))
        .sqlx_logging(true)
        .sqlx_logging_level(log::LevelFilter::Info);

    Database::connect(opt).await
}
