const [burgerMenuClassName, navBarBurger] = ["burger-icon", "nav-bar-burger"];
const [galleryModeId1, galleryModeId2] = ["change-gallery-mode-1", "change-gallery-mode-2"];

// ++++++  Change mode: main navigation menu  ++++++
const $burgerIcon = document.getElementsByClassName(burgerMenuClassName)[0];

$burgerIcon.onclick = () => {
  const $menuList = document.getElementsByClassName(navBarBurger)[0];
  $menuList.classList.toggle("nav-bar-burger-toggle-on");
}

// ++++++  Change mode: gallery  ++++++
const $galleryModeId1 = document.getElementById(galleryModeId1);
const $galleryModeId2 = document.getElementById(galleryModeId2);

const changeGalleryMode = (mode) => {
  const nameOfClass = { mode1: "gallery-masonry__item", mode2: "gallery-masonry__item--single-row" };
  let articles = Array.from(document.getElementsByTagName("article"));
  if (nameOfClass[mode] !== articles[0].classList.value) {
    articles.map((item) => {
        item.classList.toggle(nameOfClass.mode1);
        item.classList.toggle(nameOfClass.mode2);
    })
  }
};

$galleryModeId1.onclick = () => changeGalleryMode("mode1");
$galleryModeId2.onclick = () => changeGalleryMode("mode2");
