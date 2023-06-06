use tracing::{debug, info};
use tracing_appender::non_blocking::WorkerGuard;
use tracing_subscriber::fmt::writer::MakeWriterExt;
use tracing_subscriber::{fmt, layer::SubscriberExt, Layer};

mod stream;

const DEFAULT_STREAMER: &'static str = "charborg";

#[tokio::main]
pub async fn main() {
    let _guard = init_tracing();

    let streamer = std::env::var("STREAMER").unwrap_or(DEFAULT_STREAMER.to_owned());
    info!("Connecting to streamer: {}", streamer);
    stream::connect_to_twitch_chat(streamer).await;
}

fn init_tracing() -> WorkerGuard {
    let file_appender = tracing_appender::rolling::hourly("./_data/", "log_chat_messages");
    let (file_writer, guard) = tracing_appender::non_blocking(file_appender);
    tracing::subscriber::set_global_default(
        fmt::Subscriber::builder()
            // subscriber configuration
            .with_env_filter("chat_messages=")
            .with_timer(tracing_subscriber::fmt::time::UtcTime::rfc_3339())
            .with_target(true)
            .compact()
            .finish()
            // add additional writers
            .with(fmt::Layer::default().with_writer(file_writer).json()),
    )
    .expect("Unable to set global tracing subscriber");
    debug!("Tracing initialized.");
    guard
}
