'use strict';

window.load = (function () {

  var xhr = new XMLHttpRequest();
  var url = 'https://javascript.pages.academy/keksobooking/data';

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);
  };

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }

  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 1000;

  xhr.open('GET', url);
  xhr.send();

  return {
    onError: onError,
    onSuccess: onSuccess
  };

})();


