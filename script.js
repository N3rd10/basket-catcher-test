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

// Stats
var objectValue = 1;

// UI
// Create the main container
const container = document.createElement('div');
container.style.width = '300px';
container.style.margin = '20px auto'; // Center the container with some margin
container.style.position = 'relative'; // Position relative for z-index to work
container.style.zIndex = '10000'; // Ensure the container is above the canvas
container.style.backgroundColor = '#fff'; // Background color for visibility
container.style.border = '1px solid #ccc'; // Border for visibility
container.style.padding = '10px'; // Padding for spacing

// Create the tabs
const tabs = document.createElement('div');
tabs.style.display = 'flex';

// Create tab buttons
const tabNames = ['Tab 1', 'Tab 2', 'Tab 3'];
const tabContents = ['Content for Tab 1', 'Content for Tab 2', 'Content for Tab 3'];
const tabButtons = [];

tabNames.forEach((name, index) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.style.flex = '1';
    button.style.padding = '10px';
    button.style.border = '1px solid #ccc';
    button.style.backgroundColor = '#f1f1f1';
    button.style.cursor = 'pointer';
    button.dataset.tab = `tab${index + 1}`;
    
    // Add click event listener
    button.addEventListener('click', () => {
        // Hide all contents
        tabContentsDivs.forEach(div => div.style.display = 'none');
        // Remove active class from all buttons
        tabButtons.forEach(btn => {
            btn.style.backgroundColor = '#f1f1f1';
            btn.style.borderBottom = '1px solid #ccc';
        });
        // Show the clicked tab's content
        const activeTab = document.getElementById(button.dataset.tab);
        activeTab.style.display = 'block';
        // Set the clicked button as active
        button.style.backgroundColor = '#fff';
        button.style.borderBottom = 'none';
    });

    tabs.appendChild(button);
    tabButtons.push(button);
});

// Create the content area
const contentArea = document.createElement('div');
contentArea.style.border = '1px solid #ccc';
contentArea.style.padding = '10px';

// Create tab content divs
const tabContentsDivs = tabContents.map((content, index) => {
    const div = document.createElement('div');
    div.id = `tab${index + 1}`;
    div.textContent = content;
    div.style.display = index === 0 ? 'block' : 'none'; // Show the first tab by default
    contentArea.appendChild(div);
    return div;
});

// Append tabs and content area to the container
container.appendChild(tabs);
container.appendChild(contentArea);

// Append the container to the body
document.body.appendChild(container);

// Object value upgrade button
const objectValueUpgrade = document.createElement('button');
objectValueUpgrade.innerText = "Upgrade object worth";
objectValueUpgrade.style.position = 'absolute'; // objectValueUpgrade.style.left = '475px'; 
objectValueUpgrade.style.top = '100px';
document.body.appendChild(objectValueUpgrade);

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
            points += objectValue;
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

objectValueUpgrade.addEventListener('click', function() {
    objectValue += 1;
});
document.addEventListener('keydown', moveBasket);
setInterval(createFallingObject, 1000); // Create a new object every second

gameLoop();
