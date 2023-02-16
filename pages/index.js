const popup = document.querySelector('.popup');
const popup_type_add = document.querySelector('.popup_tupe_add');
const openEditPopup = document.querySelector('.profile__edit-button');
const closeEditPopup = popup.querySelector('.popup__close-button');
const openAddPopup = document.querySelector('.profile__add-button');
const closeAddPopup = popup_type_add.querySelector('.popup__close-button');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

openEditPopup.addEventListener('click', () => {
  openPopup(popup);
});

openAddPopup.addEventListener('click', () => {
  openPopup(popup_type_add);
});

closeEditPopup.addEventListener('click', () => {
  closePopup(popup);
});

closeAddPopup.addEventListener('click', () => {
  closePopup(popup_type_add);
})

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const template = document.querySelector('.grid-item').content.querySelector('.grid-item');
const templates = document.querySelector('.photo-grid');
const addTemplate = document.querySelector('.popup__save-button_type_add');

const createItem = (initialCards) => {
  const item = template.cloneNode(true);
  item.querySelector('.grid-item__text').textContent = initialCards.name;
  item.querySelector('.grid-item__image').textContent = initialCards.link;
  item.querySelector('.grid-item__delete-icon').addEventListener('click', deleteItem);

  return item;
};

const deleteItem = (event) => {
  event.target.closest('.grid-item').remove();
};

const renderItem = (data) => {
  templates.prepend(createItem(data));
};

/* const profileTitle = document.querySelector('.profile__title').textContent;
console.log(profileTitle);

const namePlaceholder = popup.querySelector('.popup__title').placeholder;
console.log(namePlaceholder);

const changePlaceholder = () => {
  namePlaceholder = "жак жак жак";
  return namePlaceholder;
}
console.log(namePlaceholder); */

