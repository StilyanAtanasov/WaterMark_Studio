window.addEventListener("load", function () {
  let loader = document.getElementById("loader");
  loader.classList.add("hidden");
  loader.addEventListener("transitionend", function () {
    document.removeChild("lds-hourglass");
  });
});
