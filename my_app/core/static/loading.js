let loader = document.getElementById("loader");

window.addEventListener("load", function () {
  loader.classList.add("hidden");
});

function LoadPath(path) {
  loader.classList.remove("hidden");
  window.location.href = path;
}

function LoadingScreen(path) {
  loader.classList.remove("hidden");
  window.location.href = path;
}
