'use strict';

window.pin = (function () {
  var X_MIN_COORDINATE = 0;
  var X_MAX_COORDINATE = 1200;
  var Y_MIN_COORDINATE = 130;
  var Y_MAX_COORDINATE = 630;
  var MAIN_PIN_X = (X_MAX_COORDINATE - X_MIN_COORDINATE) / 2;
  var MAIN_PIN_Y = (Y_MAX_COORDINATE - Y_MIN_COORDINATE) / 2;
  var MAIN_PIN_SIZE = 200;
  var MAIN_PIN_POINTER_Y = 22;
  var tickets = [];

  var currentOfferLocation = {
    x: MAIN_PIN_X + MAIN_PIN_SIZE / 2,
    y: MAIN_PIN_Y + MAIN_PIN_SIZE / 2
  };

  function onError() {

  }

  function onSuccess(data) {
    tickets = data;
    window.map.renderPins(tickets);
  }

  function activateMap(evt) {
    if (evt.button !== 0) {
      return;
    }
    evt.preventDefault();

    window.load(onSuccess, onError);

    window.map.renderPins(tickets);

    window.map.enableMapFilters();
    window.form.enableAdForm();

    currentOfferLocation.y = MAIN_PIN_Y + MAIN_PIN_SIZE / 2 + MAIN_PIN_POINTER_Y;
    window.form.updateCurrentOfferLocation(currentOfferLocation);

    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  }

  return {
    currentOfferLocation: currentOfferLocation,
    activateMap: activateMap
  };
})();

