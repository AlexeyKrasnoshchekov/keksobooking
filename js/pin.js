'use strict';

window.pin = (function () {
  var X_SHIFT = 570;
  var Y_SHIFT = 350;
  var MAIN_PIN_SIZE = 60;
  var MAIN_PIN_X = X_SHIFT + MAIN_PIN_SIZE / 2;
  var MAIN_PIN_Y = Y_SHIFT + MAIN_PIN_SIZE / 2;
  var MAIN_PIN_POINTER_Y = 22;
  var TICKETS_LIMIT = 5;
  var tickets = [];

  var currentOfferLocation = {
    x: MAIN_PIN_X,
    y: MAIN_PIN_Y
  };

  var houseType = document.querySelector('#housing-type');

  function onError() {

  }

  function onSuccess(data) {
    tickets = data;
    var limitedTickets = [];
    for (var i = 0; i < tickets.length && i < TICKETS_LIMIT; i++) {
      limitedTickets.push(data[i]);
    }

    window.map.renderPins(limitedTickets);

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

    window.request.get(onSuccess, onError);

    window.map.enableMapFilters();
    window.form.enableAdForm();

    currentOfferLocation.y += MAIN_PIN_SIZE / 2 + MAIN_PIN_POINTER_Y;
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

