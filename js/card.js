'use strict';

window.card = (function () {
  var previousCard = document.querySelector('.map__card');
  var mapContainer = document.querySelector('.map');

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

  function removeCard() {
    if (previousCard) {
      previousCard.remove();
    }
    previousCard = null;
  }

  function closeCardOnEcsHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      var closePopup = document.querySelector('.popup__close');
      closePopup.removeEventListener('click', closeCardOnClickHandler);
      removeCard();
    }
  }

  function closeCardOnClickHandler(evt) {
    evt.preventDefault();
    removeCard();
    window.removeEventListener('keydown', closeCardOnEcsHandler);
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

    if (ticket.offer.checkin && ticket.offer.checkout) {
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

    if (ticket.offer.description) {
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

    if (ticket.author.avatar) {
      newCard.querySelector('.popup__avatar').src = ticket.author.avatar;
    } else {
      newCard.querySelector('.popup__avatar').style.display = 'none';
    }

    var closePopup = newCard.querySelector('.popup__close');
    closePopup.addEventListener('click', closeCardOnClickHandler, {once: true});
    window.addEventListener('keydown', closeCardOnEcsHandler, {once: true});
    previousCard = newCard;
    mapContainer.appendChild(newCard);
  }

  return {
    removeCard: removeCard,
    renderCard: renderCard
  };
})();
