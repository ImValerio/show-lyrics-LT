// ==UserScript==
// @name         Show lyrics LT
// @namespace    http://tampermonkey.net/
// @version      2025-01-04
// @description  Show lyrics on Lyricstraining
// @author       Valerio Valletta
// @match        https://lyricstraining.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lyricstraining.com
// @grant        none
// ==/UserScript==

const createLyricsBox = () => {
  const lyricsBox = document.createElement("div");

  lyricsBox.id = "lyrics-box";
  lyricsBox.style.display = "none";
  lyricsBox.style.zIndex = 50;
  lyricsBox.style.position = "fixed";
  lyricsBox.style.right = 0;
  lyricsBox.style.bottom = 10;
  lyricsBox.style.width = "100%";
  lyricsBox.style.height = "100%";
  lyricsBox.style.maxHeight = "300px";
  lyricsBox.style.maxWidth = "700px";
  lyricsBox.style.overflowY = "scroll";
  lyricsBox.style.backgroundColor = "#FFF";
  lyricsBox.style.padding = "0.5em";
  lyricsBox.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

  return lyricsBox;
};

const createShowLyricsBtn = () => {
  const btn = document.createElement("button");
  btn.innerText = "SHOW LYRICS";
  btn.style.fontSize = "1.5em";
  btn.style.fontWeight = "bold";
  btn.style.zIndex = 100;
  btn.style.position = "fixed";
  btn.style.right = 0;
  btn.style.bottom = 10;
  btn.style.border = "2px solid royalblue";
  btn.style.borderRight = "0px";
  btn.style.color = "royalblue";
  btn.style.background = "white";
  btn.style.cursor = "pointer";

  return btn;
};

(function () {
  "use strict";

  const addOptions = document.querySelector("#add-options");

  const lyricsBox = createLyricsBox();

  lt.game.page.lyrics.lines
    .map((el) => el.text)
    .forEach((el) => {
      const p = document.createElement("p");
      p.style.fontSize = "1.5em";
      p.style.color = "black";
      p.style.paddingLeft = "1em";
      p.innerText = el;
      lyricsBox.appendChild(p);
    });

  const btn = createShowLyricsBtn();

  btn.addEventListener("click", () => {
    let currStatus = document.querySelector("#lyrics-box").style.display;
    if (currStatus === "none") {
      document.querySelector("#lyrics-box").style.display = "block";
      return;
    }
    document.querySelector("#lyrics-box").style.display = "none";
    return;
  });

  addOptions.appendChild(btn);
  addOptions.appendChild(lyricsBox);
})();
