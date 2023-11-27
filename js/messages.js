const successContainer = document
  .querySelector('#success')
  .content.
  querySelector('.success');

const errorContainer = document
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
  showMessage(successContainer, '.success__button');
}

function showErrorMessage() {
  showMessage(errorContainer, '.error__button');
}

export { showSuccessMessage, showErrorMessage };
