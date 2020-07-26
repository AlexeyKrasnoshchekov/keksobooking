'use strict';

window.form = (function () {
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');
  var mainPin = document.querySelector('.map__pin--main');

  function validateRoomsAndGuests(evt) {
    evt.preventDefault();
    var roomSelectElement = document.querySelector('#room_number');
    var capacitySelectElement = document.querySelector('#capacity');
    var roomsValue = Number(roomSelectElement.value);
    var capacityValue = Number(capacitySelectElement.value);

    if (capacityValue === 0 && roomsValue !== 100) {
      capacitySelectElement.setCustomValidity('ошибка в Количестве мест');
      capacitySelectElement.reportValidity();
    } else if (capacityValue !== 0 && roomsValue === 100) {
      capacitySelectElement.setCustomValidity('ошибка в Количестве мест');
      capacitySelectElement.reportValidity();
    } else if (roomsValue < capacityValue) {
      capacitySelectElement.setCustomValidity('ошибка в Количестве мест');
      capacitySelectElement.reportValidity();
    } else {
      capacitySelectElement.setCustomValidity('');

    }

  }

  function validatePriceAndTypes() {
    var price = form.querySelector('#price');
    var type = form.querySelector('#type');


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

  function validateTimeIn() {
    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');

    var inValue = timeIn.value;
    timeOut.value = inValue;
  }

  function validateTimeOut() {
    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');

    var outValue = timeOut.value;
    timeIn.value = outValue;
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
    addressInput.value = location.x + ', ' + location.y;
  }

  function disableAdForm() {
    var adForm = document.querySelector('.ad-form');
    var fieldSets = adForm.querySelectorAll('fieldset');
    fieldSets.forEach(function (fieldSet) {
      fieldSet.setAttribute('disabled', 'disabled');
    });
  }

  // function previewFile() {
  //   var preview = form.querySelector('img');
  //   var file = form.querySelector('input[type=file]').files[0];
  //   var reader = new FileReader();

  //   reader.onloadend = function () {
  //     preview.src = reader.result;
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     preview.src = '';

  //   }
  // }


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
    window.pin.adForm.classList.add('ad-form--disabled');

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
    enableAdForm: enableAdForm,
    disableAdForm: disableAdForm,
    updateCurrentOfferLocation: updateCurrentOfferLocation,
    validateRoomsAndGuests: validateRoomsAndGuests,
    validatePriceAndTypes: validatePriceAndTypes,
    validateTimeIn: validateTimeIn,
    validateTimeOut: validateTimeOut,
    deactivatePage: deactivatePage
  };
})();
