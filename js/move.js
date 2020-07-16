'use strict';

window.card = (function () {
  var mainPin = document.querySelector('.map__pin--main');
  var MAIN_PIN_POINTER_Y = 22;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY 
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentOfferLocation = {
        x: (mainPin.offsetLeft - shift.x),
        y: (mainPin.offsetTop - shift.y)
      };

      mainPin.style.top = currentOfferLocation.y + 'px';
      mainPin.style.left = currentOfferLocation.x + 'px';

      window.form.updateCurrentOfferLocation(currentOfferLocation);
    };

    function onMouseUp (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var currentOfferLocation = {
          x: (mainPin.offsetLeft - shift.x),
          y: (mainPin.offsetTop - shift.y)
        };
      }
      window.form.updateCurrentOfferLocation(currentOfferLocation);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  return {

  };
})();

