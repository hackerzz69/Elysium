const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const year = document.getElementById('year');
const playersOnline = document.getElementById('playersOnline');

year.textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mock player-count motion. Replace this later with your real RSPS API endpoint.
let basePlayers = 247;
setInterval(() => {
  basePlayers += Math.floor(Math.random() * 5) - 2;
  basePlayers = Math.max(190, Math.min(320, basePlayers));
  if (playersOnline) playersOnline.textContent = basePlayers.toLocaleString();
}, 3500);

const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let flakes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  makeFlakes();
}

function makeFlakes() {
  const count = Math.min(130, Math.floor(window.innerWidth / 9));
  flakes = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.35,
    s: Math.random() * 0.42 + 0.12,
    drift: Math.random() * 0.35 - 0.175,
    alpha: Math.random() * 0.55 + 0.12
  }));
}

function drawSnow() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const flake of flakes) {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(160,255,255,${flake.alpha})`;
    ctx.shadowColor = 'rgba(0,245,255,.55)';
    ctx.shadowBlur = 8;
    ctx.fill();
    flake.y += flake.s;
    flake.x += flake.drift;
    if (flake.y > window.innerHeight + 10) {
      flake.y = -10;
      flake.x = Math.random() * window.innerWidth;
    }
  }
  requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawSnow();
