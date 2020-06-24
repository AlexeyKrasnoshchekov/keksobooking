'use strict';

function updateCurrentOfferLocation(location) {
    var addressInput = document.querySelector('#address');
    addressInput.value = location.x + ', ' + location.y;
  }

  function enableAdForm() {
    var adForm = document.querySelector('.ad-form');
    var fieldSets = adForm.querySelectorAll('fieldset');
    fieldSets.forEach(function (fieldSet) {
      fieldSet.removeAttribute('disabled');
    });
  }

  function disableAdForm() {
    var adForm = document.querySelector('.ad-form');
    var fieldSets = adForm.querySelectorAll('fieldset');
    fieldSets.forEach(function (fieldSet) {
      fieldSet.setAttribute('disabled', 'disabled');
    });
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
disableMapFilters();
disableAdForm();

roomSelectElement.addEventListener('change', validateRoomsAndGuests);
capacitySelectElement.addEventListener('change', validateRoomsAndGuests);
