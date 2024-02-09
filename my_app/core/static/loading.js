let loader = document.getElementById("loader");

window.addEventListener("load", function () {
  loader.classList.add("hidden");
});

function Load(path) {
  loader.classList.remove("hidden");
  window.location.href = path;
}
