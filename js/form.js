'use strict';

window.form = (function () {
  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');

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

  function validatePriceAndTypes(evt) {
    evt.preventDefault();
    var price = form.querySelector('#price');
    var type = form.querySelector('#type');


    if (type.value === 'flat') {
      price.min = 1000;
      price.placeholder = '1000';
    } else if (type.value === 'bungalo') {
      price.min = 0;
      price.placeholder = '0';
    } else if (type.value === 'house') {
      price.min = 5000;
      price.placeholder = '5000';
    } else if (type.value === 'palace') {
      price.min = 10000;
      price.placeholder = '10000';
    }

  }

  function validateTimeIn(evt) {
    evt.preventDefault();

    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');

    var inValue = timeIn.value;
    timeOut.value = inValue;
  }

  function validateTimeOut(evt) {
    evt.preventDefault();

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

  function deactivatePage() {
    window.map.removePins();
    var mapOverlay = document.querySelector('.map__overlay');
    mapOverlay.style.opacity = '1';
    form.style.opacity = '0.3';
    window.map.disableMapFilters();
    disableAdForm();
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.request.post(new FormData(form), function (response) {
      console.log(111, 'ok');
      deactivatePage();
      form.reset();
      window.success.openSuccess();
    });
  });

  formReset.addEventListener('click', form.reset(), {once: true});

  return {
    enableAdForm: enableAdForm,
    disableAdForm: disableAdForm,
    updateCurrentOfferLocation: updateCurrentOfferLocation,
    validateRoomsAndGuests: validateRoomsAndGuests,
    validatePriceAndTypes: validatePriceAndTypes,
    validateTimeIn: validateTimeIn,
    validateTimeOut: validateTimeOut
  };
})();
