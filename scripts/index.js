const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonCloseEditPopup = popupEdit.querySelector('.popup__close-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonCloseAddPopup = popupAdd.querySelector('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopupFieldTitle = popupEdit.querySelector('.popup__field_type_title');
const editPopupFieldSubtitle = popupEdit.querySelector('.popup__field_type_subtitle');
const addPopupFieldTitle = popupAdd.querySelector('.popup__field_type_title');
const addPopupFieldSubtitle = popupAdd.querySelector('.popup__field_type_url');
const buttonSaveEditPopup = popupEdit.querySelector('.popup__save-button_type_edit');
const formEditPopup = popupEdit.querySelector('.popup__form_type_edit');
const formAddPopup = popupAdd.querySelector('.popup__form_type_add');
const gridItemTemplate = document.querySelector('#card-template').content.querySelector('.grid-item');
const gridContainer = document.querySelector('.photo-grid');
const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const buttonCloseImagePopup = popupImage.querySelector('.popup__close-button');


const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

buttonOpenEditPopup.addEventListener('click', () => {
  editPopupFieldTitle.value = profileTitle.textContent;
  editPopupFieldSubtitle.value = profileSubtitle.textContent;
 openPopup(popupEdit);
});

buttonOpenAddPopup.addEventListener('click', () => {
  openPopup(popupAdd);
  addPopupFieldTitle.value = '';
  addPopupFieldSubtitle.value = '';
});

buttonCloseEditPopup.addEventListener('click', () => {
  closePopup(popupEdit);
});

buttonCloseAddPopup.addEventListener('click', () => {
  closePopup(popupAdd);
});

buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(popupImage);
});

const handleSubmitEditForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = editPopupFieldTitle.value;
  profileSubtitle.textContent = editPopupFieldSubtitle.value;
  closePopup(popupEdit);
}

formEditPopup.addEventListener('submit', handleSubmitEditForm);

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  const name = addPopupFieldTitle.value;
  const link = addPopupFieldSubtitle.value;
  renderCard({name, link});
  closePopup(popupAdd);
};

const renderCard = (data) => {
  const card = createCard(data);
  gridContainer.prepend(card);
};

const createCard = (data) => {
  const card = gridItemTemplate.cloneNode(true);
  card.querySelector('.grid-item__text').textContent = data.name;
  const image = card.querySelector('.grid-item__image');
  image.src = data.link;
  image.alt = 'Изображение';
  image.addEventListener('click', () => {
    popupImageImage.src = data.link;
    popupImageImage.alt = 'Изображение ${data.name}';
    popupImageCaption.textContent = data.name;
    openPopup(popupImage);
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

formAddPopup.addEventListener('submit', handleSubmitAddForm);

initialCards.reverse().forEach((data) => {
  renderCard(data);
});