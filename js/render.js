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

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarWizardsList.appendChild(fragment);
    setupWizard.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
