const gridItemTemplate = document.querySelector('#card-template').content.querySelector('.grid-item');
const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const createCard = (data, onOpenPopup) => {
  const card = gridItemTemplate.cloneNode(true);
  card.querySelector('.grid-item__text').textContent = data.name;
  const image = card.querySelector('.grid-item__image');
  image.src = data.link;
  image.alt = `Изображение ${data.name}`;
  image.addEventListener('click', () => {
    popupImageImage.src = data.link;
    popupImageImage.alt = `Изображение ${data.name}`;
    popupImageCaption.textContent = data.name;
    onOpenPopup(popupImage);
  });
  
  card.querySelector('.grid-item__delete-icon').addEventListener('click', handleDeleteCard);
  card.querySelector('.grid-item__like-icon').addEventListener('click', handleLikeCard);

  return card;
};

const handleDeleteCard = (event) => {
  event.target.closest('.grid-item').remove();
};

const handleLikeCard = (likeEvent) => {
  likeEvent.target.classList.toggle('grid-item__like-icon_active');
};

export {createCard, popupImage, popupImageImage}