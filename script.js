/* =========================================================
   RUBIK'S CUBE CURSOR
========================================================= */

const cubeCursor = document.querySelector(".cube-cursor");
const cube = document.querySelector(".rubik-cube");


/* Create 6 × 6 stickers */

const faces = [
  {
    name: "front",
    colour: "red"
  },
  {
    name: "back",
    colour: "orange"
  },
  {
    name: "right",
    colour: "blue"
  },
  {
    name: "left",
    colour: "green"
  },
  {
    name: "top",
    colour: "white"
  },
  {
    name: "bottom",
    colour: "yellow"
  }
];


faces.forEach(face => {

  const element =
    document.querySelector("." + face.name);

  if (!element) return;

  for (let i = 0; i < 36; i++) {

    const sticker =
      document.createElement("div");

    sticker.classList.add(
      "sticker",
      "sticker-" + face.colour
    );

    element.appendChild(sticker);

  }

});


/* =========================================================
   CURSOR MOVEMENT
========================================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


document.addEventListener("mousemove", function(event) {

  mouseX = event.clientX;
  mouseY = event.clientY;

});


function animateCursor() {

  if (cubeCursor) {

    currentX +=
      (mouseX - currentX) * 0.15;

    currentY +=
      (mouseY - currentY) * 0.15;

    cubeCursor.style.transform =
      `translate(${currentX}px, ${currentY}px)
       translate(-50%, -50%)`;

  }

  requestAnimationFrame(animateCursor);

}


animateCursor();


/* =========================================================
   DARK MODE
========================================================= */

const themeButton =
  document.getElementById("theme");


if (themeButton) {

  themeButton.onclick = function() {

    document.body.classList.toggle("dark");


    if (
      document.body.classList.contains("dark")
    ) {

      themeButton.textContent = "● LIGHT";

    } else {

      themeButton.textContent = "● DARK";

    }

  };

}
/* =========================================================
   EXPANDABLE PROJECT CARD
========================================================= */

const expandableProjects =
  document.querySelectorAll(".expandable-project");

expandableProjects.forEach(project => {

  const resetButton =
    project.querySelector(".project-reset");

  project.addEventListener("click", function () {

    project.classList.add("expand-open");

  });


  resetButton.addEventListener("click", function (event) {

    event.stopPropagation();

    project.classList.remove("expand-open");

  });

});
document.querySelectorAll(".experience-more").forEach(button => {

  button.addEventListener("click", function () {

    const details =
      button.closest(".experience-details");

    details.classList.toggle("expanded");

    button.textContent =
      details.classList.contains("expanded")
        ? "LESS −"
        : "MORE +";

  });

});
/* =========================================================
   COLLAPSIBLE EDUCATION / PUBLICATIONS
========================================================= */

document.querySelectorAll(".collapsible-more").forEach(button => {

  button.addEventListener("click", function () {

    const row = button.closest(".collapsible-row");

    row.classList.toggle("open");

    button.textContent =
      row.classList.contains("open")
        ? "LESS −"
        : "MORE +";

  });

});
const musicPlay = document.getElementById("music-play");

const musicPreview = new Audio(
  "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7e/cb/7d/7ecb7df0-1db3-4c39-9a97-e8e23ffee8ef/mzaf_324801075856703884.plus.aac.ep.m4a"
);

musicPlay.addEventListener("click", function () {

  if (musicPreview.paused) {

  musicPreview.play();

  musicPlay.textContent = "Ⅱ";

  document
    .querySelector(".music-player")
    .classList.add("playing");

} else {

  musicPreview.pause();

  musicPlay.textContent = "▶";

  document
    .querySelector(".music-player")
    .classList.remove("playing");

}
});
musicPreview.addEventListener("timeupdate", function () {

  const progress =
    document.querySelector(".music-progress span");

  const percentage =
    (musicPreview.currentTime / musicPreview.duration) * 100;

  progress.style.width = percentage + "%";

});
musicPreview.addEventListener("ended", function () {

  musicPlay.textContent = "▶";

});
const musicProgress = document.querySelector(".music-progress");

musicProgress.addEventListener("click", function (event) {

  const rect = musicProgress.getBoundingClientRect();

  const clickPosition =
    event.clientX - rect.left;

  const percentage =
    clickPosition / rect.width;

  musicPreview.currentTime =
    percentage * musicPreview.duration;

});
musicPreview.addEventListener("ended", function () {

  musicPlay.textContent = "▶";

  const progress =
    document.querySelector(".music-progress span");

  progress.style.width = "0%";

});
musicPreview.addEventListener("ended", function () {

  musicPlay.textContent = "▶";

  const progress =
    document.querySelector(".music-progress span");

  progress.style.width = "0%";

  document
    .querySelector(".music-player")
    .classList.remove("playing");

});
const musicCurrent =
  document.getElementById("music-current");

const musicDuration =
  document.getElementById("music-duration");


function formatTime(seconds) {

  if (!seconds || isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds =
    Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}


/* SONG DURATION */

musicPreview.addEventListener("loadedmetadata", function () {

  musicDuration.textContent =
    formatTime(musicPreview.duration);

});


/* CURRENT TIME */

musicPreview.addEventListener("timeupdate", function () {

  musicCurrent.textContent =
    formatTime(musicPreview.currentTime);

});
document.querySelectorAll(".project-open").forEach(function (button) {

  button.addEventListener("click", function (event) {

    event.stopPropagation();

    const project = button.closest(".project");

    project.classList.add("expand-open");

  });

});
