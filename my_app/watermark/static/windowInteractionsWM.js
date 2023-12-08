function isElementInViewport(el) {
  let elProps = el.getBoundingClientRect();
  let windowHeight = window.innerHeight;

  return (elProps.top * 4) / 3 < windowHeight && elProps.bottom > 0;
}

let tutorial_subtitle = document.getElementById("tutorial_subtitle");
let tutorial_desc = document.getElementById("tutorial_desc");
let videoTutorial = document.getElementById("videoTutorial");
let form1 = document.getElementById("form1");
let Forms_title = document.getElementById("Forms_title");
let Forms_subtitle1 = document.getElementById("Forms_subtitle1");
let Forms_subtitle2 = document.getElementById("Forms_subtitle2");
let Forms_subtitle3 = document.getElementById("Forms_subtitle3");
let Forms_desc1 = document.getElementById("Forms_desc1");
let Forms_desc2 = document.getElementById("Forms_desc2");
let Forms_desc3 = document.getElementById("Forms_desc3");

let form2 = document.getElementById("form2");
let Forms2_title = document.getElementById("Forms2_title");
let Forms2_subtitle1 = document.getElementById("Forms2_subtitle1");
let Forms2_subtitle2 = document.getElementById("Forms2_subtitle2");
let Forms2_desc1 = document.getElementById("Forms2_desc1");
let Forms2_desc2 = document.getElementById("Forms2_desc2");

document.addEventListener("scroll", function () {
  if (isElementInViewport(tutorial_subtitle)) {
    tutorial_subtitle.classList.add("onscreen");
  }
  if (isElementInViewport(tutorial_desc)) {
    tutorial_desc.classList.add("onscreen");
  }
  if (isElementInViewport(videoTutorial)) {
    videoTutorial.classList.add("onscreen");
  }
  if (isElementInViewport(Forms_title)) {
    form1.classList.add("onscreen");
    Forms_title.classList.add("onscreen");
    Forms_subtitle1.classList.add("onscreen");
    Forms_subtitle2.classList.add("onscreen");
    Forms_subtitle3.classList.add("onscreen");
    Forms_desc1.classList.add("onscreen");
    Forms_desc2.classList.add("onscreen");
    Forms_desc3.classList.add("onscreen");
  }

  if (isElementInViewport(Forms2_title)) {
    form2.classList.add("onscreen");
    Forms2_title.classList.add("onscreen");
    Forms2_subtitle1.classList.add("onscreen");
    Forms2_subtitle2.classList.add("onscreen");
    Forms2_desc1.classList.add("onscreen");
    Forms2_desc2.classList.add("onscreen");
  }
});

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



  // Handle underBuild

// let notReadyLinks = document.querySelectorAll(".underBuild");
// notReadyLinks.forEach((element) => {
//   element.onclick = function () {
//     alert("Access error: This page is under construction.");
//   };
// });

let createBTN = document.getElementById("dropdown__face");
let items = document.getElementById("dropdown__items");

createBTN.onclick = function () {
  if (items.style.opacity === "1") {
    items.style.visibility = "hidden";
    items.style.opacity = "0";
    items.style.top = "50%";
  } else {
    items.style.visibility = "visible";
    items.style.opacity = "1";
    items.style.top = "calc(100% + 25px)";
  }
};
