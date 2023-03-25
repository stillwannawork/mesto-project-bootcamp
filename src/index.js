import './pages/index.css';
import {enableValidation} from './components/validate.js';
import {openPopup as handleOpenPopup, closePopup} from './components/modal.js';
import {createCard, popupLargeImage, imageElement} from './components/card.js';
import {getUserInfo, getInitialCards, patchProfileInfo, patchProfileImage, addCard} from './components/api.js';

const popupEditProfileImage = document.querySelector('.popup_type_edit-avatar');
const popupEditProfileInfo = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const buttonOpenPopupEditProfileImage = document.querySelector('.profile__avatar-button');
const buttonOpenPopupEditProfileInfo = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const imageProfile = document.querySelector('.profile__avatar');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const formEditProfileImage = document.forms.edit_avatar;
const formEditProfileInfo = document.forms.edit_profile;
const formAddCard = document.forms.add_card;
const fieldTitleFormEditProfileInfo = formEditProfileInfo.querySelector('.popup__field_type_name');
const fieldSubtitleFormEditProfileInfo = formEditProfileInfo.querySelector('.popup__field_type_subtitle');
const fieldTitleFormAddCard = formAddCard.querySelector('.popup__field_type_title');
const fieldSubtitleFormAddCard = formAddCard.querySelector('.popup__field_type_url');
const fieldLinkProfileImage = popupEditProfileImage.querySelector('.popup__field_type_url-avatar');
const gridContainer = document.querySelector('.photo-grid');
const buttonsListClosePopup = document.querySelectorAll('.popup__close-button');
const buttonSubmitAddCardForm = formAddCard.querySelector('.popup__save-button');
const buttonSubmitEditProfileImageForm = formEditProfileImage.querySelector('.popup__save-button');

buttonOpenPopupEditProfileInfo.addEventListener('click', () => {
  fieldTitleFormEditProfileInfo.value = titleProfile.textContent;
  fieldSubtitleFormEditProfileInfo.value = subtitleProfile.textContent;
  handleOpenPopup(popupEditProfileInfo);
});

buttonOpenPopupAddCard.addEventListener('click', () => {
  handleOpenPopup(popupAddCard);
  buttonSubmitAddCardForm.disabled = true;
  buttonSubmitAddCardForm.classList.add('popup__save-button_status_disabled');
});

buttonOpenPopupEditProfileImage.addEventListener('click', () => {
  handleOpenPopup(popupEditProfileImage);
  buttonSubmitEditProfileImageForm.disabled = true;
  buttonSubmitEditProfileImageForm.classList.add('popup__save-button_status_disabled');
});
// Я не понимаю как использовать функцию из валидатора для управления кнопкой

imageElement.addEventListener('click', () => {
  handleOpenPopup(popupLargeImage);
});

buttonsListClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const handleSubmitEditProfileImageForm = (evt) => {
  evt.preventDefault();
  patchProfileImage(fieldLinkProfileImage.value)
  .then(evt.submitter.textContent = 'Сохранение...')
  .then((res) => {
    imageProfile.src = res.avatar;
    closePopup(popupEditProfileImage);
    evt.target.reset();
  })
  .catch(rej => console.log(`Ошибка ${rej}`))
  .finally(() => {evt.submitter.textContent = 'Сохранить'})
};

formEditProfileImage.addEventListener('submit', handleSubmitEditProfileImageForm);

const handleSubmitEditProfileInfoForm = (evt) => {
  evt.preventDefault();
  patchProfileInfo(fieldTitleFormEditProfileInfo.value, fieldSubtitleFormEditProfileInfo.value)
  .then(evt.submitter.textContent = 'Сохранение...')
  .then((res) => {
    titleProfile.textContent = res.name;
    subtitleProfile.textContent = res.about;
    closePopup(popupEditProfileInfo)
  })
  .catch(rej => console.log(`Ошибка ${rej}`))
  .finally(() => {evt.submitter.textContent = 'Сохранить'})
};

formEditProfileInfo.addEventListener('submit', handleSubmitEditProfileInfoForm);

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  addCard(fieldTitleFormAddCard.value, fieldSubtitleFormAddCard.value)
  .then(evt.submitter.textContent = 'Создание...')
  .then(res => {
    const newCard = createCard(res, res.owner._id, handleOpenPopup);
    renderCard(newCard);
    closePopup(popupAddCard);
    evt.target.reset();
  })
  .catch(rej => console.log(`Ошибка ${rej}`))
  .finally(() => {evt.submitter.textContent = 'Создать'})
};

formAddCard.addEventListener('submit', handleSubmitAddForm);

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
  titleProfile.textContent = userInfo.name;
  subtitleProfile.textContent  = userInfo.about;
  imageProfile.src = userInfo.avatar;
  imageProfile.alt = `Фото ${userInfo.name}`;
  cards.reverse().forEach((card) => {
    const newCard = createCard(card, userInfo._id, handleOpenPopup)
    renderCard(newCard)
  })
})
.catch(rej => console.log(`Ошибка ${rej}`))