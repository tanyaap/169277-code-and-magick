'use strict';

(function () {
  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setupWizard = document.querySelector('.setup');

  var similarWizardsList = setupWizard.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;

  var wizardsSet = [
    {'name': '', 'coatColor': '', 'eyesColor': ''},
    {'name': '', 'coatColor': '', 'eyesColor': ''},
    {'name': '', 'coatColor': '', 'eyesColor': ''},
    {'name': '', 'coatColor': '', 'eyesColor': ''}
  ];

  for (var i = 0; i < wizardsSet.length; i++) {
    wizardsSet[i].name = window.util.getRandomElement(WIZARDS_NAMES) + ' ' + window.util.getRandomElement(WIZARDS_LAST_NAMES);
    wizardsSet[i].coatColor = window.util.getRandomElement(COAT_COLORS);
    wizardsSet[i].eyesColor = window.util.getRandomElement(EYES_COLORS);
  }

  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizardsSet.length; i++) {
    var wizardFromSet = wizardTemplate.cloneNode(true);
    wizardFromSet.querySelector('.setup-similar-label').textContent = wizardsSet[i].name;
    wizardFromSet.querySelector('.wizard-coat').style.fill = wizardsSet[i].coatColor;
    wizardFromSet.querySelector('.wizard-eyes').style.fill = wizardsSet[i].eyesColor;
    fragment.appendChild(wizardFromSet);
  }
  similarWizardsList.appendChild(fragment);

  setupWizard.querySelector('.setup-similar').classList.remove('hidden');
})();
