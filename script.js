// === Background Music (Auto Play + Fade In) ===
const music = document.getElementById("bg-music");
music.volume = 0; // start silent
music.loop = true;

window.addEventListener("load", async () => {
  try {
    // Try autoplaying muted first (bypasses browser restrictions)
    music.muted = true;
    await music.play();
    // Gradually fade in and unmute
    setTimeout(() => {
      music.muted = false;
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.01;
          music.volume = vol;
        } else clearInterval(fade);
      }, 150);
    }, 500);
    console.log("🎵 Eminara background music autoplayed successfully");
  } catch (err) {
    console.warn("Autoplay may be blocked until user interacts.", err);
  }
});
