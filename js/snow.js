export function initSnow() {
  const canvas = document.getElementById("snowCanvas");

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  let flakes = [];

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    makeFlakes();
  }

  function makeFlakes() {
    const count = Math.min(110, Math.floor(window.innerWidth / 10));

    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.35,
      s: Math.random() * 0.34 + 0.1,
      drift: Math.random() * 0.28 - 0.14,
      alpha: Math.random() * 0.45 + 0.1
    }));
  }

  function drawSnow() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const flake of flakes) {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(160,255,255,${flake.alpha})`;
      ctx.shadowColor = "rgba(55,247,255,.55)";
      ctx.shadowBlur = 8;

      ctx.fill();

      flake.y += flake.s;
      flake.x += flake.drift;

      if (flake.y > window.innerHeight + 10) {
        flake.y = -10;
        flake.x = Math.random() * window.innerWidth;
      }

      if (flake.x < -10) {
        flake.x = window.innerWidth + 10;
      }

      if (flake.x > window.innerWidth + 10) {
        flake.x = -10;
      }
    }

    requestAnimationFrame(drawSnow);
  }

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  drawSnow();
}
