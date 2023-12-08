// Open-Close animation

let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let bar3 = document.getElementById("bar3");
let header = document.getElementById("navbar");

document.getElementById("bars").onclick = function () {
  if (bar1.classList.contains("action") === false) {
    bar1.classList.add("action");
    bar2.classList.add("action");
    bar2.classList.remove("reverse");
    bar3.classList.add("action");
    header.classList.add("action");
  } else {
    bar1.classList.remove("action");
    bar2.classList.remove("action");
    bar2.classList.add("reverse");
    bar3.classList.remove("action");
    header.classList.remove("action");
  }
};

// Header Menu

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
