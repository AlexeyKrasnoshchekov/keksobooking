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
  var TICKETS_LIMIT = 5;

  var currentOfferLocation = {
    x: MAIN_PIN_X + MAIN_PIN_SIZE / 2,
    y: MAIN_PIN_Y + MAIN_PIN_SIZE / 2
  };

  var houseType = document.querySelector('#housing-type');

  function onError() {

  }

  function onSuccess(data) {
    tickets = data;
    console.log(22, tickets);
    

    var limitedTickets = tickets.
    filter(function (ticket, i) {
      return i <= (TICKETS_LIMIT - 1);
    });
    console.log(1, limitedTickets);

    window.map.renderPins(limitedTickets);
  }


  function activateMap(evt) {
    if (evt.button !== 0) {
      return;
    }
    evt.preventDefault();

    houseType.addEventListener('change', function () {
        console.log(houseType.value);
    });

    window.load(onSuccess, onError);

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
    activateMap: activateMap,
    houseType: houseType
  };
})();

