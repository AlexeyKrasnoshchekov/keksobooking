'use strict';

window.form = (function () {
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');
  var mainPin = document.querySelector('.map__pin--main');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var price = form.querySelector('#price');
  var type = form.querySelector('#type');

  function onRoomsAndGuestsChange(evt) {
    evt.preventDefault();

    var roomsValue = Number(roomNumber.value);
    var capacityValue = Number(capacity.value);

    if (capacityValue === 0 && roomsValue !== 100) {
      capacity.setCustomValidity('ошибка в Количестве мест');
      capacity.reportValidity();
    } else if (capacityValue !== 0 && roomsValue === 100) {
      capacity.setCustomValidity('ошибка в Количестве мест');
      capacity.reportValidity();
    } else if (roomsValue < capacityValue) {
      capacity.setCustomValidity('ошибка в Количестве мест');
      capacity.reportValidity();
    } else {
      capacity.setCustomValidity('');

    }

  }

  function onPriceAndTypesChange() {
    if (type.value === 'flat') {
      price.min = MIN_FLAT_PRICE;
      price.placeholder = MIN_FLAT_PRICE;
    } else if (type.value === 'bungalo') {
      price.min = MIN_BUNGALO_PRICE;
      price.placeholder = MIN_BUNGALO_PRICE;
    } else if (type.value === 'house') {
      price.min = MIN_HOUSE_PRICE;
      price.placeholder = MIN_HOUSE_PRICE;
    } else if (type.value === 'palace') {
      price.min = MIN_PALACE_PRICE;
      price.placeholder = MIN_PALACE_PRICE;
    }

  }

  function onTimeInChange() {
    var inValue = timeIn.value;
    timeOut.value = inValue;
  }

  function onTimeOutChange() {
    var outValue = timeOut.value;
    timeIn.value = outValue;
  }

  function enableAdForm() {
    var fieldSets = form.querySelectorAll('fieldset');
    fieldSets.forEach(function (fieldSet) {
      fieldSet.removeAttribute('disabled');
    });
  }

  function updateCurrentOfferLocation(location) {
    var addressInput = document.querySelector('#address');
    addressInput.value = location.x + ', ' + location.y;
  }

  function disableAdForm() {
    var fieldSets = form.querySelectorAll('fieldset');
    fieldSets.forEach(function (fieldSet) {
      fieldSet.setAttribute('disabled', 'disabled');
    });
  }

  function deactivatePage() {
    window.map.removePins();
    window.card.removeCard();
    form.reset();
    mainPin.addEventListener('click', window.pin.activateMap, {once: true});
    window.pin.currentOfferLocation.y -= window.pin.MAIN_PIN_SIZE / 2 + window.pin.MAIN_PIN_POINTER_Y;
    window.form.updateCurrentOfferLocation(window.pin.currentOfferLocation);
    mainPin.style.top = window.pin.currentOfferLocation.y + 'px';
    mainPin.style.left = window.pin.currentOfferLocation.x + 'px';

    window.pin.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    window.map.disableMapFilters();
    disableAdForm();
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.request.post(function () {
      deactivatePage();
      window.popup.openSuccess();
    }, function () {
      window.popup.openError();
    }, new FormData(form)
    );
  });

  formReset.addEventListener('click', function () {
    deactivatePage();
  }, {once: true});

  return {
    form: form,
    timeIn: timeIn,
    timeOut: timeOut,
    type: type,
    roomNumber: roomNumber,
    capacity: capacity,
    mainPin: mainPin,
    enableAdForm: enableAdForm,
    disableAdForm: disableAdForm,
    updateCurrentOfferLocation: updateCurrentOfferLocation,
    onRoomsAndGuestsChange: onRoomsAndGuestsChange,
    onPriceAndTypesChange: onPriceAndTypesChange,
    onTimeInChange: onTimeInChange,
    onTimeOutChange: onTimeOutChange,
    deactivatePage: deactivatePage
  };
})();
