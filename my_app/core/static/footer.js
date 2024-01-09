"use strict";

// Footer HTML
class Footer extends HTMLElement {
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
    <div class="logoSection">
        <a class="navlogo footerLogo" href="#">WaterMark Studio</a>
        <span class="rights">Copyright © 2023 WaterMark Studio All Rights Reserved.</span>
      </div>

      <div class="footerLinks">
        <div class="footerGroup">
          <p class="footerTitle">Pages</p>
          <ul class="navlinkwrap">
            <li class="navlink small ${mergedStyle.HomeLinkClass}">Home</li>
            <li class="navlink small ${mergedStyle.MyProfileLinkClass}">My Profile</li>
            <li class="navlink small underBuild ${mergedStyle.AboutLinkClass}">About</li>
            <li class="navlink small underBuild ${mergedStyle.ContactUsLinkClass}">Contact us</li>
          </ul>
        </div>

        <div class="footerGroup">
          <p class="footerTitle">Media</p>
          <ul class="navlinkwrap">
            <li class="navlink small"><a href="https://www.facebook.com/profile.php?id=61555144664420" target="_blank">Facebook</a></li>
            <li class="navlink small"><a href="https://www.instagram.com/wmarkstudio/?next=%2F" target="_blank">Instagram</a></li>
            <li class="navlink small"><a href="https://www.youtube.com/channel/UCIWmGlRYPryb1hSlctDlKqQ" target="_blank">YouTube</a></li>
            <li class="navlink small"><a href="https://github.com/CoolShadow1/WaterMark_Studio" target="_blank">GitHub</a></li>
          </ul>
        </div>
      </div>`;
  }
}

// Define the custom element
customElements.define("footer-element", Footer);
