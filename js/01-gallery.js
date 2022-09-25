import { galleryItems } from "./gallery-items.js";

const refsGallery = document.querySelector(".gallery");

function createItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}
// console.log(createItem(galleryItems));
const addCreateItem = createItem(galleryItems);
refsGallery.insertAdjacentHTML("beforeend", addCreateItem);

refsGallery.addEventListener("click", onClick);
// refsGallery.addEventListener("keydown", onEscape);

function onClick(event) {
  event.preventDefault();
  const dataSource = event.target.dataset.source;
  if (!dataSource) {
    return;
  }
  const instance = basicLightbox.create(`
  <img src="${dataSource}" width="800" height="600">
`);
  instance.show();

  refsGallery.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      instance.close();
      refsGallery.removeEventListener("keydown", event);
    }
  });
}
