
//КОНСТАНТЫ
var MAX_TICKETS_LENGTH = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var X_MIN_COORDINATE = 0;
var X_MAX_COORDINATE = 1200;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
"http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var locationX = getRandomInt(X_MIN_COORDINATE, X_MAX_COORDINATE  + 1);
var locationY = getRandomInt(X_MIN_COORDINATE, X_MAX_COORDINATE  + 1);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function getRandomArray(array) {
  var randomArray = [];
  return randomArray.push(array[getRandomInt(0, array.length+1)]);
};

// создаем случайное объявление
function getRandomTicket(index) {
  // создаем случайное объявление
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + getRandomInt(1, 8)) + '.png',
    },
    offer: {
      title: '',
      address: "{{location.x}}, {{location.y}}",
      price: getRandomInt(0, 100),
      type: TYPES[getRandomInt(0, TYPES.length)],
      rooms: getRandomInt(0, 100),
      guests: getRandomInt(0, 100),
      checkin: CHECKIN[getRandomInt(0, CHECKIN.length)],
      checkout: CHECKOUT[getRandomInt(0, CHECKOUT.length)],
      features: getRandomArray(FEATURES),
      description: '',
      photos: getRandomArray(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  // допустим, тебе надо заполнить поле "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  // для этого в начале файла нужно сделать массив из значений ['palace', 'flat', 'house', 'bungalo']
  // и дальше type: TYPES[getRandomInt(0, TYPES.length)]

  // если надо сделать такое "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
  // для этого в начале файла нужно сделать массив из значений ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
  // создать функцию (пусть будет называться getRandomArray), которая принимает в качестве аргумента массив (например указанный выше)
  // что она делает: создает новый пустой массив, генерирует новую случайную длинну массива (но не больше массива, который мы ей передали)
  // заполняет созданный пустой массив на сгенеренную длину
};

// создание массива со сгенерерированными объявлениями
function getArrayOfRandomTickets(length) {
  // создаем массив
  var randomTickets = [];
  // заданное в length количество раз создаем случайное объявление и добавляем к массиву
  for (var i = 0; i < length; i++) {
    var randomTicket = getRandomTicket(i);
    randomTickets.push(randomTicket);
  }

  return randomTickets;
};

// 1. с помощью getArrayOfRandomTickets создаем массив из сгенеренных объявлений
var tickets = getArrayOfRandomTickets(MAX_TICKETS_LENGTH);


// теперь делаем: У блока .map уберите класс .map--faded.
var map = document.querySelector('.map');
var pins = map.children;
map.classList.remove(.map--faded);
// теперь На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
// Итоговую разметку метки .map__pin можно взять из шаблона #pin.
// нужно создать функцию (например renderPins) она будет создавать фрагмент, идти по всем элементам из сгенеренных объявлений
// далее на каждом шаге цикла нужно будет клонировать template, заполнять его данными и этот template добавлять в качестве child к фрагменту
// действия в каждом шаге цикла лучше вынести тоже в отдельную функцию, если получится
// добавить фрагмент в нужное место на странице

function renderPinCards(tickets) {

  var pinCardTemplate = document.querySelector('#card').content;
  var newPinCardTemplate = pinCardTemplate.querySelector('.map__card');

  // createFragment
  for (var i = 0; i < tickets.length; i++) {
    var newPinCard = newPinCardTemplate.cloneNode(true);
    var ticket = tickets[i];

    var avatar      = newPinCard.querySelector('.popup__avatar');
    var title       = newPinCard.querySelector('.popup__title');
    var address     = newPinCard.querySelector('.popup__text--address');
    var type        = newPinCard.querySelector('.popup__type');
    var price       = newPinCard.querySelector('.popup__text--price');
    var timeIn      = newPinCard.querySelector('.popup__text--time');
    var timeOut     = newPinCard.querySelector('.popup__text--time');
    var roomNumber  = newPinCard.querySelector('#roomNumber');
    var capacity    = newPinCard.querySelector('.popup__text--capacity');
    var fetaures    = newPinCard.querySelector('.popup__features');
    var description = newPinCard.querySelector('.popup__description');
    var photos      = newPinCard.querySelector('.popup__photos');

    //some.value = 'dfgdfgdf'
    avatar  = ticket.author.value;
    title   = ticket.title.value;
    address = ticket.address.value;
    type    = ticket.type.value;
    price   = ticket.price.value;
    timeIn  = ticket. timeIn.value;
    timeOut = ticket.timeOut.value;

    var fragment = new DocumentFragment();
    fragment.appendChild(newPinCard);
  }

  map.appendChild(fragment);

};

function renderPins(tickets) {

  var pinTemplate = document.querySelector('#pin').content;
  var newPinTemplate = pinTemplate.querySelector('.map__pin');

  // createFragment
  for (var i = 0; i < tickets.length; i++) {
    var newPin = newPinTemplate.cloneNode(true);

    some.value = 'dfgdfgdf'

    var fragment = new DocumentFragment();
    fragment.appendChild(newPin);
  }

  map.appendChild(fragment);

};

// вызываешь renderPins и отдаешь ей массив из сгенеренных объявлений

renderPins(tickets);
renderPinCards(tickets);

// profit
