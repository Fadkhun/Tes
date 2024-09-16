let character = document.getElementById('character');
let gameArea = document.querySelector('.game-area');
let step = 10; // Kecepatan gerakan karakter

let currentBackground = 'background.png'; // Background saat ini
let kananCounter = 0; // Counter untuk background kanan

// Atur posisi awal karakter di tengah area persegi
function setCharacterToCenter() {
    let startX = (gameArea.clientWidth / 2) - (character.clientWidth / 2);
    let startY = (gameArea.clientHeight / 2) - (character.clientHeight / 2);
    character.style.left = startX + 'px';
    character.style.top = startY + 'px';
}

window.onload = setCharacterToCenter;

// Fungsi untuk menggerakkan karakter berdasarkan arah
function move(direction) {
    let characterRect = character.getBoundingClientRect();
    let gameAreaRect = gameArea.getBoundingClientRect();

    switch (direction) {
        case 'up':
            character.style.top = character.offsetTop - step + 'px';
            character.src = "p1atas.png";  // Ganti gambar saat bergerak ke atas
            if (characterRect.top <= gameAreaRect.top) {
                character.style.top = gameAreaRect.height - characterRect.height + 'px';
                changeBackground('background_atas.png'); // Ganti background ke atas
            }
            break;
        case 'down':
            character.style.top = character.offsetTop + step + 'px';
            character.src = "p1bawah.png";  // Ganti gambar saat bergerak ke bawah
            if (characterRect.bottom >= gameAreaRect.bottom) {
                character.style.top = 0 + 'px';
                changeBackground('background_bawah.png'); // Ganti background ke bawah
            }
            break;
        case 'left':
            character.style.left = character.offsetLeft - step + 'px';
            character.src = "p1kiri.png";  // Ganti gambar saat bergerak ke kiri
            if (characterRect.left <= gameAreaRect.left) {
                character.style.left = gameAreaRect.width - characterRect.width + 'px';

                // Navigasi kiri ke background kiri
                if (currentBackground === 'background.png') {
                    changeBackground('background_kiri.png');
                } else if (currentBackground.includes('background_kanan')) {
                    changeBackground('background_kanan.png');
                } else {
                    changeBackground('background.png');
                }
            }
            break;
        case 'right':
            character.style.left = character.offsetLeft + step + 'px';
            character.src = "p1kanan.png";  // Ganti gambar saat bergerak ke kanan
            if (characterRect.right >= gameAreaRect.right) {
                character.style.left = 0 + 'px';

                if (currentBackground === 'background.png') {
                    changeBackground('background_kanan.png');
                    kananCounter = 1;
                } else if (currentBackground.includes('background_kanan') && kananCounter < 5) {
                    kananCounter++;
                    changeBackground(`background_kanan${kananCounter}.png`);
                } else if (kananCounter === 5) {
                    changeBackground(`background_kanan5.png`);
                }
            }
            break;
    }
}

function changeBackground(newBackground) {
    if (currentBackground !== newBackground) {
        currentBackground = newBackground;
        gameArea.style.backgroundImage = `url('${newBackground}')`;
    }
}

// Event listener untuk kontrol keyboard
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});
