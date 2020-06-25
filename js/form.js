'use strict';

window.form = (function () {

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

  updateCurrentOfferLocation(window.pin.currentOfferLocation);
  window.map.disableMapFilters();
  disableAdForm();

  roomSelectElement.addEventListener('change', validateRoomsAndGuests);
  capacitySelectElement.addEventListener('change', validateRoomsAndGuests);

  return {
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
