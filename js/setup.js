'use strict';

(function () {
  var setupWizard = document.querySelector('.setup');

  var similarWizardsList = setupWizard.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;

  function renderWizard(wizardArr) {
    var wizardFromSet = wizardTemplate.cloneNode(true);
    wizardFromSet.querySelector('.setup-similar-label').textContent = wizardArr.name;
    wizardFromSet.querySelector('.wizard-coat').style.fill = wizardArr.colorCoat;
    wizardFromSet.querySelector('.wizard-eyes').style.fill = wizardArr.colorEyes;
    return wizardFromSet;
  }

  function successHandler(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarWizardsList.appendChild(fragment);
    setupWizard.querySelector('.setup-similar').classList.remove('hidden');
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = '#dd1f1f';
    node.style.border = '2px solid #fff';
    node.style.border = 'bold';
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
