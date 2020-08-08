/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, activePlayer, roundScore, dice, gamePlaying;
init();
var rollDice = document.querySelector(".btn-roll");
rollDice.addEventListener(
    "click",
    (rollDiceHandler = (e) => {
        if (gamePlaying) {
            e.preventDefault;
            dice = Math.floor(Math.random() * 6) + 1;
            // document.querySelector("#current-" + activePlayer).textContent = dice;
            document.querySelector(".dice").style.display = 'block';
            document.querySelector(".dice").setAttribute("src", "dice-" + dice + ".png");

            //updata the score if the rolled number not a 1
            if (dice !== 1) {
                //add score 
                roundScore += dice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            } else {
                //next player
                nextPlayer();
            }
        }
    })
);

var hold = document.querySelector(".btn-hold");
hold.addEventListener('click', function () {
    if (gamePlaying) {
        //add score to global
        scores[activePlayer] += roundScore;
        //add to UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check winner
        var final=document.querySelector('.final-score').value;
        if (scores[activePlayer] >= final) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector(".dice").style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();   
        }
    }
})

document.querySelector(".btn-new").addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = 'none';
}
function init() {
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

