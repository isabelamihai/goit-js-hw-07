import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
  }).join('');
}

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  
  const isGalleryImage = event.target.classList.contains('gallery__image');
  
  if (!isGalleryImage) {
    return;
  }

  const imageSource = event.target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${imageSource}" width="800" height="600">
  `);

  instance.show();

  document.addEventListener('keydown', onEscapePress);

  function onEscapePress(event) {
    if (event.key === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', onEscapePress);
    }
  }
}
console.log(galleryItems);
