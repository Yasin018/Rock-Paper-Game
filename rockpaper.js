let score = (JSON.parse(localStorage.getItem('score'))) ||
{
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();

/*if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}*/


function pickComputerMove() {
    const randomNumber=Math.random();

    let computerMove='';

    if (randomNumber >= 0 && randomNumber <1/3) {
        computerMove='rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove='paper';
    } else if (randomNumber >= 2/3 && randomNumber<1) {
        computerMove='scissors';
    }

    return computerMove;
}

let isautoPlaying = false;
let intervalId;

function autoPlay () {
    if (!isautoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isautoPlaying = true;

    } else {
        clearInterval(intervalId);
        isautoPlaying = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    })

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    })

document.querySelector('.js-scissor-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

document.body.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter') {
        autoPlay();
    }
})

document.body.addEventListener('keydown', (event)=> {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result='';
    
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
        result='You Lose';
    } else if (computerMove === 'paper') {
        result='You Win'
    } else if (computerMove === 'scissors') {
        result='Tie'
    }

} else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
        result='You Win';
    } else if (computerMove === 'paper') {
        result='Tie';
    } else if (computerMove === 'scissors') {
        result='You Lose';
    }

} else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
        result='Tie';
    } else if (computerMove === 'paper') {
        result='You Lose'
    } else if (computerMove === 'scissors') {
        result='You Win'
    }
}

    if (result === 'You Win') {
        score.wins +=1;
    } else if (result === 'You Lose') {
        score.losses +=1;
    } else if (result === 'Tie') {
        score.ties +=1
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
    <img class="css-rock" src="${playerMove}-emoji.png">
    <img class="css-rock" src="${computerMove}-emoji.png">
    Computer`
}

function updateScore() {
    document.querySelector('.js-score').innerHTML = 
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

const resetFunction = () => {
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScore();
}

document.querySelector('.js-resetScore')
    .addEventListener('click', resetFunction);

document.querySelector('.js-autoPlay-button')
    .addEventListener('click', autoPlay)
