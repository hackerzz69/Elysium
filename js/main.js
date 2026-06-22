import { loadPartials } from "./partials.js";
import { initNav } from "./nav.js";
import { initRevealAnimations } from "./reveal.js";
import { initPlayerCount } from "./playerCount.js";
import { initSnow } from "./snow.js";

async function initSite() {
  await loadPartials();

  initNav();
  initRevealAnimations();
  initPlayerCount();
  initSnow();

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

initSite();
