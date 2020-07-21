'use strict';

window.success = (function () {
  var openedSuccess = document.querySelector('#success');

  function closePopupOnClickHandler(evt) {
    evt.preventDefault();
    closeSuccess();
    window.removeEventListener('keydown', closePopupOnEcsHandler);
  }

  function closePopupOnEcsHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      closeSuccess();
      window.removeEventListener('click', closePopupOnClickHandler);
    }
  }

  function openSuccess() {
    var body = document.querySelector('body');
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



  return {
    openSuccess: openSuccess
  };

})();
