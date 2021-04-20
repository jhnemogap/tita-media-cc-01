const [burgerMenuClassName, navBarBurger] = ["burger-icon", "nav-bar-burger"];
const $burgerIcon = document.getElementsByClassName(burgerMenuClassName)[0];

$burgerIcon.onclick = () => {
  const $menuList = document.getElementsByClassName(navBarBurger)[0];
  $menuList.classList.toggle("nav-bar-burger-toggle-on");
}

