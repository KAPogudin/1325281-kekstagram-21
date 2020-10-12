'use strict';

var userDialog = document.querySelector('.big-picture');
userDialog.classList.remove('hidden');

var bigListElement = userDialog.querySelector('.big-picture__img')
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function randomInteger(min, max) {

    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

var COMMENT_MESSAGES = [
  'В целом всё неплохо. Но не всё',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];

var fotos = [
{
  url: 'photos/' + randomInteger(1, 25) + '.jpg' ,
  description: 'Описание',
  likes: randomInteger(15, 200),
  comments: [
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    }
  ]
},
{
  url: 'photos/' + randomInteger(1, 25) + '.jpg' ,
  description: 'Описание',
  likes: randomInteger(15, 200),
  comments: [
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    }
  ]
},
{
  url: 'photos/' + randomInteger(1, 25) + '.jpg' ,
  description: 'Описание',
  likes: randomInteger(15, 200),
  comments: [
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    }
  ]
},
{
  url: 'photos/' + randomInteger(1, 25) + '.jpg' ,
  description: 'Описание',
  likes: randomInteger(15, 200),
  comments: [
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    },
    {
      avatar: 'img/avatar-' + randomInteger(1, 25) + '.svg',
      message: COMMENT_MESSAGES[randomInteger(0, 5)],
      name: "Артем"
    }
  ]
}
]




  var renderPicture = function (foto){
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__likes').textContent = foto.likes;
  pictureElement.querySelector('.picture__comments').textContent = foto.comments;
  pictureElement.querySelector('.picture__img').src = foto.url;
  pictureElement.querySelector('.picture__img').alt = foto.description;

  return pictureElement;


  }
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < fotos.length; i++){
    fragment.appendChild(renderPicture(fotos[i]));
  }
  bigListElement.appendChild(fragment);

