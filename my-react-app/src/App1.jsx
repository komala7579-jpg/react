import { useRef, useState } from "react";

function App() {
  const audioRef = useRef(null);
  const youtubeRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isYouTube, setIsYouTube] = useState(false);

  const getYouTubeVideoId = (url) => {
        const normalizedUrl = url.trim();

    try {
      const parsed = new URL(normalizedUrl.startsWith("http") ? normalizedUrl : `https://${normalizedUrl}`);
      const host = parsed.hostname.replace(/^www\./, "");
      const path = parsed.pathname;

      if (host === "youtu.be") {
        return path.slice(1);
      }

      if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
        if (path.startsWith("/watch")) {
          return parsed.searchParams.get("v");
        }
        if (path.startsWith("/embed/") || path.startsWith("/v/") || path.startsWith("/shorts/")) {
          return path.split("/")[2];
        }
      }
    } catch {
      // ignore invalid URL and fall back to regex
    }

    const match = normalizedUrl.match(
      /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)?([A-Za-z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleChange = (e) => {
    const nextUrl = e.target.value;
    setAudioUrl(nextUrl);
    setMessage("");
    setIsYouTube(false);
  };

  const handlePlay = () => {
    if (!audioUrl.trim()) {
      setMessage("Please enter a valid audio URL.");
      return;
    }

    const videoId = getYouTubeVideoId(audioUrl);
    if (videoId) {
      setIsYouTube(true);
      setMessage("Playing audio...");
      return;
    }

    setIsYouTube(false);
    if (audioRef.current) {
      // Only load if URL changed, otherwise resume from pause
      if (audioRef.current.src !== audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
      }
      audioRef.current
        .play()
        .then(() => setMessage("Now playing your track."))
        .catch(() =>
          setMessage("Playback blocked by the browser. Use the audio controls to start it.")
        );
    }
  };

  const handlePause = () => {
    if (isYouTube && youtubeRef.current) {
      youtubeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        "*"
      );
      setMessage("Playback paused.");
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      setMessage("Playback paused.");
    }
  };

  const handleStop = () => {
    if (isYouTube && youtubeRef.current) {
      youtubeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "stopVideo", args: [] }),
        "*"
      );
      setMessage("Playback stopped.");
      
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setMessage("Playback stopped.");
    }
  };

  return (
    <div className="app-shell">
      <main className="hero">
        <section className="hero-card">
          <div className="hero-header">
            <span className="eyebrow">React Audio Player</span>
            <h1>Enjoy audio in a modern interface.</h1>
            <p>
              Paste any valid MP3 or podcast URL below and play it instantly with
              a sleek, minimal design.
            </p>
          </div>

          <div className="hero-player">
            <div className="input-group">
              <input
                type="text"
                placeholder="Paste audio URL here..."
                value={audioUrl}
                onChange={handleChange}
              />
              <button type="button" onClick={handlePlay}>
                Play
              </button>
              <button type="button" className="secondary-button" onClick={handlePause}>
                Pause
              </button>
              <button type="button" className="secondary-button" onClick={handleStop}>
                Stop
              </button>
            </div>

            {message && <p className="message">{message}</p>}

            <div className="audio-box">              {isYouTube && getYouTubeVideoId(audioUrl) ? (
                <iframe
                  ref={youtubeRef}
                  className="youtube-audio-iframe"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(audioUrl)}?autoplay=1&controls=0&enablejsapi=1&showinfo=0&rel=0`}
                  title="YouTube audio player"
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <audio ref={audioRef} src={audioUrl} controls preload="none" />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;