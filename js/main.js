'use strict';

(function () {
  var timeInSelectElement = document.querySelector('#timein');
  var timeOutSelectElement = document.querySelector('#timeout');
  var roomSelectElement = document.querySelector('#room_number');
  var typeSelectElement = document.querySelector('#type');
  var capacitySelectElement = document.querySelector('#capacity');
  var mainPin = document.querySelector('.map__pin--main');

  window.form.deactivatePage();
  mainPin.addEventListener('mousedown', window.move.onMouseDown);

  roomSelectElement.addEventListener('change', window.form.onRoomsAndGuestsChange);
  capacitySelectElement.addEventListener('change', window.form.onRoomsAndGuestsChange);
  typeSelectElement.addEventListener('change', window.form.onPriceAndTypesChange);
  timeInSelectElement.addEventListener('change', window.form.onTimeInChange);
  timeOutSelectElement.addEventListener('change', window.form.onTimeOutChange);

  var checkboxesFilter = document.querySelectorAll('.map__checkbox');
  checkboxesFilter.forEach(function (checkboxFilter) {
    checkboxFilter.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        checkboxFilter.checked = !checkboxFilter.checked;
        var event = new Event('change', {bubbles: true});
        checkboxFilter.dispatchEvent(event);
      }
    });
  });

  var checkboxesForm = document.querySelectorAll('.feature__checkbox');
  checkboxesForm.forEach(function (checkboxForm) {
    checkboxForm.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        checkboxForm.checked = !checkboxForm.checked;
        var event = new Event('change', {bubbles: true});
        checkboxForm.dispatchEvent(event);
      }
    });
  });
})();
