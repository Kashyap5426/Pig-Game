'use strict';
// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let score = [0, 0]         // Array to store each player highscore 
let currentScore = 0;       // Declaring a current score to store the current score value.
let activePlayer = 0;       // Declaring a active player to check which player is rolling the dice.
let playing = true;         // To check if the game is still on i.e. if no player has won

// Displaying Initial Values
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');


// Function to switch player
const switchPlayer = function () {
    currentScore = 0;
    // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')       // Removing active player on getting 1 on dice
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // document.querySelector(`.player--${activePlayer}`).classList.add('player--active')          // Making the other player active 
    // Using toggle property of classList Method to switch active player.
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
// Roll dice functionality 

btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating random number rolled on dice
        const dice = Math.trunc((Math.random() * 6) + 1);   // Storing random generated numbers inside the dice function

        // 2. Displaying dice
        diceEl.classList.remove('hidden');              // Removing the hidden class from the dice section to show dice image on the screen
        diceEl.src = `images/dice-${dice}.png`;             // Showing the relevant image related to the number generated on the dice

        // 3. Check if dice is rolled for 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        if (score[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', function () {
    score=[0,0];
    currentScore=0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    playing=true;
    activePlayer = 0;
})