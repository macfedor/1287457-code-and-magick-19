'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };
  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhrLoad = new XMLHttpRequest();
    xhrLoad.responseType = 'json';
    xhrLoad.addEventListener('load', function () {
      if (xhrLoad.status === StatusCode.OK) {
        onLoad(xhrLoad.response);
      } else {
        onError('Статус ответа: ' + xhrLoad.status + ' ' + xhrLoad.statusText);
      }
    });
    xhrLoad.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhrLoad.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrLoad.timeout + 'мс');
    });

    xhrLoad.timeout = TIMEOUT_IN_MS;

    xhrLoad.open('GET', URL);
    xhrLoad.send();
  };
  var save = function (data, onLoad, onError) {
    var URL_SAVE = 'https://js.dump.academy/code-and-magick';

    var xhrSave = new XMLHttpRequest();
    xhrSave.responseType = 'json';

    xhrSave.addEventListener('load', function () {
      if (xhrSave.status === StatusCode.OK) {
        onLoad('Данные успешно отправлены');
      } else {
        onError('Статус ответа: ' + xhrSave.status + ' ' + xhrSave.statusText);
      }
    });
    xhrSave.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhrSave.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrSave.timeout + 'мс');
    });

    xhrSave.open('POST', URL_SAVE);
    xhrSave.send(data);

  };

  window.backend = {
    load: load,
    save: save
  };

})();
