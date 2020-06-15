'use strict';

// КОНСТАНТЫ
var MAX_TICKETS_LENGTH = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TITLE = [
  'Уютная квартира в Токио',
  'Элитная квартира в Лондоне',
  'Шикарная квартира в Бостоне',
  'Кваритира в Москве',
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var X_MIN_COORDINATE = 0;
var X_MAX_COORDINATE = 1200;
var Y_MIN_COORDINATE = 130;
var Y_MAX_COORDINATE = 630;
var MAX_GUESTS = 5;
var MAX_ROOMS = 4;
var MAX_PRICE = 5000;
var TIME = ['12:00', '13:00', '14:00'];
var DESCRIPTION = [
  'Просторное жилье',
  'Много комнат и мебели',
  'Просторно и светло',
  'Хорошее расположение, рядом с метро',
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getInt(max) {
  var num = 0;
  var i = 1;
  while (i <= max) {
    num += 1;
    i++;
  }
  return num;
}

function getRandomArray(array) {
  var randomArray = [];
  return randomArray.push(array[getInt(0, array.length + 1)]);
}

function getRandomTicket(index) {
  var locationX = getRandomInt(X_MIN_COORDINATE, X_MAX_COORDINATE + 1);
  var locationY = getRandomInt(Y_MIN_COORDINATE, Y_MAX_COORDINATE + 1);

  return {
    author: {
      avatar: 'img/avatars/user0' + getInt(8) + '.png',
    },
    offer: {
      title: TITLE[getRandomInt(0, TITLE.length)],
      address: '{{location.x}}, {{location.y}}',
      price: getRandomInt(0, MAX_PRICE),
      type: TYPES[getRandomInt(0, TYPES.length)],
      rooms: getRandomInt(0, MAX_ROOMS),
      guests: getRandomInt(0, MAX_GUESTS),
      time: TIME[getRandomInt(0, TIME.length)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTION[getRandomInt(0, DESCRIPTION.length)],
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
}

function getArrayOfRandomTickets(length) {
  var randomTickets = [];

  for (var i = 0; i < length; i++) {
    var randomTicket = getRandomTicket(i);
    randomTickets.push(randomTicket);
  }
  return randomTickets;
}

/*
function renderPinCards(tickets) {
  var pinCardTemplate = document.querySelector("#card").content;
  var newPinCardTemplate = pinCardTemplate.querySelector(".map__card");

  var fragment = new DocumentFragment();
  for (var i = 0; i < tickets.length; i++) {
    var newPinCard = newPinCardTemplate.cloneNode(true);
    var ticket = tickets[i];

    var avatar = newPinCard.querySelector(".popup__avatar");
    var title = newPinCard.querySelector(".popup__title");
    var address = newPinCard.querySelector(".popup__text--address");
    var type = newPinCard.querySelector(".popup__type");
    var price = newPinCard.querySelector(".popup__text--price");
    var timeIn = newPinCard.querySelector(".popup__text--time");
    var timeOut = newPinCard.querySelector(".popup__text--time");
    var roomNumber = newPinCard.querySelector("#roomNumber");
    var capacity = newPinCard.querySelector(".popup__text--capacity");
    var fetaures = newPinCard.querySelector(".popup__features");
    var description = newPinCard.querySelector(".popup__description");
    var photos = newPinCard.querySelector(".popup__photos");

    avatar = ticket.avatar.value;
    title = ticket.title.value;
    address = ticket.address.value;
    type = ticket.type.value;
    price = ticket.price.value;
    timeIn = ticket.timeIn.value;
    timeOut = ticket.timeOut.value;

    fragment.appendChild(newPinCard);
  }

  map.appendChild(fragment);
}
*/

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var randomTickets = getArrayOfRandomTickets(MAX_TICKETS_LENGTH);
renderPins(randomTickets);

// var pin = mapPins.children;

// renderPinCards(tickets);

// pin.setAttribute('style', 'position:abcolute;left:locationX;top:locationY');
// pin.setAttribute('src', 'author.avatar');
// pin.setAttribute('alt', 'offer.title');

// profit
