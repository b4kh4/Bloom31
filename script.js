const map = document.getElementById("map");
var playerPosition = [0, 0, 0];
const keysPressed = {};
const speed = 2;

// Разрешённые клавиши
const allowedKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

// Слушаем нажатия
document.addEventListener('keydown', (event) => {
    if (allowedKeys.includes(event.code)) {
        keysPressed[event.code] = true;
        event.preventDefault(); // чтобы не прокручивалась страница
    }
});
document.addEventListener('keyup', (event) => {
    if (allowedKeys.includes(event.code)) {
        keysPressed[event.code] = false;
        event.preventDefault();
    }
});

// Функции движения
function moveLeft() {
    playerPosition[0] -= speed;
}
function moveRight() {
    playerPosition[0] += speed;
}
function moveUp() {
    playerPosition[1] -= speed;
}
function moveDown() {
    playerPosition[1] += speed;
}

// Обновление игры
function updateGame() {
    if (keysPressed['KeyA']) moveLeft();
    if (keysPressed['KeyD']) moveRight();
    if (keysPressed['KeyW']) moveUp();
    if (keysPressed['KeyS']) moveDown();

    map.style.marginLeft = `${playerPosition[0]}px`;
    map.style.marginTop = `${playerPosition[1]}px`;
}

// --- Для будущего: управление с телефона ---

const startBtn = document.getElementById("start");
const menu = document.getElementById("menu");
startBtn.addEventListener("click", function () {
    openFullscreen();
    menu.style.display = "none";
});

// Для полноэкранного и альбомного режима
function openFullscreen() {
    const elem = document.documentElement; // вся страница

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

// Проверка ориентации
function checkOrientation() {
  const warning = document.getElementById("orientation-warning");
  if (window.innerWidth > window.innerHeight) {
    warning.style.display = "none"; // альбом — убираем сообщение
    // тут можно запускать игру, если ещё не запущена
  } else {
    warning.style.display = "flex"; // портрет — показываем сообщение
    // тут можно ставить игру на паузу или не запускать
  }
}

// Игровой цикл
function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
    checkOrientation();
}
gameLoop();