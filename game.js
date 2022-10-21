const scoreArea = document.querySelector('.score');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let interval;
let score = 0;

canvas.width = 1200;
canvas.height = 600;

class SnakePart {
    constructor({position}) {
        this.size = 20;
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    move() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Food {
    constructor() {
        this.size = 20;
        this.position = {
            x: 100,
            y: 100
        };
        this.possiblePositionX = [
        0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680, 700, 720, 740, 760, 780, 800, 820, 840, 860, 880, 900, 920, 940, 960, 980, 1000, 1020, 1040, 1060, 1080, 1100, 1120, 1140, 1160, 1180];
        this.possiblePositionY = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580];
    }

    randomFoodPosition() {
        const x = Math.floor(Math.random() * this.possiblePositionX.length);
        const y = Math.floor(Math.random() * this.possiblePositionY.length);
        this.position.x = this.possiblePositionX[x];
        this.position.y = this.possiblePositionY[y];
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
}

const food = new Food();
const snakeBody = [new SnakePart({position: {x: 20, y: 20}}), new SnakePart({position: {x: 40, y: 40}})];

const clearBoard = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const eatFood = () => {
    if(snakeBody[0].position.x === food.position.x && snakeBody[0].position.y === food.position.y) {
        food.randomFoodPosition();
        snakeBody.push(new SnakePart({position: {x: snakeBody[1].position.x, y: snakeBody[1].position.y}}));
        score++;
        scoreArea.textContent = score;
    }
}

const gameOver = () => {
    if(snakeBody[0].position.x + 20 === 0 || snakeBody[0].position.x === canvas.width || snakeBody[0].position.y + 20 === 0 || snakeBody[0].position.y === canvas.height) {
        clearInterval(interval);
    }

    for(let i = 2; i < snakeBody.length; i++) {
        if(snakeBody[0].position.x === snakeBody[i].position.x && snakeBody[0].position.y === snakeBody[i].position.y) {
            clearInterval(interval);
        }
    }
}

function update() {
    clearBoard();
    food.draw();
    
    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i].position.x = snakeBody[i - 1].position.x;
        snakeBody[i].position.y = snakeBody[i - 1].position.y;
        snakeBody[i].draw();
    }
    
    snakeBody[0].move();

    eatFood();
    gameOver();
}   



window.addEventListener('keydown', (e) => {
    const key = e.key;

    if(key === 'w' || key === 'a' || key === 's' || key === 'd') {
        const button = document.getElementById(key);
        button.classList.add('active');
    }

    switch(key) {
        case 'a':
            if(snakeBody[0].velocity.x != 20) {
                snakeBody[0].velocity.x = -20;
                snakeBody[0].velocity.y = 0;
            }
            break;
        case 'w':
            if(snakeBody[0].velocity.y != 20) {
                snakeBody[0].velocity.x = 0;
                snakeBody[0].velocity.y = -20;
            }
            break;
        case 'd':
            if(snakeBody[0].velocity.x != -20) {
                snakeBody[0].velocity.x = 20;
                snakeBody[0].velocity.y = 0;
            }
            break;
        case 's':
            if(snakeBody[0].velocity.y != -20) {
                snakeBody[0].velocity.x = 0;
                snakeBody[0].velocity.y = 20;
            }
            break;
    }
});

window.addEventListener('keyup', (e) => {
    const key = e.key;

    if(key === 'w' || key === 'a' || key === 's' || key === 'd') {
        const button = document.getElementById(key);
        button.classList.remove('active');
    }
});

window.onload = () => {
    interval = setInterval(update, 100);
}