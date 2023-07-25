import { fetchImages } from "./api";
import { createImg } from "./create";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Loading, Notify } from 'notiflix';

const selectors = {
    form: document.querySelector(".search-form"),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')

};

let currentPage = 1;
let searchQuery = '';
let lb = new SimpleLightbox('.gallery a');

selectors.form.addEventListener('submit', handleSubmit);
selectors.loadMoreBtn.addEventListener('click', onLoadMore);

async function handleSubmit(evt) {
  evt.preventDefault();
  selectors.loadMoreBtn.style.display = 'none';
  searchQuery = selectors.form.elements.searchQuery.value.trim();
  if (searchQuery === '') return;

  currentPage = 1;
  selectors.gallery.innerHTML = '';

  Loading.hourglass();

  try {
    const data = await fetchImages(searchQuery, currentPage);
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    createImg(data.hits);
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    lb.refresh();
    showLoadMoreButton(data.totalHits);
  } catch (error) {
    Notify.failure('Error fetching images. Please try again later.');
  } finally {
    Loading.remove();
  }
}

async function onLoadMore() {
  currentPage += 1;

  Loading.hourglass('Loading more images...');
  try {
    const data = await fetchImages(searchQuery, currentPage);
    createImg(data.hits);
    lb.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    if (currentPage === Math.round(data.totalHits / 40)) {
      loadMoreBtn.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notify.failure('Error loading more images. Please try again later.');
  } finally {
    Loading.remove();
  }
}

function showLoadMoreButton(totalHits) {
  if (currentPage * 40 < totalHits) {
    loadMoreBtn.style.display = 'block';
  }
}