'use strict';

(function () {
  var MAIN_PIN_X = (window.data.X_MAX_COORDINATE - window.data.X_MIN_COORDINATE) / 2;
  var MAIN_PIN_Y = (window.data.Y_MAX_COORDINATE - window.data.Y_MIN_COORDINATE) / 2;
  var MAIN_PIN_SIZE = 200;

  var currentOfferLocation = {
    x: MAIN_PIN_X + MAIN_PIN_SIZE / 2,
    y: MAIN_PIN_Y + MAIN_PIN_SIZE / 2
  };

  function disableAdForm() {
    var adForm = document.querySelector('.ad-form');
    var fieldSets = adForm.querySelectorAll('fieldset');
    fieldSets.forEach(function (fieldSet) {
      fieldSet.setAttribute('disabled', 'disabled');
    });
  }

  function updateCurrentOfferLocation(location) {
    var addressInput = document.querySelector('#address');
    addressInput.value = location.x + ', ' + location.y;
  }

  var roomSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');

  function validateRoomsAndGuests(evt) {
    evt.preventDefault();
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

  updateCurrentOfferLocation(currentOfferLocation);
  window.map.disableMapFilters();
  disableAdForm();

  roomSelectElement.addEventListener('change', validateRoomsAndGuests);
  capacitySelectElement.addEventListener('change', validateRoomsAndGuests);

  window.form = {
    enableAdForm: function () {
      var adForm = document.querySelector('.ad-form');
      var fieldSets = adForm.querySelectorAll('fieldset');
      fieldSets.forEach(function (fieldSet) {
        fieldSet.removeAttribute('disabled');
      });
    },

    updateCurrentOfferLocation: function (location) {
      var addressInput = document.querySelector('#address');
      addressInput.value = location.x + ', ' + location.y;
    }
  };
})();
