'use strict';

//делаем слайдер на главной

var buttonsSLidesArray = document.querySelectorAll('.slider-button');
var slidesArray = document.querySelectorAll('.slide');

[].forEach.call(buttonsSLidesArray, function(el, i) {
   el.addEventListener('click', function(evt) {
     evt.preventDefault();
     slideChange(this.valueOf(), buttonsSLidesArray.length);
   }.bind(i));
 });


//модалка

var modalButton = document.querySelector('.write-us-button');
var popup = document.querySelector('.modal');
var modalClose = popup.querySelector('.modal-close');
var inputName = popup.querySelector('#user-name');
var inputEmail = popup.querySelector('#user-email');
var inputMessage =popup.querySelector('#user-message');
var modalForm = popup.querySelector('.modal-form');
var modalOverlay = document.querySelector('.modal-overlay');

var isStorage = true;
var storageName = '';
var storageEmail = '';

try {
  storageName = localStorage.getItem('login');
  storageEmail = localStorage.getItem('email');
} catch(err) {
  isStorage = false;
}

modalButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('display-none');
  popup.classList.add('modal-show');
  modalOverlay.classList.remove('display-none');
  if (storageName && storageEmail) {
    inputName.value = storageName;
    inputEmail.value = storageEmail;
    inputMessage.focus();
  } else if (storageEmail) {
    inputEmail.value = storageEmail;
    inputName.focus();
  } else if (storageName) {
    inputName.value = storageName;
    inputEmail.focus();
  } else {
    inputName.focus();
  }
});

modalClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('display-none');
  popup.classList.remove('modal-show');
  popup.classList.remove('modal-error');
  modalOverlay.classList.add('display-none');
});

modalForm.addEventListener('submit', function(evt) {
  inputName.classList.remove('modal-input-invalid');
  inputEmail.classList.remove('modal-input-invalid');
  inputMessage.classList.remove('modal-input-invalid');
  if (!inputName.value || !inputEmail.value || !inputMessage.value) {
    evt.preventDefault();
    popup.classList.remove('modal-error');
    void popup.offsetWidth;
    popup.classList.add('modal-error');
    if (!inputName.value) {
      inputName.classList.remove('modal-input-invalid');
      void inputName.offsetWidth;
      inputName.classList.add('modal-input-invalid');
    }
    if (!inputEmail.value) {
      inputEmail.classList.remove('modal-input-invalid');
      void inputEmail.offsetWidth;
      inputEmail.classList.add('modal-input-invalid');
    }
    if (!inputMessage.value) {
      inputMessage.classList.remove('modal-input-invalid');
      void inputMessage.offsetWidth;
      inputMessage.classList.add('modal-input-invalid');
    }
  } else {
    if (isStorage) {
      localStorage.setItem('login', inputName.value);
      localStorage.setItem('email', inputEmail.value);
    }
  }
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (!popup.classList.contains('display-none')) {
      popup.classList.add('display-none');
      popup.classList.remove('modal-error');
      modalOverlay.classList.add('display-none');
    }
  }
});

modalOverlay.addEventListener('click', function(evt) {
  if (!popup.classList.contains('display-none')) {
    evt.preventDefault();
    popup.classList.add('display-none');
    popup.classList.remove('modal-error');
    modalOverlay.classList.add('display-none');
  }
});

//функции
function slideChange(indexSlideOn, slideLength) {
  if (indexSlideOn >= slideLength) return;
  for (var i = 0; i < slideLength; i++) {
    if (i === indexSlideOn) {
      buttonsSLidesArray[i].classList.add('currnet-slider-button');
      slidesArray[i].classList.remove('display-none');
    } else {
      buttonsSLidesArray[i].classList.remove('currnet-slider-button');
      slidesArray[i].classList.add('display-none');
    }
  }
}


































