const togglebtn = document.querySelector(".nav_togglebtn");
const menu = document.querySelector(".nav_menu");
const icons = document.querySelector(".nav_icons");

togglebtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  icons.classList.toggle("active");
});
