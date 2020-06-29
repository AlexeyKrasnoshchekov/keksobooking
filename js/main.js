'use strict';

(function () {
  var roomSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');
  var mainPin = document.querySelector('.map__pin--main');


  window.load('https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/unknownfile.json', window.load.onSuccess, window.load.onError);


  window.form.updateCurrentOfferLocation(window.pin.currentOfferLocation);
  window.map.disableMapFilters();
  window.form.disableAdForm();

  roomSelectElement.addEventListener('change', window.form.validateRoomsAndGuests);
  capacitySelectElement.addEventListener('change', window.form.validateRoomsAndGuests);
  mainPin.addEventListener('click', window.pin.activateMap);
})();
