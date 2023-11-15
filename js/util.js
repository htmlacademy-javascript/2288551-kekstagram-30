const ALERT_SHOW_TIME = 5000;
const templateDataError = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

function showErrorMessage() {
  const errorElement = templateDataError.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showErrorMessage };
