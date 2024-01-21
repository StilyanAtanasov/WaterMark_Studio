"use strict";

// Get user resolution
const screenWidth = window.screen.width;

// Set images needed
let imagesNeeded;

if (screenWidth <= 550) {
  imagesNeeded = 5;
} else if (screenWidth > 550 && screenWidth <= 1000) {
  imagesNeeded = 10;
} else if (screenWidth > 1000 && screenWidth <= 1500) {
  imagesNeeded = 15;
} else if (screenWidth > 1500 && screenWidth <= 2000) {
  imagesNeeded = 20;
} else if (screenWidth > 2000 && screenWidth <= 2700) {
  imagesNeeded = 25;
} else {
  imagesNeeded = 31;
}

let allImages = Array.from({ length: 31 }, (_, i) => i);
let imagesSelected = [];

// Shuffle the array
for (let i = 0; i < imagesNeeded; i++) {
  const j = Math.floor(Math.random() * (i + 1));
  [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
}

// Select the images
for (let index = 0; index < imagesNeeded; index++) {
  imagesSelected.push(`img` + allImages[index]);
}

// Append the images to the HTML
let grid = document.getElementById(`grid`);
for (let index = 0; index < imagesNeeded; index++) {
  let div = document.createElement("div");
  let img = document.createElement("img");
  div.className = `item`;
  img.src = `../static/images/${imagesSelected[index]}.png`;
  div.appendChild(img);
  grid.appendChild(div);
  // let element = document.getElementById(`img` + index);
  // element.src = `../static/images/${imagesSelected[index]}.png`;
  // element.style.display = `block`;
}
