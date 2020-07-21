'use strict';

window.success = (function () {
  var body = document.querySelector('body');
  var openedSuccess = document.querySelector('#success');
  var openedError = document.querySelector('#error');

  function closePopupOnClickHandler(evt) {
    evt.preventDefault();
    closeSuccess();
    
    // closeError();
    window.removeEventListener('keydown', closePopupOnEcsHandler);
  }

  function closePopupOnEcsHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {

      closeSuccess();

      // closeError();
      window.removeEventListener('click', closePopupOnClickHandler);
    }
  }

  function openSuccess() {
    
    var successTemplate = document.querySelector('#success').content;
    var newSuccessTemplate = successTemplate.querySelector('.success');
    var newSuccess = newSuccessTemplate.cloneNode(true);
    window.addEventListener('keydown', closePopupOnEcsHandler, {once: true});
    window.addEventListener('click', closePopupOnClickHandler, {once: true});
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
    var body = document.querySelector('body');
    var errorTemplate = document.querySelector('#error').content;
    var newErrorTemplate = errorTemplate.querySelector('.error');
    var newError = newErrorTemplate.cloneNode(true);
    window.addEventListener('keydown', closePopupOnEcsHandler, {once: true});
    window.addEventListener('click', closePopupOnClickHandler, {once: true});
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
