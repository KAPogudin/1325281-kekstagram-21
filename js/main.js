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
  'Кирилл'
]


var ADRES = [
  'photos/2.jpg',
  'photos/25.jpg'
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
// **********************
var ferstPhoto = document.querySelector('.picture__img');
var  userDialog = document.querySelector(`.big-picture`);
ferstPhoto.addEventListener('click', function () {
  userDialog.classList.remove('hidden');
});
var bigPicture = document.querySelector('.big-picture__img').content;
var socialHeader = document.querySelector('.big-picture__social').content;
var fragment = document.createDocumentFragment();

photos.forEach(function (photoBig){
  let pictureElBig = socialHeader.cloneNode(true);
  let socialCaption = pictureElBig.querySelector('.social__caption');
  let socialLikes = pictureElBig.querySelector('.social__likes');
  socialCaption.textContent= photoBig.COMMENT_MESSAGES[0];
  socialLikes.textContent = photoBig.likes;
  fragment.appendChild(pictureElBig);
});

userDialog.appendChild(fragment);

var showBigPhoto = function () {

let bigPictureImg = userDialog.querySelector(`.big-picture__img`).querySelector(`img`);
bigPictureImg.src = createRandomPhoto[0].url;

let bigPictureLikesCount = userDialog.querySelector(`.likes-count`);
bigPictureLikesCount.textContent = createRandomPhoto[0].likes;

let bigPictureCommentsCount = userDialog.querySelector(`.comments-count`);
bigPictureCommentsCount.textContent = createRandomPhoto[0].comments.length;

let bigPictureDescription = userDialog.querySelector(`.social__caption`);
bigPictureDescription.textContent = createRandomPhoto[0].description;

let socialCommentCount = userDialog.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);

let commentLoader = userDialog.querySelector(`.comments-loader`);
commentLoader.classList.add(`hidden`);
};



