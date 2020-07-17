'use strict';

window.move = (function () {
  var X_MIN_COORDINATE = 0;
  var X_MAX_COORDINATE = 1200;
  var Y_MIN_COORDINATE = 130;
  var Y_MAX_COORDINATE = 630;
  var MAIN_PIN_SIZE = 60;
  var MAIN_PIN_POINTER_Y = 22;

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentPinCoordinates = {
        x: (mainPin.offsetLeft - shift.x),
        y: (mainPin.offsetTop - shift.y)
      };

      var currentOfferLocation = {
        x: currentPinCoordinates.x + MAIN_PIN_SIZE / 2,
        y: currentPinCoordinates.y + MAIN_PIN_SIZE + MAIN_PIN_POINTER_Y
      };

      if ((
        currentOfferLocation.x >= X_MIN_COORDINATE && currentOfferLocation.x <= X_MAX_COORDINATE
      ) && (
        currentOfferLocation.y >= Y_MIN_COORDINATE && currentOfferLocation.y <= Y_MAX_COORDINATE
      )) {
        mainPin.style.top = currentPinCoordinates.y + 'px';
        mainPin.style.left = currentPinCoordinates.x + 'px';

        window.form.updateCurrentOfferLocation(currentOfferLocation);
      }

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // var currentOfferLocation = {
      //   x: (mainPin.offsetLeft - shift.x),
      //   y: (mainPin.offsetTop - shift.y)
      // };

      // window.form.updateCurrentOfferLocation(currentOfferLocation);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  return {


  };
});

