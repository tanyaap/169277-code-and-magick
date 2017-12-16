'use strict';

(function () {
  var setupWizard = document.querySelector('.setup');
  var wizardCoatColors = setupWizard.querySelector('.wizard-coat');
  var wizardEyesColors = setupWizard.querySelector('.wizard-eyes');
  var fireballColors = setupWizard.querySelector('.setup-fireball-wrap');

  function onClickColorize(colorizeElement, colorizeBackgroundElement) {
    if (typeof colorizeElement === 'function') {
      colorizeElement();
    }
    if (typeof colorizeBackgroundElement === 'function') {
      colorizeBackgroundElement();
    }
  }
  wizardCoatColors.addEventListener('click', onClickColorize);
  wizardEyesColors.addEventListener('click', onClickColorize);
  fireballColors.addEventListener('click', onClickColorize);
})();
