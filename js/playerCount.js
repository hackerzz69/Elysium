export function initPlayerCount() {
  const playersOnline = document.getElementById("playersOnline");

  if (!playersOnline) {
    return;
  }

  let basePlayers = 124;

  setInterval(() => {
    basePlayers += Math.floor(Math.random() * 5) - 2;
    basePlayers = Math.max(90, Math.min(175, basePlayers));

    playersOnline.textContent = basePlayers.toLocaleString();
  }, 3500);
}
