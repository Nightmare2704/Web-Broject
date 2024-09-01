function login() {
  location.href = "login_signup/login.html";
}
function toggleSidebar() {
  const sidebar = document.getElementsByClassName("navbar-right");
  sidebar.classList.toggle("active");
}
let deveshBhai = true;
document.querySelector("#Layer_1").addEventListener("click", function () {
  if (deveshBhai) {
    document.querySelector(".navbar-right").style.opacity = 1;
    deveshBhai = false;
  } else {
    document.querySelector(".navbar-right").style.opacity = 0;

    deveshBhai = true;
  }
});
