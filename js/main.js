'use strict';


// utils **********

function randomInteger(min, max) {
let rand = min - 0.5 + Math.random() * (max - min + 1);
return Math.round(rand);
}

// ******************

// Генерирование данных ************************
var COMMENT_MESSAGES = [
`В целом всё неплохо. Но не всё`,
`Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально`,
`Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`
];

var AUTHOR_NAMES = [
  'Захар',
  'Ирина',
  'Кирилл',
  'Олежка',
  'Марина',
  'Андрей',
  'Юра',
  'Би 2',
  'Леонид Агуин',
  'Путин вв',
  'Юзер',
  'Павел',
]

var createComment = function () {
return {
avatar: `img/avatar-` + randomInteger(1, 6) + `.svg`,
message: COMMENT_MESSAGES[randomInteger(0, 5)],
name: `Артем`
};
};
var createRandomPhoto = function () {
return {
url: `photos/` + randomInteger(1, 25) + `.jpg`,
description: `Описание`,
likes: randomInteger(15, 200),
comments: Array(randomInteger(1, 3)).fill(null).map(createComment)
};
};
var photos = Array(25).fill(null).map(createRandomPhoto);
// ****************************


// Отрисовка фоток ******************
var pictureTemplate = document.querySelector(`#picture`).content;
var picturesContainer = document.querySelector(`.pictures`);
var fragment = document.createDocumentFragment();

photos.forEach(function (photo) {
let pictureElement = pictureTemplate.cloneNode(true);
let pictureImageElement = pictureElement.querySelector(`.picture__img`);
let pictureCommentsElement = pictureElement.querySelector(`.picture__comments`);
let picturesLikesElement = pictureElement.querySelector(`.picture__likes`);
pictureImageElement.src = photo.url;
pictureCommentsElement.textContent = photo.comments.length;
picturesLikesElement.textContent = photo.likes;
fragment.appendChild(pictureElement);
});

picturesContainer.appendChild(fragment);
/*************************** */
//Отркывание фоток на весь эеран ***
var userDialog = document.querySelector(`.big-picture`);
var socialHeader = document.querySelector('.big-picture__social');
var firstPhoto = document.querySelector('.picture__img');
var socialComment = document.querySelector('.social__comment');
var bigPictureImg = document.querySelector('.big-picture__img').querySelector(`img`);
var socialCaption = socialHeader.querySelector('.social__caption');
var socialLikes = socialHeader.querySelector('.social__likes');
var socialText = socialComment.querySelector('.social__text');

socialCaption.textContent = AUTHOR_NAMES[randomInteger(0, 11)];
socialLikes.textContent = randomInteger(15, 200);
bigPictureImg.src = `photos/1.jpg`;
socialText.textContent = COMMENT_MESSAGES[randomInteger(0, 2)];

firstPhoto.addEventListener('click', function () {
  userDialog.classList.remove('hidden');
});


//******* */
//всплывание попапа/
let fileUpload = document.querySelector(`#upload-file`);
let uploadOverlay = document.querySelector(`.img-upload__overlay`);
let body = document.querySelector(`body`);
let uploadCancel = document.querySelector('.img-upload__cancel');
let effectLevel = document.querySelector('.effect-level__pin');
let uploadEffects = document.querySelector('.img-upload__effects');
let uploadPreview = document.querySelector('.img-upload__preview');
let textHashtags = uploadCancel.querySelector(`.text__hashtags`);
let effectsRadio = uploadOverlay.querySelectorAll(`.effects__radio`);
let scaleControlSmaller = uploadOverlay.querySelector(`.scale__control--smaller`);
let scaleControlBigger = uploadOverlay.querySelector(`.scale__control--bigger`);
let scaleControlValue = uploadOverlay.querySelector(`.scale__control--value`);
const MAX_SCALE = 100;


let closePopup = function () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  //******* */
//выбор фильтра/
effectsRadio.forEach((effect) => {
  effect.addEventListener(`change`, function () {
    onChangeEffect(effect);
  });
});

  scaleControlValue.value = MAX_SCALE + `%`;
  scaleControlSmaller.addEventListener(`click`, onScaleButtonSmallerPress);
  scaleControlBigger.addEventListener(`click`, onScaleButtonBiggerPress);
};

//******* */
//Закрытие окна через ESC/
let onPopupEscPress = function (evt) {
  if (evt.keyCode  === 27) {
    closePopup()}
};
//******* */
//Закрытие окна на кнопку крестик/
fileUpload.onchange = function (){
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closePopup);
  document.addEventListener(`keydown`, onPopupEscPress);
};
//******* */
//выбор фильтра/
var filterChangeHandler = function (evt) {
  if (evt.target.matches('input[type="radio"]')) {
    uploadPreview.textContent = evt.target.value;
  }
}
uploadEffects.addEventListener('change', filterChangeHandler);



//******* */
//проверка хештегов на валидность/
let errorHashtags = function () {
  let hastagArray = textHashtags.value.split(` `).sort();
  const re = /^#[\w]{1,19}$/;
  let errorsCount = 0;
  let tagLeft = ``;

  if (!textHashtags.value) {
    textHashtags.style.boxShadow = `none`;
    textHashtags.setCustomValidity(``);
  } else
  {
  if (hastagArray.length > 5) {
    // Выводим соответствующую ошибку
    textHashtags.setCustomValidity(`Может быть не более 5 хэштегов`);
    errorsCount += 1;
  }
  else {
    hastagArray.forEach((hashTag) => {
      // Переводим в нижний кейс, чтобы не играл роли регистр
      hashTag = hashTag.toLowerCase();
      // Если тег не соответствует регулярке
      if (!re.test(hashTag)) {
        // Выводим ошибку
        textHashtags.setCustomValidity(`Хештег должен соответсвовать критериям`);
        errorsCount += 1;
      // Иначе, если тег совпадает с предыдущим
      } else if (hashTag === tagLeft) {
        // Выводим соответствующую ошибку
        textHashtags.setCustomValidity(`У вас есть повторяющиеся хэштеги`);
        errorsCount += 1;
        tagLeft = hashTag;
      } else {
        // Если ошибок нет, отменяем выделение поля красным
        textHashtags.style.boxShadow = `none`;
        tagLeft = hashTag;
      }
    });
  }
  if (errorsCount) {
    // Если да, подсвечиваем поле красным
    textHashtags.style.boxShadow = `0 0 15px red`;
  } else {
    // Иначе, убираем подсветку и сообщение
    textHashtags.style.boxShadow = `none`;
    textHashtags.setCustomValidity(``);
  }
  textHashtags.reportValidity();
}
return errorsCount;
};



