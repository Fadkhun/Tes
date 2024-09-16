const character = document.getElementById('character');
const gameArea = document.querySelector('.game-area');
const speed = 5; // Kecepatan karakter, sesuaikan jika perlu

let x = gameArea.clientWidth / 2 - character.clientWidth / 2;
let y = gameArea.clientHeight / 2 - character.clientHeight / 2;

function updateCharacterDirection(direction) {
    character.src = `p1${direction}.png`;
}

function moveCharacter(dx, dy) {
    x += dx;
    y += dy;
    
    // Periksa dan sesuaikan jika karakter keluar dari batas area
    if (x < 0) {
        x = gameArea.clientWidth - character.clientWidth;
        loadNewBackground('left');
    } else if (x > gameArea.clientWidth - character.clientWidth) {
        x = 0;
        loadNewBackground('right');
    }
    
    if (y < 0) {
        y = gameArea.clientHeight - character.clientHeight;
        loadNewBackground('top');
    } else if (y > gameArea.clientHeight - character.clientHeight) {
        y = 0;
        loadNewBackground('bottom');
    }

    character.style.left = `${x}px`;
    character.style.top = `${y}px`;
}

function loadNewBackground(direction) {
    const backgrounds = {
        left: 'background_kiri.png',
        right: 'background_kanan.png',
        top: 'background_atas.png',
        bottom: 'background_bawah.png'
    };
    gameArea.style.backgroundImage = `url(${backgrounds[direction]})`;
}

// Kontrol tombol
document.querySelector('.controls').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        switch (event.target.id) {
            case 'left':
                updateCharacterDirection('kiri');
                moveCharacter(-speed, 0);
                break;
            case 'up':
                updateCharacterDirection('atas');
                moveCharacter(0, -speed);
                break;
            case 'down':
                updateCharacterDirection('bawah');
                moveCharacter(0, speed);
                break;
            case 'right':
                updateCharacterDirection('kanan');
                moveCharacter(speed, 0);
                break;
        }
    }
});

// Atur ukuran karakter ke tengah saat memuat
window.onload = () => {
    setCharacterToCenter();
    character.src = 'p1bawah.png'; // Set gambar awal karakter
};

function setCharacterToCenter() {
    x = (gameArea.clientWidth / 2) - (character.clientWidth / 2);
    y = (gameArea.clientHeight / 2) - (character.clientHeight / 2);
    character.style.left = `${x}px`;
    character.style.top = `${y}px`;
}
