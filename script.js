
/* ==== THEME TOGGLE ==== */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        // Hapus glitch sebelumnya
        document.body.classList.remove("theme-glitch");

        // Ganti tema
        document.body.classList.toggle("light-mode");

        // Picu ulang animasi glitch
        void document.body.offsetWidth;
        document.body.classList.add("theme-glitch");

        // Hapus glitch setelah 350ms
        setTimeout(function () {
            document.body.classList.remove("theme-glitch");
        }, 350);
    });
}

// ==== OSU PORTOFOLIO - JAVASCRIPT ==== //

// ==== 1. OSU LOGO -> OPEN / CLOSE NAVIGATION ==== //



const osuLogo = document.getElementById("osuLogo");
const osuNavigation = document.getElementById("osuNavigation");

if (osuLogo && osuNavigation) {
    osuLogo.addEventListener("click", function() {
        osuNavigation.classList.toggle("show");
    });
}

// ===== 2. MUSIC PLAYER =====

const music = document.getElementById("backgroundMusic");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const shuffleButton = document.getElementById("shuffleButton");
const repeatButton = document.getElementById("repeatButton");

const currentTimeText = document.querySelector(".current-time");
const totalTimeText = document.querySelector(".total-time");
const progressBar = document.querySelector(".progress-bar");
const progressFill = document.querySelector(".progress-fill");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

// Daftar lagu
const songs = [
    {
        title: "I Really Want To Stay At Your House",
        artist: "Rosa Walton & Hallie Coggins",
        src: "I-Really-Want-To-Stay-At-Your-House.mp3"
    }
];

let currentSong = 0;
let isShuffle = false;
let isRepeat = false;

// Format waktu menjadi menit:detik
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Memuat lagu
function loadSong(index) {
    const song = songs[index];

    music.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    music.load();
}

// Memutar atau menjeda lagu
playButton.addEventListener("click", function () {
    if (music.paused) {
        music.play().catch(function (error) {
            console.error("Lagu gagal diputar:", error);
        });
    } else {
        music.pause();
    }
});

// Ikon Play/Pause mengikuti keadaan audio
music.addEventListener("play", function () {
    playButton.textContent = "❚❚";
});

music.addEventListener("pause", function () {
    playButton.textContent = "▷";
});

// Memperbarui progress dan waktu lagu
music.addEventListener("timeupdate", function () {
    currentTimeText.textContent = formatTime(music.currentTime);

    if (music.duration) {
        const progress =
            (music.currentTime / music.duration) * 100;

        progressFill.style.width = `${progress}%`;
    }
});

// Menampilkan durasi asli lagu
music.addEventListener("loadedmetadata", function () {
    totalTimeText.textContent = formatTime(music.duration);
});

// Klik progress bar untuk melompat ke bagian lagu
progressBar.addEventListener("click", function (event) {
    if (!music.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = clickPosition / rect.width;

    music.currentTime = percentage * music.duration;
});

// Lagu berikutnya
function nextSong() {
    if (isShuffle && songs.length > 1) {
        let nextIndex;

        do {
            nextIndex = Math.floor(Math.random() * songs.length);
        } while (nextIndex === currentSong);

        currentSong = nextIndex;
    } else {
        currentSong = (currentSong + 1) % songs.length;
    }

    loadSong(currentSong);
    music.play().catch(function (error) {
        console.error("Lagu gagal diputar:", error);
    });
}

// Lagu sebelumnya
function previousSong() {
    if (music.currentTime > 3) {
        music.currentTime = 0;
        return;
    }

    currentSong =
        (currentSong - 1 + songs.length) % songs.length;

    loadSong(currentSong);
    music.play().catch(function (error) {
        console.error("Lagu gagal diputar:", error);
    });
}

nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);

// Shuffle
shuffleButton.addEventListener("click", function () {
    isShuffle = !isShuffle;

    shuffleButton.classList.toggle("active", isShuffle);
});

// Repeat
repeatButton.addEventListener("click", function () {
    isRepeat = !isRepeat;
    music.loop = isRepeat;

    repeatButton.classList.toggle("active", isRepeat);
});

// Otomatis pindah ke lagu berikutnya saat selesai
music.addEventListener("ended", function () {
    if (!isRepeat) {
        nextSong();
    }
});

// Inisialisasi music player
loadSong(currentSong);

// Mencoba memutar lagu secara otomatis
music.play().catch(function () {
    console.log("Autoplay diblokir browser. Menunggu interaksi pengguna.");
});
