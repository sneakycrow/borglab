use tracing::{event, Level};
use twitch_irc::{ClientConfig, SecureTCPTransport, TwitchIRCClient};
use twitch_irc::login::StaticLoginCredentials;
use twitch_irc::message::ServerMessage::Privmsg;

pub(crate) async fn connect_to_twitch_chat(streamer: String) {
    // initializes the bot configuration
    let bot_config = ClientConfig::default();
    let (mut incoming_messages, client) =
        TwitchIRCClient::<SecureTCPTransport, StaticLoginCredentials>::new(bot_config);

    // Create the handler for receiving messages. This is where you can configure what to do with a message
    let join_handle = tokio::spawn(async move {
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