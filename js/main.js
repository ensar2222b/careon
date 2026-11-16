/* Boot: viewport (iOS keyboard), PWA, chat placement, install hint. */
window.Careon = window.Careon || {};

(function () {
  "use strict";

  var overlay = document.getElementById("chat-overlay");
  var overlayBody = document.getElementById("overlay-body");
  var dock = document.getElementById("chat-dock");
  var app = document.getElementById("chat-app");
  var closeBtn = document.getElementById("close-overlay");
  var banner = document.getElementById("install-banner");
  var bannerClose = document.getElementById("install-dismiss");
  var overlayOpen = false;

  function isMobile() {
    return window.matchMedia("(max-width: 720px)").matches;
  }

  function syncViewport() {
    var root = document.documentElement;
    var vv = window.visualViewport;
    if (vv) {
      root.style.setProperty("--app-height", vv.height + "px");
      root.style.setProperty("--vv-top", vv.offsetTop + "px");
    } else {
      root.style.setProperty("--app-height", window.innerHeight + "px");
      root.style.setProperty("--vv-top", "0px");
    }
  }

  function placeChat() {
    if (!app || !dock || !overlayBody) return;
    if (isMobile() && overlayOpen) {
      if (app.parentElement !== overlayBody) overlayBody.appendChild(app);
    } else if (app.parentElement !== dock) {
      dock.appendChild(app);
    }
  }

  function openOverlay(event) {
    if (event) event.preventDefault();
    if (!isMobile()) {
      var section = document.getElementById("chat");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.Careon.chat) window.Careon.chat.focusInput();
      return;
    }
    overlayOpen = true;
    overlay.hidden = false;
    overlay.classList.add("is-open");
    document.body.classList.add("chat-open");
    placeChat();
    syncViewport();
    if (window.Careon.chat) {
      setTimeout(function () { window.Careon.chat.focusInput(); }, 50);
    }
  }

  function closeOverlay() {
    overlayOpen = false;
    overlay.classList.remove("is-open");
    overlay.hidden = true;
    document.body.classList.remove("chat-open");
    placeChat();
  }

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
  }

  function isIos() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent)
      || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function setupInstallBanner() {
    if (!banner) return;
    if (isStandalone()) return;
    if (sessionStorage.getItem("careon-hide-install") === "1") return;
    if (isIos()) {
      banner.hidden = false;
      banner.classList.add("is-visible");
    }
    if (bannerClose) {
      bannerClose.addEventListener("click", function () {
        banner.classList.remove("is-visible");
        banner.hidden = true;
        sessionStorage.setItem("careon-hide-install", "1");
      });
    }
  }

  function registerWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol === "file:") return;
    navigator.serviceWorker.register("./sw.js").catch(function () {
      /* Offline registration can fail on first visit; the site still works. */
    });
  }

  document.querySelectorAll("[data-open-chat]").forEach(function (node) {
    node.addEventListener("click", openOverlay);
  });
  if (closeBtn) closeBtn.addEventListener("click", closeOverlay);
  if (overlay) {
    overlay.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeOverlay();
    });
  }

  window.addEventListener("resize", function () {
    syncViewport();
    if (!isMobile() && overlayOpen) closeOverlay();
    else placeChat();
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncViewport);
    window.visualViewport.addEventListener("scroll", syncViewport);
  }
  syncViewport();
  setupInstallBanner();
  registerWorker();

  if (app && window.Careon.chat) {
    window.Careon.chat.init(app);
  }
})();
