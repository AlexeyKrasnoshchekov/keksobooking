'use strict';

window.map = (function () {

  var mapFilters = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var offerTypes = ['flat', 'bungalo', 'house', 'palace'];

  function renderPins(tickets) {
    var pinTemplate = document.querySelector('#pin').content;
    var newPinTemplate = pinTemplate.querySelector('.map__pin');

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

  function getOfferType(offerType) {
    switch (offerType) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Неизвестно';
    }
  }

  function renderCards(tickets) {
    var cardTemplate = document.querySelector('#card').content;
    var newCardTemplate = cardTemplate.querySelector('.map__card');
    var mapContainer = document.querySelector('.map');

    var fragment = new DocumentFragment();
    for (var i = 0; i < tickets.length; i++) {
      var newCard = newCardTemplate.cloneNode(true);
      var ticket = tickets[i];
      newCard.querySelector('.popup__title').textContent = ticket.offer.title;
      newCard.querySelector('.popup__text--address').textContent = ticket.offer.address;
      newCard.querySelector('.popup__text--price').textContent = ticket.offer.price + ' ₽/ночь';
      newCard.querySelector('.popup__type').textContent = getOfferType(offerTypes[i]);
      newCard.querySelector('.popup__text--capacity').textContent = ticket.offer.rooms + ' комнаты для ' + ticket.offer.guests + ' гостей';
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ticket.offer.checkin + ', выезд до ' + ticket.offer.checkout;
      newCard.querySelector('.popup__features').textContent = ticket.offer.features;
      newCard.querySelector('.popup__description').textContent = ticket.offer.description;
      newCard.querySelector('.popup__photos').src = ticket.offer.photos;
      newCard.querySelector('.popup__avatar').src = ticket.offer.avatar;
      // console.log(225, newCard);
      fragment.appendChild(newCard);

    }
    mapContainer.appendChild(fragment);
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

  function removePins() {
    while (mapPins.firstChild) {
      mapPins.removeChild(mapPins.firstChild);
    }
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
    enableMapFilters: enableMapFilters,
    removePins: removePins,
    renderCards: renderCards
  };

})();
