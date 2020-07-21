'use strict';

(function () {
  var roomSelectElement = document.querySelector('#room_number');
  var typeSelectElement = document.querySelector('#type');
  var timeInSelectElement = document.querySelector('#timein');
  var timeOutSelectElement = document.querySelector('#timeout');
  var capacitySelectElement = document.querySelector('#capacity');
  var mainPin = document.querySelector('.map__pin--main');

  window.form.updateCurrentOfferLocation(window.pin.currentOfferLocation);

  roomSelectElement.addEventListener('change', window.form.validateRoomsAndGuests);
  typeSelectElement.addEventListener('change', window.form.validatePriceAndTypes);
  timeInSelectElement.addEventListener('change', window.form.validateTimeIn);
  timeOutSelectElement.addEventListener('change', window.form.validateTimeOut);
  capacitySelectElement.addEventListener('change', window.form.validateRoomsAndGuests);
  mainPin.addEventListener('click', window.pin.activateMap);
  window.move();

})();
