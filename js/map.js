'use strict';

window.map = (function () {

  var mapFilters = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var mapContainer = document.querySelector('.map');
  var previousCard = document.querySelector('.map__card');

  function addPinClickHandler(pin, ticket) {

    pin.addEventListener('click', function () {
      removeCard();
      window.map.renderCard(ticket);
    });
  }

  function removePins() {
    while (mapPins.firstChild) {
      mapPins.removeChild(mapPins.firstChild);
    }
  }

  function removeCard() {
    if (previousCard) {
      previousCard.remove();
    }
    previousCard = {};
  }

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

      addPinClickHandler(newPin, ticket);

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

  function renderCard(ticket) {
    var cardTemplate = document.querySelector('#card').content;
    var newCardTemplate = cardTemplate.querySelector('.map__card');


    var newCard = newCardTemplate.cloneNode(true);
    var features = newCard.querySelector('.popup__features');
    var featuresList = newCard.querySelectorAll('.popup__feature');

    if (ticket.offer.title) {
      newCard.querySelector('.popup__title').textContent = ticket.offer.title;

    } else {
      newCard.querySelector('.popup__title').style.display = 'none';
    }

    if (ticket.offer.address) {
      newCard.querySelector('.popup__text--address').textContent = ticket.offer.address;

    } else {
      newCard.querySelector('.popup__text--address').style.display = 'none';
    }

    if (ticket.offer.price) {
      newCard.querySelector('.popup__text--price').textContent = ticket.offer.price + '₽/ночь';

    } else {
      newCard.querySelector('.popup__text--price').style.display = 'none';
    }

    if (ticket.offer.type) {
      newCard.querySelector('.popup__type').textContent = getOfferType(ticket.offer.type);

    } else {
      newCard.querySelector('.popup__type').style.display = 'none';
    }

    if (ticket.offer.rooms && ticket.offer.guests) {
      newCard.querySelector('.popup__text--capacity').textContent = ticket.offer.rooms + ' комнаты для ' + ticket.offer.guests + ' гостей';

    } else {
      newCard.querySelector('.popup__text--capacity').style.display = 'none';
    }

    if (ticket.offer.checkin !== '' && ticket.offer.checkout !== '') {
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ticket.offer.checkin + ', выезд до ' + ticket.offer.checkout;

    } else {
      newCard.querySelector('.popup__text--time').style.display = 'none';
    }

    if (ticket.offer.features && ticket.offer.features.length > 0) {
      featuresList.forEach(function (feature) {
        feature.style.display = 'none';
      });
      ticket.offer.features.forEach(function (feature) {
        features.querySelector('.popup__feature--' + feature).style.display = 'inline-block';
      });

    } else {
      newCard.querySelector('.popup__features').style.display = 'none';
    }

    if (ticket.offer.description !== '') {
      newCard.querySelector('.popup__description').textContent = ticket.offer.description;

    } else {
      newCard.querySelector('.popup__description').style.display = 'none';
    }

    if (ticket.offer.photos && ticket.offer.photos.length > 0) {
      var photo = newCard.querySelector('.popup__photo');
      var fragment = document.createDocumentFragment();
      ticket.offer.photos.forEach(function (photoSrc) {
        var photoClone = photo.cloneNode();
        photoClone.src = photoSrc;
        fragment.appendChild(photoClone);
      });
      newCard.querySelector('.popup__photos').removeChild(photo);
      newCard.querySelector('.popup__photos').appendChild(fragment);

    } else {
      newCard.querySelector('.popup__photos').style.display = 'none';
    }

    if (ticket.author.avatar !== '') {
      newCard.querySelector('.popup__avatar').src = ticket.author.avatar;

    } else {
      newCard.querySelector('.popup__avatar').style.display = 'none';
    }
    previousCard = newCard;
    mapContainer.appendChild(newCard);
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
    removePins: removePins,
    renderCard: renderCard
  };

})();
