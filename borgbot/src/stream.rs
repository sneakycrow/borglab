use std::time::Duration;

use chrono::Utc;
use sea_orm::ActiveValue::Set;
use sea_orm::{ActiveModelTrait, NotSet};
use sea_orm::{ConnectOptions, Database, DatabaseConnection, DbErr};
use tracing::log;
use tracing::{event, Level};
use twitch_irc::login::StaticLoginCredentials;
use twitch_irc::message::ServerMessage::Privmsg;
use twitch_irc::{ClientConfig, SecureTCPTransport, TwitchIRCClient};
use uuid::Uuid;

/// Function for making a connection to the database, automatically configured and pooled
pub(crate) async fn connect() -> Result<DatabaseConnection, DbErr> {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let mut opt = ConnectOptions::new(db_url);
    opt.max_connections(100)
        .min_connections(5)
        .connect_timeout(Duration::from_secs(8))
        .acquire_timeout(Duration::from_secs(8))
        .idle_timeout(Duration::from_secs(8))
        .max_lifetime(Duration::from_secs(8))
        .sqlx_logging(true)
        .sqlx_logging_level(log::LevelFilter::Info);

    Database::connect(opt).await
}

pub(crate) async fn connect_to_twitch_chat(streamer: String) {
    // initializes the bot configuration
    let bot_config = ClientConfig::default();
    let (mut incoming_messages, client) =
        TwitchIRCClient::<SecureTCPTransport, StaticLoginCredentials>::new(bot_config);
    let mut sender = client.clone();
    // Create the handler for receiving messages. This is where you can configure what to do with a message
    let join_handle = tokio::spawn(async move {
        sender = sender.to_owned();
        while let Some(message) = incoming_messages.recv().await {
            match message {
                Privmsg(msg) => {
                    event!(
                        target: "chat_messages",
                        Level::INFO,
                        channel = msg.channel_login,
                        sender = msg.sender.name,
                        text = msg.message_text,
                        server_timestamp = msg.server_timestamp.to_string(),
                        id = msg.message_id,
                    );
                    match msg.message_text {
                        _text if msg.message_text.to_lowercase().contains("!register") => {
                            let new_viewer = entity::viewer::ActiveModel {
                                id: Set(Uuid::new_v4()),
                                username: Set(msg.sender.name),
                                created_at: Set(Utc::now()),
                                updated_at: Set(Utc::now()),
                            };
                            let db = connect().await.unwrap();
                            match new_viewer.insert(&db).await {
                                Ok(_) => {
                                    event!(Level::INFO, "viewer registered");
                                }
                                Err(e) => {
                                    event!(Level::ERROR, "viewer registration failed: {:?}", e);
                                }
                            };
                        }
                        _ => {}
                    }
                }
                _ => {}
            }
        }
    });

    // Tell our client to initialize the connection to sodapoppin
    client.join(streamer).unwrap();

    // initialize our message receiver
    join_handle.await.unwrap();
}

#[derive(Debug)]
struct CustomTokenStorage {}

// #[async_trait]
// impl TokenStorage for CustomTokenStorage {
//     type LoadError = ();
//     type UpdateError = ();
//
//     async fn load_token(&self) -> Result<Option<String>, Self::LoadError> {
//         Ok(None)
//     }
//
//     async fn update_token(&self, _: &str) -> Result<(), Self::UpdateError> {
//         Ok(())
//     }
// }
