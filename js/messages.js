const elementSuccess = document
  .querySelector('#success')
  .content.
  querySelector('.success');

const elementError = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
};

function onBodyClick(evt) {
  if(evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  hideMessage();
}

function showMessage(element, button) {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(button).addEventListener('click', onCloseButton);
}

//не работает keydown на '.error'
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
