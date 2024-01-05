"use strict";

// show static elements on scroll

let scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

let elementsToShow = document.querySelectorAll(".show-on-scroll");

function ShowOrNot() {
  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add("is-visible");
    } else {
      element.classList.remove("is-visible");
    }
  });

  scroll(ShowOrNot);
}

ShowOrNot();

function isElementInViewport(el) {
  let elProps = el.getBoundingClientRect();
  let windowHeight = window.innerHeight;

  return (elProps.top * 4) / 3 < windowHeight && elProps.bottom > 0;
}

function isElementInMidViewport(el) {
  let elProps = el.getBoundingClientRect();
  let windowHeight = window.innerHeight;

  return elProps.top <= windowHeight * 0.6;
}

function isElementInTopViewport(el) {
  let elProps = el.getBoundingClientRect();
  let windowHeight = window.innerHeight;

  return elProps.top >= windowHeight * 0.7;
}

function isElementInFullViewport(el) {
  let elProps = el.getBoundingClientRect();
  return elProps.top <= 0;
}

// Go to top button
let topBTN = document.getElementById("toTopBTN");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    topBTN.classList.add("scrolled");
    topBTN.classList.remove("fadeOut");
  } else {
    topBTN.classList.remove("scrolled");
    topBTN.classList.add("fadeOut");
  }
}

// From this to this section

let fromIMGFirst = document.getElementById("fromIMGFirst");
let toIMGFirst = document.getElementById("toIMGFirst");
let fromIMGSecond = document.getElementById("fromIMGSecond");
let toIMGSecond = document.getElementById("toIMGSecond");
let fromIMGThird = document.getElementById("fromIMGThird");
let toIMGThird = document.getElementById("toIMGThird");
let titles = document.querySelectorAll(".fromThisToThisHeadline");

if (window.innerWidth <= 550) {
  fromIMGFirst.src = "../static/images/imgFrom0_1.png";
  fromIMGSecond.src = "../static/images/imgFrom1_1.png";
  fromIMGThird.src = "../static/images/imgFrom2_1.png";
  toIMGFirst.src = "../static/images/imgFrom0_1.png";
  toIMGSecond.src = "../static/images/imgFrom1_1.png";
  toIMGThird.src = "../static/images/imgFrom2_1.png";
}

document.addEventListener("scroll", function () {
  if (isElementInViewport(fromIMGFirst)) {
    fromIMGFirst.classList.add("onscreen");
    toIMGFirst.classList.add("onscreen");
    titles.forEach((element) => element.classList.add("onscreen"));
  }
});

let scrollBox = document.getElementById("scrollBox");
let paragraph = document.getElementById("textParagraph");

scrollBox.addEventListener("scroll", function () {
  window.scrollTo({
    top: scrollBox.offsetTop,
    behavior: "auto",
  });

  if (this.scrollTop * 1.5 >= this.scrollHeight - window.innerHeight) {
    fromIMGThird.classList.add("onscreen");
    toIMGThird.classList.add("onscreen");
    paragraph.innerText =
      "Stealth Branding: Keep your brand intact without compromising aesthetics. Your invisible watermark remains hidden, yet it speaks volumes about your ownership.";
  } else if (this.scrollTop * 3 >= this.scrollHeight - window.innerHeight) {
    fromIMGSecond.classList.add("onscreen");
    toIMGSecond.classList.add("onscreen");
    fromIMGThird.classList.remove("onscreen");
    toIMGThird.classList.remove("onscreen");
    paragraph.innerText =
      "Zero Distraction: Unlike traditional watermarks, invisible watermarks don't interfere with the visual impact of your images. They're there when you need them, and invisible when you don't.";
  } else if (
    this.scrollTop * 3 < this.scrollHeight - window.innerHeight &&
    this.scrollTop * 10 >= this.scrollHeight - window.innerHeight
  ) {
    fromIMGSecond.classList.remove("onscreen");
    toIMGSecond.classList.remove("onscreen");
    paragraph.innerText =
      "Invincible Protection: Our cutting-edge technology embeds invisible watermarks within your images, making them virtually tamper-proof. Your images remain pristine while your rights stay safeguarded.";
  } else {
    paragraph.innerText =
      "Discover the power while scrolling in this section...";
  }
});

// stylize for different versions

let browserName = "";

if (navigator.userAgent.indexOf("Firefox") != -1) {
  browserName = "Firefox";
} else if (navigator.userAgent.indexOf("Chrome") != -1) {
  browserName = "Google Chrome";
} else if (navigator.userAgent.indexOf("Safari") != -1) {
  browserName = "Safari";
} else if (navigator.userAgent.indexOf("Edge") != -1) {
  browserName = "Microsoft Edge";
} else if (
  navigator.userAgent.indexOf("MSIE") != -1 ||
  navigator.userAgent.indexOf("Trident") != -1
) {
  browserName = "Internet Explorer";
} else {
  browserName = "Unknown";
}

console.log("Browser Name: " + browserName);

console.log(navigator.userAgent);
if (navigator.userAgent.includes("Mozilla") && browserName === "Firefox") {
  const match = navigator.userAgent.match(/Mozilla\/(\d+)/);

  if (match) {
    const firefoxVersion = match[1];
    if (firefoxVersion <= 5) {
      if (window.innerWidth <= 650)
        document.getElementById("spaceNeeded").style.height = "500rem";

      scrollBox.addEventListener("scroll", function () {
        if (this.scrollTop * 1.5 >= this.scrollHeight - window.innerHeight) {
          paragraph.className = "describerText t";
        } else if (
          this.scrollTop * 3 >=
          this.scrollHeight - window.innerHeight
        ) {
          paragraph.className = "describerText s";
        } else {
          paragraph.className = "describerText f";
        }
      });
    }
  }
}

// selected button animations
let selectedBTN = document.getElementById("selected");

selectedBTN.onmouseleave = function () {
  if (selectedBTN.classList.contains("reverse"))
    selectedBTN.classList.remove("reverse");
  else selectedBTN.classList.add("reverse");
};

let optionButtons = document.getElementById("optionButtons");

selectedBTN.onclick = function () {
  if (optionButtons.classList.contains("active"))
    optionButtons.classList.remove("active");
  else optionButtons.classList.add("active");
};

// explore button functionality
let exploreBTN = document.getElementById("exploreBTN");

exploreBTN.onclick = function () {
  window.scrollTo({
    top: scrollBox.offsetTop,
    behavior: "auto",
  });
};
