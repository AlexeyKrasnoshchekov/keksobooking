'use strict';

window.request = (function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  function create(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        var data = xhr.response.
        filter(function (it) {
          return it.offer !== undefined;
        });
        onSuccess(data);

      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  function get(onSuccess, onError) {
    var xhr = create(onSuccess, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  }

  function post(onSuccess, onError, data) {
    var xhr = create(onSuccess, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  }

  return {
    get: get,
    post: post
  };

})();
