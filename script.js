// Create a canvas element
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '9999'; // Make sure the canvas is on top

let basket = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 30,
    width: 50,
    height: 20,
    speed: 7
};

let fallingObjects = [];
let points = 0;

function createFallingObject() {
    const x = Math.random() * (canvas.width - 20);
    fallingObjects.push({ x: x, y: 0, width: 20, height: 20 });
}

function drawBasket() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawFallingObjects() {
    ctx.fillStyle = 'red';
    fallingObjects.forEach(obj => {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    });
}

function updateFallingObjects() {
    for (let i = 0; i < fallingObjects.length; i++) {
        fallingObjects[i].y += 3; // Falling speed
        if (fallingObjects[i].y > canvas.height) {
            fallingObjects.splice(i, 1);
            i--;
        } else if (isCaught(fallingObjects[i])) {
            fallingObjects.splice(i, 1);
            points++;
            i--;
        }
    }
}

function isCaught(object) {
    return object.x < basket.x + basket.width &&
           object.x + object.width > basket.x &&
           object.y < basket.y + basket.height &&
           object.y + object.height > basket.y;
}

function drawPoints() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Points: ' + points, 10, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawFallingObjects();
    drawPoints();
    updateFallingObjects();

    requestAnimationFrame(gameLoop);
}

function moveBasket(event) {
    if (event.key === 'ArrowLeft' && basket.x > 0) {
        basket.x -= 20;
    } else if (event.key === 'ArrowRight' && basket.x < canvas.width - basket.width) {
        basket.x += 20;
    }
}

document.addEventListener('keydown', moveBasket);
setInterval(createFallingObject, 1000); // Create a new object every second
gameLoop();
