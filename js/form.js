'use strict';

window.form = (function () {
  var form = document.querySelector('.notice');

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
    } else if (type.value === 'bungalo') {
      price.min = 0;
    } else if (type.value === 'house') {
      price.min = 5000;
    } else if (type.value === 'palace') {
      price.min = 10000;
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
