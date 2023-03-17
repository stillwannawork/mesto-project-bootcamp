const popupsList = document.querySelectorAll('.popup');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscKeyHandler);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscKeyHandler);
};

const closePopupEscKeyHandler = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

const closePopupOverClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

popupsList.forEach(popup => {
  popup.addEventListener('mousedown', closePopupOverClick);
});

export {openPopup, closePopup}