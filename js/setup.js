'use strict';

(function () {
  /*  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];*/

  var setupWizard = document.querySelector('.setup');

  var similarWizardsList = setupWizard.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;

  /*  var wizardsSet = [
    {'name': '', 'coatColor': '', 'eyesColor': ''},
    {'name': '', 'coatColor': '', 'eyesColor': ''},
    {'name': '', 'coatColor': '', 'eyesColor': ''},
    {'name': '', 'coatColor': '', 'eyesColor': ''}
  ];

  for (var i = 0; i < wizardsSet.length; i++) {
    wizardsSet[i].name = window.util.getRandomElement(WIZARDS_NAMES) + ' ' + window.util.getRandomElement(WIZARDS_LAST_NAMES);
    wizardsSet[i].coatColor = window.util.getRandomElement(COAT_COLORS);
    wizardsSet[i].eyesColor = window.util.getRandomElement(EYES_COLORS);
  }*/

  function renderWizard(wizardArr) {
    var wizardFromSet = wizardTemplate.cloneNode(true);
    wizardFromSet.querySelector('.setup-similar-label').textContent = wizardArr.name;
    wizardFromSet.querySelector('.wizard-coat').style.fill = wizardArr.coatColor;
    wizardFromSet.querySelector('.wizard-eyes').style.fill = wizardArr.eyesColor;
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
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #dd1f1f; border: 2px solid #fff; font-weight: bold';
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
