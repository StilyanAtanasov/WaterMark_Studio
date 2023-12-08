// Handle underBuild

let notReadyLinks = document.querySelectorAll(".underBuild");
notReadyLinks.forEach((element) => {
  element.onclick = function () {
    alert("Access error: This page is under construction.");
  };
});
