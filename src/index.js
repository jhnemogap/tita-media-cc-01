const [burgerMenuHtmlId, burgerNavBarHtmlId] = ["burger-icon", "nav-bar-burger"];
const [galleryMode1HtmlId, galleryMode2HtmlId] = ["change-gallery-mode-1", "change-gallery-mode-2"];
const showMoreHtmlId = "show-more";

// ++++++  Change mode: main navigation menu  ++++++
const $burgerIcon = document.getElementById(burgerMenuHtmlId);

$burgerIcon.onclick = () => document.getElementById(burgerNavBarHtmlId)
  .classList.toggle("nav-bar-burger-toggle-on");


// ++++++  Change mode: gallery  ++++++
const $galleryMode1 = document.getElementById(galleryMode1HtmlId);
const $galleryMode2 = document.getElementById(galleryMode2HtmlId);

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

$galleryMode1.onclick = () => changeGalleryMode("mode1");
$galleryMode2.onclick = () => changeGalleryMode("mode2");


// ++++++  Read URL  ++++++
const valueToSearch = (new URLSearchParams(window.location.search)).get("search") ?? "trending";

// ++++++  Get Data  ++++++
// const pagingControl = { next: null, prev: null };
let newPhotos = {
  next_page: "",
  prev_page: "",
  total_results: NaN,
  page: 0,
  per_page: 14,
  photos: []
};

function getPhotos({ url, apiKey }, setNewData) { // generic fetch with url, apikey and callback
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": apiKey
    }
  })
    .then((response) => response.json())
    .then((result) => setNewData(result))
    .catch((error) => {
      console.error("El error fue:", error.message);
    });
}

const getPhotosByPexels = () => {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;
  const firstRequestUrl = `${API_URL}/search?query=${valueToSearch}&per_page=${newPhotos.per_page}&page=`;
  const reqUrl = newPhotos.page === 0 ? firstRequestUrl : newPhotos?.next_page;
  if (reqUrl) {
    getPhotos({ url: reqUrl, apiKey: API_KEY }, (resp) => { newPhotos = resp; });
  }
};

// First request of Photos
getPhotosByPexels();
// consequent calls to action to show more
document.getElementById(showMoreHtmlId).addEventListener("click", () => getPhotosByPexels());
