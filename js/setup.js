'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupWizard = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWizard.querySelector('.setup-close');
var userName = setupWizard.querySelector('.setup-user-name');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && !userNameFocus) {
    closePopup();
  }
}

var userNameFocus = false;
userName.addEventListener('focus', function () {
  userNameFocus = true;
});
userName.addEventListener('blur', function () {
  userNameFocus = false;
});

function openPopup() {
  setupWizard.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  setupWizard.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

function onClickOpen() {
  openPopup();
}
setupOpen.addEventListener('click', onClickOpen);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

function onClickClose() {
  closePopup();
}
setupClose.addEventListener('click', onClickClose);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setupWizard.classList.add('hidden');
  }
});

var wizardCoatColors = setupWizard.querySelector('.wizard-coat');
var wizardEyesColors = setupWizard.querySelector('.wizard-eyes');
var fireballColors = setupWizard.querySelector('.setup-fireball-wrap');

function onClickCoat() {
  wizardCoatColors.style.fill = getRandomElement(COAT_COLORS);
}
wizardCoatColors.addEventListener('click', onClickCoat);

function onClickEyes() {
  wizardEyesColors.style.fill = getRandomElement(EYES_COLORS);
}
wizardEyesColors.addEventListener('click', onClickEyes);


function onClickFireball() {
  fireballColors.style.backgroundColor = getRandomElement(FIREBALLS);
}
fireballColors.addEventListener('click', onClickFireball);

var similarWizardsList = setupWizard.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;

var getRandomElement = function (array) {
  var arrayRandomItem = Math.floor(Math.random() * array.length);
  return array[arrayRandomItem];
};

var wizardsSet = [
  {'name': '', 'coatColor': '', 'eyesColor': ''},
  {'name': '', 'coatColor': '', 'eyesColor': ''},
  {'name': '', 'coatColor': '', 'eyesColor': ''},
  {'name': '', 'coatColor': '', 'eyesColor': ''}
];

for (var i = 0; i < wizardsSet.length; i++) {
  wizardsSet[i].name = getRandomElement(WIZARDS_NAMES) + ' ' + getRandomElement(WIZARDS_LAST_NAMES);
  wizardsSet[i].coatColor = getRandomElement(COAT_COLORS);
  wizardsSet[i].eyesColor = getRandomElement(EYES_COLORS);
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
