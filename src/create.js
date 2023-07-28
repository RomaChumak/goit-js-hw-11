function createImageCard(data) {
    const gallery = document.querySelector('.gallery')

    const card = data.map(img => `<a href="${img.largeImageURL}"><div class="photo-card">
  <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>${img.likes}
    </p>
    <p class="info-item">
      <b>Views:</b>${img.views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${img.comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${img.downloads}
    </p>
  </div>
</div></a>`)
        .join('')
    gallery.insertAdjacentHTML('beforeend', card)
}

export { createImageCard}