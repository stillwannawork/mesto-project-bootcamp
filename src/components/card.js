import {deleteCard, addLike, removeLike} from './api.js';

const gridItemTemplate = document.querySelector('#card-template').content.querySelector('.grid-item');
const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');


const createCard = (data, userId, onOpenPopup) => {
  const card = gridItemTemplate.cloneNode(true);
  const image = card.querySelector('.grid-item__image');
  const buttonDelete = card.querySelector('.grid-item__delete-icon');
  const buttonLike = card.querySelector('.grid-item__like-icon');
  const likeCounter = card.querySelector('.grid-item__likes-counter');
  const likeArray = data.likes;
  card.querySelector('.grid-item__text').textContent = data.name;
  likeCounter.textContent = data.likes.length;
  card.id = data.owner._id;
  image.src = data.link;
  image.alt = `Изображение ${data.name}`;
  image.addEventListener('click', () => {
    popupImageImage.src = data.link;
    popupImageImage.alt = `Изображение ${data.name}`;
    popupImageCaption.textContent = data.name;
    onOpenPopup(popupImage);
  });
  
  if (card.id != userId) {
    buttonDelete.remove();
  }
  buttonDelete.addEventListener('click', () => handleDeleteCard(data._id, card));
  
  const isLiked = (array) => {
    array.forEach((likeElement) => {
    if (likeElement._id === userId) {
      buttonLike.classList.add('grid-item__like-icon_active')
    }
  })
  };

  isLiked(likeArray);

  const handleLikeCard = (cardId, buttonLike, likeCounter) => {
    if (buttonLike.classList.contains('grid-item__like-icon_active')){
      removeLike(cardId)
      .then(res => {
        buttonLike.classList.remove('grid-item__like-icon_active');
        likeCounter.textContent = res.likes.length
      })
    } else {
      addLike(cardId)
      .then(res => {
        buttonLike.classList.add('grid-item__like-icon_active'); 
        likeCounter.textContent = res.likes.length
      })
    }
  };

  buttonLike.addEventListener('click', () => handleLikeCard(data._id, buttonLike, likeCounter));

  return card;
};

const handleDeleteCard = (cardId, card) => {
  deleteCard(cardId)
  .then(res => {card.remove()})
};

export {createCard, popupImage, popupImageImage}