import './pages/index.css';
import {enableValidation} from './components/validate.js';
import {openPopup as handleOpenPopup, closePopup} from './components/modal.js';
import {createCard, popupImage, popupImageImage} from './components/card.js';
import {getUserInfo, getInitialCards, patchProfileInfo, patchProfileImage, addCard} from './components/api.js';

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupEditProfileImage = document.querySelector('.popup_type_edit-avatar');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopupFieldTitle = popupEdit.querySelector('.popup__field_type_name');
const editPopupFieldSubtitle = popupEdit.querySelector('.popup__field_type_subtitle');
const addPopupFieldTitle = popupAdd.querySelector('.popup__field_type_title');
const addPopupFieldSubtitle = popupAdd.querySelector('.popup__field_type_url');
const fieldLinkProfileImage = popupEditProfileImage.querySelector('.popup__field_type_url-avatar');
const formEditPopup = document.forms.edit_profile;
const formAddPopup = document.forms.add_card;
const formEditProfileImage = document.forms.edit_avatar;
const gridContainer = document.querySelector('.photo-grid');
const closeButtons = document.querySelectorAll('.popup__close-button');
const buttonSubmitAddPopup = popupAdd.querySelector('.popup__save-button');
const buttonSubmitEditProfileImage =popupEditProfileImage.querySelector('.popup__save-button');
const buttonEditProfileImage = document.querySelector('.profile__avatar-button');
const profileImage = document.querySelector('.profile__avatar');

buttonOpenEditPopup.addEventListener('click', () => {
  editPopupFieldTitle.value = profileTitle.textContent;
  editPopupFieldSubtitle.value = profileSubtitle.textContent;
  handleOpenPopup(popupEdit);
});

buttonOpenAddPopup.addEventListener('click', () => {
  handleOpenPopup(popupAdd);
  buttonSubmitAddPopup.disabled = true;
  buttonSubmitAddPopup.classList.add('popup__save-button_status_disabled');
});

buttonEditProfileImage.addEventListener('click', () => {
  handleOpenPopup(popupEditProfileImage);
  buttonSubmitEditProfileImage.disabled = true;
  buttonSubmitEditProfileImage.classList.add('popup__save-button_status_disabled');
})

popupImageImage.addEventListener('click', () => {
  handleOpenPopup(popupImage);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const handleSubmitProfileImageForm = (evt) => {
  evt.preventDefault();
  patchProfileImage(fieldLinkProfileImage.value)
  .then(evt.submitter.textContent = 'Сохранение...')
  .then((res) => {
    profileImage.src = res.avatar;
  })
  .finally(() => {closePopup(popupEditProfileImage), evt.submitter.textContent = 'Сохранить', evt.target.reset();})
};

formEditProfileImage.addEventListener('submit', handleSubmitProfileImageForm);

const handleSubmitEditForm = (evt) => {
  evt.preventDefault();
  patchProfileInfo(editPopupFieldTitle.value, editPopupFieldSubtitle.value)
  .then(evt.submitter.textContent = 'Сохранение...')
  .then((res) => {
    profileTitle.textContent = res.name;
    profileSubtitle.textContent = res.about;
  })
  .finally(() => {closePopup(popupEdit), evt.submitter.textContent = 'Сохранить'})
};

formEditPopup.addEventListener('submit', handleSubmitEditForm);

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  addCard(addPopupFieldTitle.value, addPopupFieldSubtitle.value)
  .then(evt.submitter.textContent = 'Создание...')
  .then(res => {
    const newCard = createCard(res, res.owner._id, handleOpenPopup)
    renderCard(newCard)
  })
  .finally(() => {closePopup(popupAdd), evt.submitter.textContent = 'Создать', evt.target.reset()})
};

formAddPopup.addEventListener('submit', handleSubmitAddForm);

const renderCard = (data) => {
  const card = data;
  gridContainer.prepend(card);
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_status_disabled',
  inputErrorClass: 'popup__field_type_error',
}); 

Promise.all([getUserInfo(), getInitialCards()])
.then (([userInfo, cards]) => {
  profileTitle.textContent = userInfo.name;
  profileSubtitle.textContent  = userInfo.about;
  profileImage.src = userInfo.avatar;
  profileImage.alt = `Фото ${userInfo.name}`;
  cards.reverse().forEach((card) => {
    const newCard = createCard(card, userInfo._id, handleOpenPopup)
    renderCard(newCard)
  })
})