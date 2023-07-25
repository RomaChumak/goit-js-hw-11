function createImg(data) {
    const gallery = document.querySelector('.gallery')

    const card = data.map(img => `<a href="${img.largeImageURL}"><div class="photo-card">
  <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${img.likes}</b>
    </p>
    <p class="info-item">
      <b>${img.views}</b>
    </p>
    <p class="info-item">
      <b>${img.comments}</b>
    </p>
    <p class="info-item">
      <b>${img.downloads}</b>
    </p>
  </div>
</div></a>`)
        .join('')
    gallery.insertAdjacentHTML('beforeend', card)
}

export { createImg}