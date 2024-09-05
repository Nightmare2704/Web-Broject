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
