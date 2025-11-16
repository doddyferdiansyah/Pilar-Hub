document.addEventListener('DOMContentLoaded', () => {

    // 1. Ambil semua elemen 'layar'
    const screens = document.querySelectorAll('.screen');
    
    // 2. Ambil elemen interaktif
    const appSenter = document.getElementById('app-senter');
    const appGame = document.getElementById('app-game');
    const allButtons = document.querySelectorAll('.btn-allow, .btn-deny');
    const btnLanjutGame = document.getElementById('btn-lanjut-game');

    // 3. Ambil elemen feedback
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackTitleGame = document.getElementById('feedback-title-game');
    const feedbackTextGame = document.getElementById('feedback-text-game');

    // 4. Daftar Teks Feedback (Database Mini)
    const feedbackData = {
        wajar: {
            title: "Pilihan Logis ✅",
            text: "Aplikasi Senter wajar meminta akses Kamera untuk menyalakan lampu flash.",
            class: "aman"
        },
        menang: {
            title: "KEREN! ANDA JELI! 👍",
            text: "Anda menolak! Ini adalah pilihan yang sangat tepat. Aplikasi Senter TIDAK PERLU akses ke Kontak Anda. Ini adalah tanda bahaya besar!",
            class: "aman"
        },
        kalah: {
            title: "AWAS JEBAKAN! 🛑",
            text: "Anda mengizinkan! Untuk apa aplikasi Senter butuh daftar Kontak Anda? Aplikasi ini sekarang bisa mencuri dan menjual semua nomor kontak Anda.",
            class: "jebakan"
        },
        'wajar-izin': {
            title: "Pilihan Logis ✅",
            text: "Aplikasi Game wajar meminta akses Penyimpanan untuk menyimpan progres (save file) Anda.",
            class: "aman"
        },
        'wajar-tolak': {
            title: "Pilihan Aman",
            text: "Anda menolak. Ini aman, tapi game Anda mungkin tidak bisa menyimpan progres.",
            class: "netral"
        }
    };

    // 5. Fungsi untuk pindah layar
    function goToScreen(screenId) {
        screens.forEach(s => s.classList.remove('active')); // Sembunyikan semua
        document.getElementById(screenId).classList.add('active'); // Tampilkan yang dituju
    }

    // 6. Logika awal
    
    // Klik App Senter -> Pindah ke Izin Senter 1
    appSenter.addEventListener('click', () => {
        goToScreen('screen-senter-1');
    });

    // Klik App Game -> Pindah ke Izin Game 1
    appGame.addEventListener('click', () => {
        goToScreen('screen-game-1');
    });

    // 7. Logika untuk semua tombol 'Izinkan' / 'Tolak'
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextScreen = button.getAttribute('data-next');
            const feedbackKey = button.getAttribute('data-feedback');

            // Jika tombol ini punya 'feedback', proses feedback-nya
            if (feedbackKey) {
                const data = feedbackData[feedbackKey];
                
                // Cek apakah ini feedback untuk Senter atau Game
                if (nextScreen === 'screen-senter-finish') {
                    feedbackTitle.innerText = data.title;
                    feedbackText.innerText = data.text;
                    feedbackTitle.className = data.class;
                } else if (nextScreen === 'screen-game-finish') {
                    feedbackTitleGame.innerText = data.title;
                    feedbackTextGame.innerText = data.text;
                    feedbackTitleGame.className = data.class;
                }
            }

            // Pindah ke layar berikutnya
            if (nextScreen) {
                goToScreen(nextScreen);
            }
        });
    });

    // 8. Logika Tombol "Lanjut"
    btnLanjutGame.addEventListener('click', () => {
        // Tampilkan prompt untuk klik game
        alert("Sekarang, coba 'install' aplikasi Cacing Lucu.");
        goToScreen('screen-start'); // Kembali ke awal, tapi user tahu harus klik game
    });

    // 9. Mulai di layar 'start'
    goToScreen('screen-start');
});
