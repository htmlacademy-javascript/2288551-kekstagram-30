import {isEscapeKey} from './util';

const elementSuccess = document
  .querySelector('#success')
  .content.
  querySelector('.success');

const elementError = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

function onBodyClick(evt) {
  if(evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function showMessage(element, button) {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  element.querySelector(button).addEventListener('click', onCloseButton);
  document.addEventListener('keydown', onDocumentKeydown);

}
function hideMessage() {
  const elementMessage = document.querySelector('.success') || document.querySelector('.error');
  elementMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

function onCloseButton() {
  hideMessage();
}

function showSuccessMessage() {
  showMessage(elementSuccess, '.success__button');
}
function showErrorMessage() {
  showMessage(elementError, '.error__button');
}
export { showSuccessMessage, showErrorMessage };
