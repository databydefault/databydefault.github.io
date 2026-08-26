/* =========================================================
   CONTACT FORM — WEB3FORMS SUBMISSION
   (kept first + self-contained so a problem anywhere else
    in this file can never stop it from attaching)
========================================================= */

(function () {

  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

  const contactStatus =
    document.getElementById("contact-status");

  const submitButton =
    contactForm.querySelector(".contact-submit");

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();
    event.stopPropagation();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "SENDING…";
    }

    if (contactStatus) {
      contactStatus.textContent = "";
      contactStatus.classList.remove("is-error", "is-success");
    }

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        if (!contactStatus) return;

        if (data.success) {

          contactStatus.textContent =
            "Message sent — I'll get back to you shortly.";

          contactStatus.classList.add("is-success");

          contactForm.reset();

        } else {

          contactStatus.textContent =
            "Something went wrong. Please try again.";

          contactStatus.classList.add("is-error");

        }

      })
      .catch(function () {

        if (contactStatus) {
          contactStatus.textContent =
            "Something went wrong. Please try again.";

          contactStatus.classList.add("is-error");
        }

      })
      .finally(function () {

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "SEND MESSAGE →";
        }

      });

  });

})();


/* =========================================================
   FOOTER VISITOR COUNT — GOATCOUNTER
========================================================= */

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const visitEl = document.getElementById("visit-count");

    if (!visitEl) return;

    fetch("https://databydefault.goatcounter.com/counter/TOTAL.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        visitEl.textContent =
          "VISITORS · " + data.count;

      })
      .catch(function () {

        visitEl.textContent = "";

      });

  });

})();


/* =========================================================
   RUBIK'S CUBE CURSOR
========================================================= */

(function () {

  const cubeCursor = document.querySelector(".cube-cursor");

  const faces = [
    { name: "front", colour: "red" },
    { name: "back", colour: "orange" },
    { name: "right", colour: "blue" },
    { name: "left", colour: "green" },
    { name: "top", colour: "white" },
    { name: "bottom", colour: "yellow" }
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

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener("mousemove", function (event) {

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

})();


/* =========================================================
   DARK MODE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const themeButton = document.getElementById("theme");

  if (!themeButton) return;

  themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    themeButton.textContent =
      isDark ? "● LIGHT" : "● DARK";

  });

});


/* =========================================================
   EXPANDABLE PROJECT CARD
========================================================= */

(function () {

  const expandableProjects =
    document.querySelectorAll(".expandable-project");

  expandableProjects.forEach(project => {

    const resetButton =
      project.querySelector(".project-reset");

    project.addEventListener("click", function () {

      project.classList.add("expand-open");

    });

    if (resetButton) {

      resetButton.addEventListener("click", function (event) {

        event.stopPropagation();

        project.classList.remove("expand-open");

      });

    }

  });

})();


/* =========================================================
   EXPERIENCE — MORE / LESS
========================================================= */

document.querySelectorAll(".experience-more").forEach(button => {

  button.addEventListener("click", function () {

    const details =
      button.closest(".experience-details");

    if (!details) return;

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

    if (!row) return;

    row.classList.toggle("open");

    button.textContent =
      row.classList.contains("open")
        ? "LESS −"
        : "MORE +";

  });

});


/* =========================================================
   MUSIC PLAYER
========================================================= */

(function () {

  const musicPlay = document.getElementById("music-play");
  const musicProgress = document.querySelector(".music-progress");
  const musicCurrent = document.getElementById("music-current");
  const musicDuration = document.getElementById("music-duration");
  const musicPlayer = document.querySelector(".music-player");

  if (!musicPlay || !musicProgress) return;

  const musicPreview = new Audio(
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7e/cb/7d/7ecb7df0-1db3-4c39-9a97-e8e23ffee8ef/mzaf_324801075856703884.plus.aac.ep.m4a"
  );

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

  musicPlay.addEventListener("click", function () {

    if (musicPreview.paused) {

      musicPreview.play();

      musicPlay.textContent = "Ⅱ";

      if (musicPlayer) musicPlayer.classList.add("playing");

    } else {

      musicPreview.pause();

      musicPlay.textContent = "▶";

      if (musicPlayer) musicPlayer.classList.remove("playing");

    }

  });

  musicPreview.addEventListener("timeupdate", function () {

    const progressBar =
      document.querySelector(".music-progress span");

    if (progressBar) {

      const percentage =
        (musicPreview.currentTime / musicPreview.duration) * 100;

      progressBar.style.width = percentage + "%";

    }

    if (musicCurrent) {
      musicCurrent.textContent =
        formatTime(musicPreview.currentTime);
    }

  });

  musicPreview.addEventListener("ended", function () {

    musicPlay.textContent = "▶";

    const progressBar =
      document.querySelector(".music-progress span");

    if (progressBar) progressBar.style.width = "0%";

    if (musicPlayer) musicPlayer.classList.remove("playing");

  });

  musicProgress.addEventListener("click", function (event) {

    const rect = musicProgress.getBoundingClientRect();

    const clickPosition =
      event.clientX - rect.left;

    const percentage =
      clickPosition / rect.width;

    musicPreview.currentTime =
      percentage * musicPreview.duration;

  });

  musicPreview.addEventListener("loadedmetadata", function () {

    if (musicDuration) {
      musicDuration.textContent =
        formatTime(musicPreview.duration);
    }

  });

})();
