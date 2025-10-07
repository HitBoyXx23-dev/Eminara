// === Particle Background ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.8 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = `rgba(200,180,255,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === Background Music (Autoplay + Fade to Full Volume) ===
const music = document.getElementById("bg-music");
music.volume = 0;        // start silent
music.loop = true;
music.muted = true;      // required for autoplay

window.addEventListener("load", async () => {
  try {
    // Start muted (autoplay allowed)
    await music.play();
    console.log("🎵 Eminara music autoplay started (muted)");

    // Unmute and fade to full volume
    setTimeout(() => {
      music.muted = false;
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 1.0) {              // full volume = 1.0
          vol += 0.02;
          music.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 100); // fade speed (100ms per step)
    }, 500);
  } catch (err) {
    console.warn("Autoplay blocked until user interacts.", err);
  }
});
