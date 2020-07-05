'use strict';

window.map = (function () {

  var mapFilters = document.querySelector('.map__filters');

  function renderPins(tickets) {
    var pinTemplate = document.querySelector('#pin').content;
    var newPinTemplate = pinTemplate.querySelector('.map__pin');
    var mapPins = document.querySelector('.map__pins');

    var fragment = new DocumentFragment();
    for (var i = 0; i < tickets.length; i++) {
      var newPin = newPinTemplate.cloneNode(true);
      var ticket = tickets[i];

      newPin.style.left = ticket.location.x + 'px';
      newPin.style.top = ticket.location.y + 'px';
      newPin.querySelector('img').src = ticket.author.avatar;

      fragment.appendChild(newPin);
    }

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
    renderPins: renderPins,
    disableMapFilters: disableMapFilters,
    enableMapFilters: enableMapFilters
  };

})();
