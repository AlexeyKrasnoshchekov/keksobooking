'use strict';

window.data = (function () {
  var X_MIN_COORDINATE = 0;
  var X_MAX_COORDINATE = 1200;
  var Y_MIN_COORDINATE = 130;
  var Y_MAX_COORDINATE = 630;
  var MAX_GUESTS = 5;
  var MAX_ROOMS = 4;
  var MAX_PRICE = 5000;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIME = ['12:00', '13:00', '14:00'];
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
        address: location.x + ', ' + location.y,
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

  return {
    X_MIN_COORDINATE: X_MIN_COORDINATE,
    X_MAX_COORDINATE: X_MAX_COORDINATE,
    Y_MIN_COORDINATE: Y_MIN_COORDINATE,
    Y_MAX_COORDINATE: Y_MAX_COORDINATE,

    getArrayOfRandomTickets: getArrayOfRandomTickets
  };

})();
