'use strict';

(function () {
  var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWizard = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWizard.querySelector('.setup-close');
  var userName = setupWizard.querySelector('.setup-user-name');
  var initCoords = {
    x: 0,
    y: 0
  };

  var userNameFocus = false;
  userName.addEventListener('focus', function () {
    userNameFocus = true;
  });
  userName.addEventListener('blur', function () {
    userNameFocus = false;
  });

  function onPopupEscPress(evt) {
    if (!userNameFocus) {
      window.util.isEscEvent(evt, closePopup);
    }
  }

  function openPopup() {
    setupWizard.classList.remove('hidden');
    initCoords.x = setupWizard.offsetLeft;
    initCoords.y = setupWizard.offsetTop;
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    setupWizard.style.left = initCoords.x + 'px';
    setupWizard.style.top = initCoords.y + 'px';
    setupWizard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onClickOpen() {
    openPopup();
  }
  setupOpen.addEventListener('click', onClickOpen);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  function onClickClose() {
    closePopup();
  }
  setupClose.addEventListener('click', onClickClose);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var fireballColors = setupWizard.querySelector('.setup-fireball-wrap');

  function changeBackground(element, color) {
    element.style.backgroundColor = window.util.getRandomElement(color);
  }

  window.colorize(fireballColors, FIREBALLS, changeBackground);

  var dialogHandler = setupWizard.querySelector('.setup-user-pic');
  dialogHandler.style.zIndex = 1;

  function onHandlerDrag(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setupWizard.style.top = (setupWizard.offsetTop - shift.y) + 'px';
      setupWizard.style.left = (setupWizard.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  dialogHandler.addEventListener('mousedown', onHandlerDrag);
})();
