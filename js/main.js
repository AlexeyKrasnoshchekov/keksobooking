'use strict';

(function () {
  var timeInSelectElement = document.querySelector('#timein');
  var timeOutSelectElement = document.querySelector('#timeout');
  var mainPin = document.querySelector('.map__pin--main');
  var roomSelectElement = document.querySelector('#room_number');
  var typeSelectElement = document.querySelector('#type');
  var capacitySelectElement = document.querySelector('#capacity');

  window.form.updateCurrentOfferLocation(window.pin.currentOfferLocation);


  roomSelectElement.addEventListener('change', window.form.validateRoomsAndGuests);
  capacitySelectElement.addEventListener('change', window.form.validateRoomsAndGuests);
  typeSelectElement.addEventListener('change', window.form.validatePriceAndTypes);
  timeInSelectElement.addEventListener('change', window.form.validateTimeIn);
  timeOutSelectElement.addEventListener('change', window.form.validateTimeOut);

  mainPin.addEventListener('click', window.pin.activateMap);
  window.move();

})();
