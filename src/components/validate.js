const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const inputElementError = formElement.querySelector(`#${inputElement.id}`);
  inputElementError.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const inputElementError = formElement.querySelector(`#${inputElement.id}`);
  inputElementError.classList.remove('popup__field_type_error');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => { 
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__save-button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__save-button_status_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__save-button_status_disabled');
  }
};

const blockInvalidForm = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__save-button_status_disabled');
  }
};

const disableSubmitButtonIfInputsInvalid = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    blockInvalidForm(formElement);
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_status_disabled',
  inputErrorClass: 'popup__field_type_error',
}); 

export {disableSubmitButtonIfInputsInvalid, enableValidation}