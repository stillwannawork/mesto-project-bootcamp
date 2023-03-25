import {deleteCard, addLike, removeLike} from './api.js';
import { closePopup } from './modal.js';

const gridItemTemplate = document.querySelector('#card-template').content.querySelector('.grid-item');
const popupLargeImage = document.querySelector('.popup_type_image');
const imageElement = popupLargeImage.querySelector('.popup__image');
const captionElement = popupLargeImage.querySelector('.popup__caption');
const popupDeleteCard = document.querySelector('.popup_type_delete');
const buttonSubmitDeleteCard = popupDeleteCard.querySelector('.popup__save-button');

const cardObjectForDelete = {
  cardId: '',
  card: null,
}

const handleDeleteCard = () => {
  deleteCard(cardObjectForDelete.cardId) 
  .then(() => {
    cardObjectForDelete.card.remove()
    closePopup(popupDeleteCard)
  })
  .catch(rej => console.log(`Ошибка ${rej}`))
}

document.forms.delete_card.addEventListener('click', handleDeleteCard)


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
    imageElement.src = data.link;
    imageElement.alt = `Изображение ${data.name}`;
    captionElement.textContent = data.name;
    onOpenPopup(popupLargeImage);
  });
  
  if (card.id != userId) {
    buttonDelete.remove();
  }

  buttonDelete.addEventListener('click', () => {
    cardObjectForDelete.cardId = data._id;
    cardObjectForDelete.card = card;
    onOpenPopup(popupDeleteCard);
  });
  

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
      .catch(rej => console.log(`Ошибка ${rej}`))
    } else {
      addLike(cardId)
      .then(res => {
        buttonLike.classList.add('grid-item__like-icon_active'); 
        likeCounter.textContent = res.likes.length
      })
      .catch(rej => console.log(`Ошибка ${rej}`))
    }
  };

  buttonLike.addEventListener('click', () => handleLikeCard(data._id, buttonLike, likeCounter));

  return card;
};

export {createCard, popupLargeImage, imageElement}