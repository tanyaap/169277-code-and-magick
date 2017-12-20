'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var setupWizard = document.querySelector('.setup');
  var coatColor;
  var eyesColor;
  var lastTimeout;
  function debounce(func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  }

  function getRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updateWizards() {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    debounce(updateWizards);
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    debounce(updateWizards);
  };

  var wizards = [];
  function successHandler(data) {
    wizards = data;
    updateWizards();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = '#dd1f1f';
    node.style.border = '2px solid #fff';
    node.style.fontWeight = 'bold';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '28px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend.load(successHandler, errorHandler);

  var form = setupWizard.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setupWizard.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  var shopItem = setupWizard.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsZone = setupWizard.querySelector('.setup-artifacts');

  shopItem.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    evt.target.style.outline = '2px dashed red';
    return false;
  });

  artifactsZone.addEventListener('dragleave', function (evt) {
    evt.target.style.outline = '';
    evt.preventDefault();
  });

  artifactsZone.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  artifactsZone.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsZone.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();
