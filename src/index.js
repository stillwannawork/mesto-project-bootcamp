import './pages/index.css';
import {initialCards} from './components/index-data.js';
import {enableValidation, disableSubmitButtonIfInputsInvalid} from './components/validate.js';
import {openPopup as handleOpenPopup, closePopup} from './components/modal.js';
import {createCard, popupImage, popupImageImage} from './components/card.js';

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopupFieldTitle = popupEdit.querySelector('.popup__field_type_name');
const editPopupFieldSubtitle = popupEdit.querySelector('.popup__field_type_subtitle');
const addPopupFieldTitle = popupAdd.querySelector('.popup__field_type_title');
const addPopupFieldSubtitle = popupAdd.querySelector('.popup__field_type_url');
const formEditPopup = document.forms.edit_profile;
const formAddPopup = document.forms.add_card;
const gridContainer = document.querySelector('.photo-grid');
const closeButtons = document.querySelectorAll('.popup__close-button');

buttonOpenEditPopup.addEventListener('click', () => {
  editPopupFieldTitle.value = profileTitle.textContent;
  editPopupFieldSubtitle.value = profileSubtitle.textContent;
  handleOpenPopup(popupEdit);
  disableSubmitButtonIfInputsInvalid();
});

buttonOpenAddPopup.addEventListener('click', () => {
  handleOpenPopup(popupAdd);
  disableSubmitButtonIfInputsInvalid();
});

popupImageImage.addEventListener('click', () => {
  handleOpenPopup(popupImage);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const handleSubmitEditForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = editPopupFieldTitle.value;
  profileSubtitle.textContent = editPopupFieldSubtitle.value;
  closePopup(popupEdit);
};

formEditPopup.addEventListener('submit', handleSubmitEditForm);

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  const name = addPopupFieldTitle.value;
  const link = addPopupFieldSubtitle.value;
  renderCard({name, link});
  evt.target.reset();
  closePopup(popupAdd);
};

const renderCard = (data) => {
  const card = createCard(data, handleOpenPopup);
  gridContainer.prepend(card);
};

formAddPopup.addEventListener('submit', handleSubmitAddForm);

initialCards.reverse().forEach((data) => {
  renderCard(data);
});

enableValidation(); 