'use strict';

window.popup = (function () {
  var body = document.querySelector('body');
  var openedSuccess = document.querySelector('#success');
  var openedError = document.querySelector('#error');

  function closeSuccessOnClickHandler(evt) {
    evt.preventDefault();
    closeSuccess();
    window.removeEventListener('keydown', closeSuccessOnEcsHandler);
  }

  function closeSuccessOnEcsHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      closeSuccess();
      window.removeEventListener('click', closeSuccessOnClickHandler);
    }
  }

  function closeErrorOnClickHandler(evt) {
    evt.preventDefault();
    closeError();
    window.removeEventListener('keydown', closeErrorOnEcsHandler);
  }

  function closeErrorOnEcsHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {

      closeError();
      window.removeEventListener('click', closeErrorOnClickHandler);
    }
  }

  function openSuccess() {
    var successTemplate = document.querySelector('#success').content;
    var newSuccessTemplate = successTemplate.querySelector('.success');
    var newSuccess = newSuccessTemplate.cloneNode(true);
    window.addEventListener('keydown', closeSuccessOnEcsHandler, {once: true});
    window.addEventListener('click', closeSuccessOnClickHandler, {once: true});
    openedSuccess = newSuccess;
    body.appendChild(newSuccess);
  }

  function closeSuccess() {
    if (openedSuccess) {
      openedSuccess.remove();
    }
    openedSuccess = null;
  }

  function openError() {
    var errorTemplate = document.querySelector('#error').content;
    var newErrorTemplate = errorTemplate.querySelector('.error');
    var newError = newErrorTemplate.cloneNode(true);
    window.addEventListener('keydown', closeErrorOnEcsHandler, {once: true});
    window.addEventListener('click', closeErrorOnClickHandler, {once: true});
    openedError = newError;
    body.appendChild(newError);
  }

  function closeError() {
    if (openedError) {
      openedError.remove();
    }
    openedError = null;
  }

  return {
    openSuccess: openSuccess,
    openError: openError
  };

})();
