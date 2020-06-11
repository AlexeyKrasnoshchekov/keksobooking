
//ПЕРЕМЕННЫЕ ШАБЛОНА
var noticeContainer = document.querySelector('.notice');
var notices = noticeContainer.children;
var newNoticeForm = document.querySelector('.ad-form');
//var newMessageInput = newMessageForm.querySelector('.chat-form-input');

var noticeTemplate = document.querySelector('#card').content;
var newNoticeTemplate = noticeTemplate.querySelector('.map__card');

//ПЕРЕМЕННЫЕ ФОРМЫ
var title = document.querySelector('#title');
var address = document.querySelector('#address');
var type = document.querySelector('#type');
var price = document.querySelector('#Price');
var timeIn = document.querySelector('#TimeIn');
var timeOut = document.querySelector('#TimeOut');
var roomNumber = document.querySelector('#roomNumber');
var capacity = document.querySelector('#capacity');

//ОБЪЕКТЫ
var author = {
  avatar: 'img/avatars/user{{' + randomInt + '}}.png'
};

var offer = {
  title: '',
  address: function getAddress(locationX, locationY) {
  	return "locationX, locationY";
  },
  type: 'palace', 'flat', 'house', 'bungalo',
  price: 0,
  rooms = 0,
  guests = 0,
  checkin = '12:00', '13:00', '14:00',
  checkout = '12:00', '13:00', '14:00',
  features = 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
  description = '',
  photos = 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
};

var location = {
  x: getRandomInt(, ),
  y: getRandomInt(130, 630)
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

newNoticeForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  offer.title 	= noticeTitle.value;
  offer.address = noticeAddress;
  offer.price = price.value;

 });

for (var i = 0; i < notices.length; i++) {

}