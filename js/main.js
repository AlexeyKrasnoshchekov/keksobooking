'use strict';

var MAX_TICKETS_LENGTH = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TITLE = [
  'Уютная квартира в Токио',
  'Элитная квартира в Лондоне',
  'Шикарная квартира в Бостоне',
  'Кваритира в Москве'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
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
  'Хорошее расположение, рядом с метро'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var currentOfferLocation = {
  x: getRandomTicket().location.x,
  y: getRandomTicket().location.y
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArray(array) {
  var randomArray = [];
  var length = getRandomInt(0, array.length);
  for (var i = 0; i < length; i++) {
    randomArray.push(array[i]);
  }
  return randomArray;
}

function getRandomTicket(index) {
  var locationX = getRandomInt(X_MIN_COORDINATE, X_MAX_COORDINATE + 1);
  var locationY = getRandomInt(Y_MIN_COORDINATE, Y_MAX_COORDINATE + 1);

  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: TITLE[getRandomInt(0, TITLE.length)],
      address: (location.x, location.y),
      price: getRandomInt(0, MAX_PRICE),
      type: TYPES[getRandomInt(0, TYPES.length)],
      rooms: getRandomInt(0, MAX_ROOMS),
      guests: getRandomInt(0, MAX_GUESTS),
      time: TIME[getRandomInt(0, TIME.length)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTION[getRandomInt(0, DESCRIPTION.length)],
      photos: getRandomArray(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
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

















function disableAdForm() {
  var adForm = document.querySelector('.ad-form');
  var fieldSets = adForm.querySelectorAll('fieldset');
  fieldSets.forEach(function (fieldSet) {
    fieldSet.setAttribute('disabled', 'disabled');
  });
}

function disableMapFilters() {
  var mapFilters = document.querySelector('.map__filters');
  var fieldSet = mapFilters.querySelector('fieldset');
  var selects = mapFilters.querySelectorAll('select');

  fieldSet.setAttribute('disabled', 'disabled');
  selects.forEach(function (select) {
    select.setAttribute('disabled', 'disabled');
  });
}

function enableMapFilters() {
  var mapFilters = document.querySelector('.map__filters');
  var fieldSet = mapFilters.querySelector('fieldset');
  var selects = mapFilters.querySelectorAll('select');

  fieldSet.removeAttribute('disabled');
  selects.forEach(function (select) {
    select.removeAttribute('disabled');
  });
}

function enableAdForm() {
  var adForm = document.querySelector('.ad-form');
  var fieldSets = adForm.querySelectorAll('fieldset');
  fieldSets.forEach(function (fieldSet) {
    fieldSet.removeAttribute('disabled');
  });
}

function updateCurrentOfferLocation(location) {
  var addressInput = document.querySelector('#address');
  addressInput.value = currentOfferLocation.x + ', ' + currentOfferLocation.y;
}

updateCurrentOfferLocation(location);
disableMapFilters();
disableAdForm();
var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();

    var randomTickets = getArrayOfRandomTickets(MAX_TICKETS_LENGTH);
    renderPins(randomTickets);

    enableMapFilters();
    enableAdForm();

    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  }
})

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    for (var select of selects) {
      select.removeAttribute('disabled', 'disabled');
    }
  
    for (var input of inputs) {
      input.removeAttribute('disabled', 'disabled');
    }
  
    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  }
});

var formSubmit = document.querySelector('.ad-form__submit');
var roomNumber = document.querySelector('#room_number');

roomNumber.addEventListener('change', function () {
  
  var roomValue = Number(roomNumber.value);
  var capacity = document.querySelector('#capacity');
  var capacityValue = Number(capacity.value);

  console.log('roomValue' + roomValue);

  if (roomValue === 1) {
    capacity.addEventListener('change', function () {
      if (capacityValue != 1) {
        alert('должен быть 1');
      } 
    });
  }

 if (roomValue === 2) {
    capacity.addEventListener('change', function () {
      if (capacityValue !== 1 && capacityValue !== 2) {
        alert('должно быть 1 или 2');
      } 
    });
  }

  if (roomValue === 3) {
    capacity.addEventListener('change', function (evt) {
      var capacityValue = Number(capacity.value);
      if (capacityValue !== 1 && capacityValue !== 2 && capacityValue !== 3) {
        alert('должно быть 1 или 2 или 3');
      } 
    });
  } 

 if (roomValue === 100) {
    capacity.addEventListener('change', function (evt) {
      var capacityValue = Number(capacity.value);
      if (capacityValue !== 0) {
        alert('должно быть не для гостей');
      } 
    });
  } 
});

/*
var roomValue = Number(roomNumber.value);
var capacity = document.querySelector('#capacity');
var capacityValue = Number(capacity.value);

var changeRoomNumberHandler = function (roomValue) {
  roomNumber.addEventListener('change', function () {
  
    console.log('roomValue' + roomValue);
  
    if (roomValue === 1) {
      capacity.addEventListener('change', function () {
        if (capacityValue != 1) {
          alert('должен быть 1');
        } 
      });
    }

  }); 
};

for (var i = 0; i < roomValue.length; i++) {
  changeRoomNumberHandler(roomValue[i]);
}
*/


