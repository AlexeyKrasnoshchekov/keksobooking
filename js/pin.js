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
  var TICKETS_LIMIT = 5;
  var tickets = [];


  var currentOfferLocation = {
    x: MAIN_PIN_X + MAIN_PIN_SIZE / 2,
    y: MAIN_PIN_Y + MAIN_PIN_SIZE / 2
  };

  var houseType = document.querySelector('#housing-type');

  function onError() {

  }

  function pinClickHandler(limitedTicket) {

    var renderedPins = document.querySelectorAll('.map__pin');


    renderedPins.forEach(function (renderedPin) {
      renderedPin.addEventListener('click', window.map.renderCard(limitedTicket));
    });

  }

  function onSuccess(data) {
    tickets = data;
    var limitedTickets = [];
    for (var i = 0; i < tickets.length && i < TICKETS_LIMIT; i++) {
      limitedTickets.push(data[i]);
    }

    window.map.renderPins(limitedTickets);

    limitedTickets.forEach(function (limitedTicket) {
      pinClickHandler(limitedTicket);
    });

    // var ndList = window.map.mapPins.childNodes;


  }

  function filterByHouseType(ticket) {
    var housingType = houseType.value;
    return (housingType === 'any') || (housingType === ticket.offer.type);
  }

  function filterTickets(ticketsToFilter) {
    var filteredTickets = [];

    for (var i = 0; i < ticketsToFilter.length && filteredTickets.length < TICKETS_LIMIT; i++) {
      var offer = ticketsToFilter[i];
      if (filterByHouseType(offer)) {
        filteredTickets.push(offer);
      }
    }
    return filteredTickets;
  }

  function onFilterChange() {
    var filteredTickets = filterTickets(tickets);
    window.map.removePins();
    window.map.renderPins(filteredTickets);
  }

  function activateMap(evt) {
    if (evt.button !== 0) {
      return;
    }
    evt.preventDefault();

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
    onFilterChange: onFilterChange
  };
})();

