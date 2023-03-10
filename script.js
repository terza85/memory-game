'use strict'
import * as images from './img/*.jpg';

const cardContainer = document.querySelector('.cards-container');
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
let player1El = document.querySelector('.el1');
let player2El = document.querySelector('.el2');
let player1Score = 0;
let player2Score = 0;
const arr = [];
let arrFull = []
const btn = document.querySelectorAll('.btn');
// let numOfClickEl = document.querySelector('.click');
// let numOfClicks = 0;
let firstClicked;
let secondClicked;
let firstEl;
let secondEl;

// Izabran broj karata

btn.forEach(btn => btn.addEventListener('click', function (e) {
  const num = e.target.textContent
  btn.parentElement.style.display = 'none';
  createCards(num)
  for (let i = 0; i < num / 2; i++) {
    console.log(i + 1);
    arr.push(i + 1);
  }
  arrFull = [...arr, ...arr];
  shuffleArray(arrFull);
  setFrontImg();
}))


const createCards = function (numOfCards) {
  const card = `
    <div class="card-container">
    <div class="card">
      <div class="back">
      </div>
    </div>
  </div>
    `;

  for (let i = 0; i < numOfCards; i++) {
    cardContainer.insertAdjacentHTML('beforeend', card)
  }
}

const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const setFrontImg = function () {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, idx) => {
    const key = `cardfront${arrFull[idx]}`;
    const cardFront = `
    <div class="front" data-open = 0><img src="${images[key]}"></div>`
    card.insertAdjacentHTML('afterbegin', cardFront)
  })
}

cardContainer.addEventListener('click', function (e) {

  const cardClicked = e.target.closest('.card');

  if (!cardClicked) return;

  if (+cardClicked.firstElementChild.dataset.open == 0 && !firstClicked && !secondClicked) {
    cardClicked.style.transform = 'rotateY(180deg)';
    cardClicked.firstElementChild.dataset.open = 1;
    firstClicked = cardClicked.firstElementChild.firstElementChild.src;
    firstEl = cardClicked.parentElement;
  } else if (+cardClicked.firstElementChild.dataset.open == 0 && firstClicked && !secondClicked) {
    cardClicked.style.transform = 'rotateY(180deg)';
    cardClicked.firstElementChild.dataset.open = 1;
    secondClicked = cardClicked.firstElementChild.firstElementChild.src;
    secondEl = cardClicked.parentElement;
    if (firstClicked == secondClicked) {
      firstEl.style.transform = 'scale(0.0)';
      secondEl.style.transform = 'scale(0.0)';
      player1.classList.contains("active") ? player1Score++ : player2Score++;

      player1El.textContent = '';
      player1El.insertAdjacentText("afterbegin", +player1Score);
      player2El.textContent = '';
      player2El.insertAdjacentText("afterbegin", +player2Score);

      setTimeout(function () {
        firstEl.firstElementChild.remove();
        secondEl.firstElementChild.remove();
        firstClicked = undefined;
        secondClicked = undefined;
      }, 1000)


    } else {

      setTimeout(function () {
        player1.classList.toggle("active");
        player2.classList.toggle("active");
        firstEl.firstElementChild.style.transform = 'rotateY(0deg)';
        secondEl.firstElementChild.style.transform = 'rotateY(0deg)';
        firstEl.firstElementChild.firstElementChild.dataset.open = 0;
        secondEl.firstElementChild.firstElementChild.dataset.open = 0;
        firstClicked = undefined;
        secondClicked = undefined;
      }, 1000)
    }

  }
  else {
    cardClicked.style.transform = 'rotateY(0deg)';
    cardClicked.firstElementChild.dataset.open = 0;
    firstClicked = undefined;
  }

})
