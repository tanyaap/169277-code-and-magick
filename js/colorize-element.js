'use strict';

(function () {

  window.colorize = function (element, color, callback) {
    element.addEventListener('click', function () {
      if (typeof callback === 'function') {
        callback(element, color);
      }
    });
  };
})();
