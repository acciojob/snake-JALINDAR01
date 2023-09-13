// Constants
const gridSize = 40; // Number of grid cells (40x40 in your case)
const cellSize = 10; // Size of each cell in pixels
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');

// Snake variables
let snake = [{ x: 20, y: 1 }]; // Initial snake position
let direction = 'right'; // Initial direction
let food = generateFood(); // Initial food position
let score = 0;

// Game loop
const gameLoop = setInterval(moveSnake, 100);

// Handle keyboard input to change snake direction
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// Move the snake
function moveSnake() {
  // Update snake position based on direction
  let newHead = Object.assign({}, snake[0]); // Create a new object to avoid modifying the original
  switch (direction) {
    case 'up':
      newHead.y--;
      break;
    case 'down':
      newHead.y++;
      break;
    case 'left':
      newHead.x--;
      break;
    case 'right':
      newHead.x++;
      break;
  }

  // Check for collision with walls or itself
  if (
    newHead.x < 0 ||
    newHead.x >= gridSize ||
    newHead.y < 0 ||
    newHead.y >= gridSize ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    // Game over
    clearInterval(gameLoop);
    alert('Game Over! Your score: ' + score);
    return;
  }

  // Check for collision with food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Increase score, generate new food, and grow snake
    score++;
    scoreElement.textContent = score;
    food = generateFood();
    snake.unshift(newHead); // Add new head to the snake (growing)
  } else {
    // Move the snake by adding a new head and removing the tail
    snake.unshift(newHead);
    snake.pop();
  }

  // Update the grid to reflect the new snake position
  updateGrid();
}

// Generate random food position
function generateFood() {
  const x = Math.floor(Math.random() * gridSize);
  const y = Math.floor(Math.random() * gridSize);
  return { x, y };
}

// Update the grid to display the snake and food
function updateGrid() {
  // Clear the grid
  gameContainer.innerHTML = '';

  // Add food to the grid
  const foodElement = document.createElement('div');
  foodElement.className = 'food';
  foodElement.style.left = food.x * cellSize + 'px';
  foodElement.style.top = food.y * cellSize + 'px';
  gameContainer.appendChild(foodElement);

  // Add snake segments to the grid
  snake.forEach((segment, index) => {
    const segmentElement = document.createElement('div');
    segmentElement.className = 'snakeBodyPixel';
    segmentElement.style.left = segment.x * cellSize + 'px';
    segmentElement.style.top = segment.y * cellSize + 'px';
    gameContainer.appendChild(segmentElement);
  });
}

// Initialize the game
updateGrid();
