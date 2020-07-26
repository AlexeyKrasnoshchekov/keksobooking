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
    var popupTitle = newCard.querySelector('.popup__title');
    var popupAddress = newCard.querySelector('.popup__text--address');
    var popupPrice = newCard.querySelector('.popup__text--price');
    var popupType = newCard.querySelector('.popup__type');
    var popupCapacity = newCard.querySelector('.popup__text--capacity');
    var popupTime = newCard.querySelector('.popup__text--time');
    var popupDiscription = newCard.querySelector('.popup__description');

    if (ticket.offer.title) {
      popupTitle.textContent = ticket.offer.title;
    } else {
      popupTitle.style.display = 'none';
    }

    if (ticket.offer.address) {
      popupAddress.textContent = ticket.offer.address;
    } else {
      popupAddress.style.display = 'none';
    }

    if (ticket.offer.price) {
      popupPrice.textContent = ticket.offer.price + '₽/ночь';
    } else {
      popupPrice.style.display = 'none';
    }

    if (ticket.offer.type) {
      popupType.textContent = getOfferType(ticket.offer.type);
    } else {
      popupType.style.display = 'none';
    }

    if (ticket.offer.rooms && ticket.offer.guests) {
      popupCapacity.textContent = ticket.offer.rooms + ' комнаты для ' + ticket.offer.guests + ' гостей';
    } else {
      popupCapacity.style.display = 'none';
    }

    if (ticket.offer.checkin && ticket.offer.checkout) {
      popupTime.textContent = 'Заезд после ' + ticket.offer.checkin + ', выезд до ' + ticket.offer.checkout;
    } else {
      popupTime.style.display = 'none';
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
      popupDiscription.textContent = ticket.offer.description;
    } else {
      popupDiscription.style.display = 'none';
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

