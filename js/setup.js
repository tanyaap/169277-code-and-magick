'use strict';

var setupWizard = document.querySelector('.setup');
setupWizard.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarWizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardsNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardsLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardToPlay = function () {
  for (var i = 0; i <= wizardsNames.length; i++) {
    var wizardNameChosen = wizardsNames[i];
    for (i = 0; i <= wizardsLastNames.length; i++) {
      var wizardLastNameChosen = wizardsLastNames[i];
    }
  }
  wizardToPlay = Math.random(wizardNameChosen) + Math.random(wizardLastNameChosen);
  return wizardToPlay;
};

var randomCoatColor = function () {
  for (var i = 0; i <= coatColor.length; i++) {
    var coatColorChosen = coatColor[i];
  }
  randomCoatColor = Math.random(coatColorChosen);
  return randomCoatColor;
};

var randomEyesColor = function () {
  for (var i = 0; i <= eyesColor.length; i++) {
    var eyesColorChosen = eyesColor[i];
  }
  randomEyesColor = Math.random(eyesColorChosen);
  return randomEyesColor;
};

var wizardsSet = [
  {
    name: 'wizardToPlay[0]',
    coatColor: 'coatColor[0]',
    eyesColor: 'eyesColor[0]'
  },
  {
    name: 'wizardToPlay[1]',
    coatColor: 'coatColor[1]',
    eyesColor: 'eyesColor[1]'
  },
  {
    name: 'wizardToPlay[2]',
    coatColor: 'coatColor[2]',
    eyesColor: 'eyesColor[2]'
  },
  {
    name: 'wizardToPlay[3]',
    coatColor: 'coatColor[3]',
    eyesColor: 'eyesColor[3]'
  }
];

for (var i = 0; i <= wizardsSet.length; i++) {
  var wizardFromSet = wizardTemplate.cloneNode(true);
  wizardFromSet.querySelector('.setup-similar-label').textContent = wizardsSet[i].name;
  wizardFromSet.querySelector('.wizardCoat').style.fill = wizardsSet[i].coatColor;
  wizardFromSet.querySelector('.wizardEyes').style.fill = wizardsSet[i].eyesColor;
  similarWizardsList.appendChild(wizardFromSet);
}
