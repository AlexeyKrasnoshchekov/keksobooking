'use strict';

window.pin = (function () {
  var MAX_TICKETS_LENGTH = 8;
  var MAIN_PIN_X = (window.data.X_MAX_COORDINATE - window.data.X_MIN_COORDINATE) / 2;
  var MAIN_PIN_Y = (window.data.Y_MAX_COORDINATE - window.data.Y_MIN_COORDINATE) / 2;
  var MAIN_PIN_SIZE = 200;
  var MAIN_PIN_POINTER_Y = 22;

  var mainPin = document.querySelector('.map__pin--main');

  var currentOfferLocation = {
    x: MAIN_PIN_X + MAIN_PIN_SIZE / 2,
    y: MAIN_PIN_Y + MAIN_PIN_SIZE / 2
  };

  mainPin.addEventListener('click', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var randomTickets = window.data.getArrayOfRandomTickets(MAX_TICKETS_LENGTH);
      window.map.renderPins(randomTickets);

      window.map.enableMapFilters();
      window.form.enableAdForm();

      currentOfferLocation.y = MAIN_PIN_Y + MAIN_PIN_SIZE / 2 + MAIN_PIN_POINTER_Y;
      window.form.updateCurrentOfferLocation(currentOfferLocation);

      var map = document.querySelector('.map');
      var adForm = document.querySelector('.ad-form');
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    }
  });
  return {
    currentOfferLocation: currentOfferLocation
  };
})();
