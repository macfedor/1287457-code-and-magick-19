'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var dialogDefaultX;
  var dialogDefaultY;
  var dialog = document.querySelector('.setup');
  var dialogOpenBtn = document.querySelector('.setup-open');
  var dialogOpenIcon = document.querySelector('.setup-open-icon');
  var dialogCloseBtn = dialog.querySelector('.setup-close');
  var dialogHandle = dialog.querySelector('.upload');
  var currentCoords;

  var openDialog = function () {
    dialog.classList.remove('hidden');
    if (!dialogDefaultX) {
      dialogDefaultX = dialog.offsetLeft;
      dialogDefaultY = dialog.offsetTop;
    }
    document.addEventListener('keydown', onDialogEscPress);
  };

  var closeDialog = function () {
    dialog.classList.add('hidden');
    dialog.style.top = dialogDefaultY + 'px';
    dialog.style.left = dialogDefaultX + 'px';
  };

  var onDialogEscPress = function (evt) {
    if (evt.key === ESCAPE_KEY && evt.target.className !== 'setup-user-name') {
      closeDialog();
      document.removeEventListener('keydown', onDialogEscPress);
    }
  };

  var onMouseDown = function (evt) {
    var dragged = false;

    currentCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseUp = function () {
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: currentCoords.x - moveEvt.clientX,
        y: currentCoords.y - moveEvt.clientY
      };

      currentCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
      dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  dialogCloseBtn.addEventListener('click', function () {
    closeDialog();
  });

  dialogCloseBtn.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closeDialog();
    }
  });

  dialogOpenBtn.addEventListener('click', function (evt) {
    openDialog(evt);
  });

  dialogOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openDialog(evt);
    }
  });

  dialogHandle.addEventListener('mousedown', onMouseDown);

})();
