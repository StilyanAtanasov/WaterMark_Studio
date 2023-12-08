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
  imagesNeeded = 30;
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

// Apply the images to the HTML

for (let index = 0; index < imagesNeeded; index++)
  document.getElementById(
    `img` + index
  ).src = `../register/static/images/${imagesSelected[index]}.png`;

for (let index = imagesNeeded + 1; index <= 30; index++) {
  let item = document.getElementById(`img` + index);
  item.src = `#`;
  item.style.display = `none`;
}
