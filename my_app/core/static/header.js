"use strict";

// Header HTML
class Header extends HTMLElement {
  connectedCallback() {
    const defaultStyle = {
      HomeLinkClass: "",
      MyProfileLinkClass: "",
      AboutLinkClass: "",
      ContactUsLinkClass: "",
    };

    const customStyle = this.getAttribute("custom-style");
    const mergedStyle = { ...defaultStyle, ...JSON.parse(customStyle) };

    this.innerHTML = `
    <div class="mobileLeftSide">
      <div id="bars" class="bars" onclick="bars()">
        <div id="bar1" class="bar"></div>
        <div id="bar2" class="bar"></div>
        <div id="bar3" class="bar"></div>
      </div>
      <a class="navlogo"> WaterMark Studio</a>
    </div>

    <div class="navWrap">
      <a href="/" class="navlink ${mergedStyle.HomeLinkClass}">Home</a>
      <a href="#" class="navlink underBuild ${mergedStyle.MyProfileLinkClass}">My Profile</a>
      <a href="#" class="navlink underBuild ${mergedStyle.AboutLinkClass}">About</a>
      <a href="#" class="navlink underBuild ${mergedStyle.ContactUsLinkClass}">Contact us</a>
    </div>
    <div class="sidebar">
      <div class="dropdown">
        <label id="dropdown__face" class="dropdown__face" onclick="toggleDropdown()" htmlFor="dropdown">
          <div class="buttonwrap">
            <span class="dropdown__text navlogo">CREATE </span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
        </label>

        <ul id="dropdown__items" class="dropdown__items">
          <li>
            <a class="sidelink" href="/textWatermark">RSH Mark</a>
          </li>
          <li><a class="sidelink" href="/imageWatermark">MSB Mark</a></li>
        </ul>
      </div>
      <div class="logoutContainer">
        <a class="link" href="{{ url_for('registration_bp.logout') }}">
          <span class="link--top">Logout</span>
          <span class="link--bottom">Logout</span>
        </a>
      </div>
    </div>`;
  }
}

// Define the custom element
customElements.define("header-element", Header);

// Open-Close animation
function bars() {
  let bar1 = document.getElementById("bar1");
  let bar2 = document.getElementById("bar2");
  let bar3 = document.getElementById("bar3");
  let header = document.getElementById("navbar");

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
}

function toggleDropdown() {
  let dropdownItems = document.getElementById("dropdown__items");
  dropdownItems.classList.toggle("active");
}
