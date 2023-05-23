use std::collections::HashMap;
use tracing::info;
use tracing::{event, Level};
use twitch_irc::login::StaticLoginCredentials;
use twitch_irc::message::ServerMessage::Privmsg;
use twitch_irc::{ClientConfig, SecureTCPTransport, TwitchIRCClient};

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
                            info!("New viewer attempting to register {}", msg.sender.name);
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

/// Utility function for grabbing the API_URL from the environment
fn get_api_url() -> String {
    std::env::var("API_URL").expect("API_URL must be set")
}

/// Utility function for sending a registration request to the borgapi
async fn register_user() -> Result<(), reqwest::Error> {
    let mut map = HashMap::new();
    map.insert("lang", "rust");
    map.insert("body", "json");

    let client = reqwest::Client::new();
    let register_endpoint = format!("{}/register", get_api_url());
    client.post(register_endpoint).json(&map).send().await?;

    Ok(())
}
