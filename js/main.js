'use strict';

(function () {
  window.form.deactivatePage();
  window.form.mainPin.addEventListener('mousedown', window.move.onMouseDown);

  window.form.roomNumber.addEventListener('change', window.form.onRoomsAndGuestsChange);
  window.form.capacity.addEventListener('change', window.form.onRoomsAndGuestsChange);
  window.form.type.addEventListener('change', window.form.onPriceAndTypesChange);
  window.form.timeIn.addEventListener('change', window.form.onTimeInChange);
  window.form.timeOut.addEventListener('change', window.form.onTimeOutChange);

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
