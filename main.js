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

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  console.log(document.getElementById(elmnt.id + "-header"));
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const createLyricsBox = () => {
  const lyricsBox = document.createElement("div");

  lyricsBox.id = "lyrics-box";
  lyricsBox.style.display = "none";
  lyricsBox.style.zIndex = 50;
  lyricsBox.style.position = "absolute";
  lyricsBox.style.right = 0;
  lyricsBox.style.bottom = 10;
  lyricsBox.style.width = "100%";
  lyricsBox.style.height = "100%";
  lyricsBox.style.maxHeight = "300px";
  lyricsBox.style.maxWidth = "700px";
  lyricsBox.style.overflowY = "scroll";
  lyricsBox.style.backgroundColor = "#FFF";
  lyricsBox.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

  lyricsBox.appendChild(createLyricsBoxHeader());
  return lyricsBox;
};

const createLyricsBoxHeader = () => {
  const header = document.createElement("div");

  header.id = "lyrics-box-header";
  header.style.top = 0;
  header.style.position = "sticky";
  header.style.width = "100%";
  header.style.height = "100%";
  header.style.maxHeight = "50px";
  header.style.backgroundColor = "royalblue";
  header.style.cursor = "move";
  header.style.display = "flex";
  header.style.alignItems = "center";

  const title = document.createElement("span");
  title.innerText = "DRAG ME";
  title.style.fontSize = "1.6em";
  title.style.color = "white";

  title.style.fontWeight = "bold";
  title.style.letterSpacing = "0.3em";
  title.style.padding = "0.5em";

  header.appendChild(title);
  return header;
};

const createShowLyricsBtn = () => {
  const btn = document.createElement("button");
  btn.id = "show-lyrics-btn";
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
  btn.style.transition = "0.5s all";

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

  btn.addEventListener("mouseenter", () => {
    let btn = document.querySelector("#show-lyrics-btn");

    btn.style.fontSize = "1.6em";
  });

  btn.addEventListener("mouseleave", () => {
    let btn = document.querySelector("#show-lyrics-btn");

    btn.style.fontSize = "1.5em";
  });

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

  dragElement(lyricsBox);
})();
