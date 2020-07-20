'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data'; 
  var TIMEOUT_IN_MS = 10000;

  window.upload = function (data, onSuccess) {
    console.log(222, data);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      alert('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
