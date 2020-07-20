'use strict';

window.success = (function () {
  var openedSuccess = document.querySelector('#success');

  function openSuccess() {
    var body = document.querySelector('body');
    var successTemplate = document.querySelector('#success').content;
    var newSuccessTemplate = successTemplate.querySelector('.success');
    var newSuccess = newSuccessTemplate.cloneNode(true);
    window.addEventListener('keydown', closeSuccessOnEcsHandler, {once: true});
    openedSuccess = newSuccess;
    body.appendChild(newSuccess);
  }

  function closeSuccess() {
    if (openedSuccess) {
      openedSuccess.remove();
    }
    openedSuccess = null;
  }

  // function closeSuccess() {
  //   var body = document.querySelector('body');
  //   var successTemplate = document.querySelector('#success').content;
  //   var newSuccessTemplate = successTemplate.querySelector('.success');
  //   var newSuccess = newSuccessTemplate.cloneNode(true);
  //   body.appendChild(newSuccess);
  // }

  function closeSuccessOnEcsHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      closeSuccess();
    }
  }
  return {
    openSuccess: openSuccess
  };

})();
