const overlay = document.querySelector(".overlay");
const overlayContainsHidden = overlay.classList.contains("hidden");

const navBarRight = document.querySelector(".navbar-right");
const navBarRightHiddenAdd = () => navBarRight.classList.add("hidden");
const navBarRightHiddenRemove = () => navBarRight.classList.remove("hidden");

function login() {
  location.href = "login_signup/login.html";
}

let deveshBhai = true;
document.querySelector("#Layer_1").addEventListener("click", function () {
  if (deveshBhai) {
    navBarRightHiddenRemove();

    deveshBhai = false;
  } else {
    navBarRightHiddenAdd();
    deveshBhai = true;
  }
});

overlay.addEventListener("click", function () {
  if (!overlayContainsHidden) navBarRightHiddenAdd();
});

document.addEventListener("keydown", function (e) {
  if (!overlayContainsHidden) navBarRightHiddenAdd();
});

document.addEventListener("scroll", function () {
  if (!overlayContainsHidden) navBarRightHiddenAdd();
});

const tabs = document.querySelectorAll(".operations__tab");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

document
  .querySelector(".operations__tab--container")
  .addEventListener("click", function (e) {
    console.log("hello");

    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;
    //activate tab
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");
    //activate content area
    tabsContent.forEach((e) =>
      e.classList.remove("operations__content--active")
    );

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
