use tracing::info;
use tracing_subscriber::EnvFilter;

mod stream;

const DEFAULT_STREAMER: &'static str = "charborg";

#[tokio::main]
pub async fn main() {
    std::env::set_var("RUST_LOG", "info");
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::from_default_env()
                .add_directive("chat_messages=info".parse().unwrap())
                .add_directive("twitch_irc=off".parse().unwrap()),
        )
        .with_target(true)
        .with_timer(tracing_subscriber::fmt::time::UtcTime::rfc_3339()).init();

    let streamer = std::env::var("STREAMER").unwrap_or(DEFAULT_STREAMER.to_owned());
    info!("Connecting to streamer: {}", streamer);
    stream::connect_to_twitch_chat(streamer).await;
}
