'use strict';

window.map = (function () {

  var mapFilters = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');


  function removePins() {
    var mapPin = document.querySelectorAll('[type=button]');
    mapPin.forEach(function (pin) {
      pin.remove();
    });
  }


  function renderPins(tickets) {
    var pinTemplate = document.querySelector('#pin').content;
    var newPinTemplate = pinTemplate.querySelector('.map__pin');

    var fragment = new DocumentFragment();

    tickets.forEach(function (ticket) {
      var newPin = newPinTemplate.cloneNode(true);

      newPin.style.left = ticket.location.x + 'px';
      newPin.style.top = ticket.location.y + 'px';
      newPin.querySelector('img').src = ticket.author.avatar;

      newPin.addEventListener('click', function () {
        window.card.removeCard();
        window.map.renderCard(ticket);
      });


      fragment.appendChild(newPin);
    });

    mapPins.appendChild(fragment);
  }


  function disableMapFilters() {
    mapFilters.removeEventListener('change', window.pin.onFilterChange);
    var fieldSet = mapFilters.querySelector('fieldset');
    var selects = mapFilters.querySelectorAll('select');

    fieldSet.setAttribute('disabled', 'disabled');
    selects.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
  }

  function enableMapFilters() {
    mapFilters.addEventListener('change', window.pin.onFilterChange);
    var fieldSet = mapFilters.querySelector('fieldset');
    var selects = mapFilters.querySelectorAll('select');

    fieldSet.removeAttribute('disabled');
    selects.forEach(function (select) {
      select.removeAttribute('disabled');
    });
  }

  return {
    mapPins: mapPins,
    renderPins: renderPins,
    disableMapFilters: disableMapFilters,
    enableMapFilters: enableMapFilters,
    removePins: removePins
  };

})();
