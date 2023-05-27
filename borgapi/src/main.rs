use std::env;
use std::net::SocketAddr;

use axum::{
    routing::{get, post},
    Router,
};
use tracing::info;
use tracing_subscriber::EnvFilter;

use migration::{Migrator, MigratorTrait};

mod routes;

const DEFAULT_PORT: &str = "8000";

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_target(true)
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    // Initialize connection to the database
    let db = routes::connect()
        .await
        .expect("Failed to connect to database");
    // Migrate the database
    Migrator::up(&db, None)
        .await
        .expect("Failed to migrate database");

    let app = Router::new()
        .route("/", get(root))
        .route("/users", get(routes::user::get_users))
        .route("/users", post(routes::user::create_user))
        .route("/users/avatar", post(routes::user::save_avatar));

    // Create address based on localhost and specified port
    let addr = SocketAddr::from(([0, 0, 0, 0], get_port()));

    // Start axum server on specified address
    info!("Starting borger api to http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

/// Function for dynamically gathering the port based on the PORT env variable or falling back to the DEFAULT_PORT
fn get_port() -> u16 {
    env::var("PORT")
        .unwrap_or(DEFAULT_PORT.to_string())
        .parse()
        .expect("Need a number for the port")
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, World!"
}
