document.addEventListener('DOMContentLoaded', () => {

    // Ambil elemen-elemen utama
    const chatWindow = document.getElementById('chat-window');
    const responseOptions = document.getElementById('response-options');
    const successModal = document.getElementById('success-modal');
    const failModal = document.getElementById('fail-modal');
    const retryBtn = document.getElementById('retry-btn');

    // Ini adalah 'script' percakapan kita.
    // type: 'in' (dari penipu), 'out' (dari Anda), 'system' (info)
    const gameScript = {
        start: {
            message: "Assalamu'alaikum, siang. Maaf mengganggu waktunya.",
            type: 'in',
            delay: 1000,
            options: [
                { text: "Wa'alaikumsalam. Siang. Ini siapa ya?", next: 'intro' },
                { text: "Siapa ya?", next: 'intro' },
                { text: "(Abaikan Saja)", next: 'ignore' }
            ]
        },
        ignore: {
            message: "Anda mengabaikan pesan itu. Tapi 5 menit kemudian...",
            type: 'system',
            delay: 1000,
            next: 'followup'
        },
        followup: {
            message: "Halo? Kak? Mohon dibalas, ini penting sekali.",
            type: 'in',
            delay: 2000,
            options: [
                { text: "Iya, ini siapa? Ada apa?", next: 'intro' }
            ]
        },
        intro: {
            message: "Saya Budi dari Bagian SDM PT Cipta Jaya. Kami sedang ada lowongan *Part Time Admin*, data Kakak direkomendasikan. Apa Kakak tertarik?",
            type: 'in',
            delay: 2000,
            options: [
                { text: "Wah, boleh. Infonya seperti apa ya?", next: 'scam1' },
                { text: "Dapat data saya dari mana ya?", next: 'scam1_suspicious' }
            ]
        },
        scam1_suspicious: {
            message: "Hehe dari database pencari kerja, Kak. Infonya gampang kok, kerjanya cuma input data, 3 jam sehari, gaji 5 Juta/bulan.",
            type: 'in',
            delay: 1500,
            next: 'scam1'
        },
        scam1: {
            message: "Syaratnya gampang, Kak. Tidak perlu interview. Kakak hanya perlu install aplikasi absensi kami untuk pendataan awal.",
            type: 'in',
            delay: 2000,
            next: 'scam2'
        },
        scam2: {
            message: "Ini file aplikasinya ya Kak, formatnya .APK. Silakan di-install di HP Android Kakak. Ditunggu konfirmasinya.",
            type: 'in',
            delay: 1500,
            options: [
                { text: "OK, saya download dan install ya.", next: 'fail' },
                { text: "Maaf, kenapa .APK? Tidak ada di Play Store?", next: 'scam3' },
                { text: "Blokir Nomor Ini", next: 'win' }
            ]
        },
        scam3: {
            message: "Ini aplikasi internal, Kak, belum rilis di Play Store. Aman kok, sudah banyak yang install. Ditunggu ya.",
            type: 'in',
            delay: 2000,
            options: [
                { text: "Oh gitu. Oke deh saya coba install.", next: 'fail' },
                { text: "Saya tidak install aplikasi di luar Play Store. Blokir.", next: 'win' }
            ]
        },
        win: {
            message: "Anda memilih untuk memblokir nomor tersebut. Pilihan yang sangat tepat!",
            type: 'system',
            delay: 1500,
            next: 'showWinModal'
        },
        fail: {
            message: "Anda mengklik file .APK berbahaya itu...",
            type: 'out',
            delay: 1000,
            next: 'showFailModal'
        },
        showWinModal: {
            action: () => { successModal.style.display = 'flex'; }
        },
        showFailModal: {
            action: () => { failModal.style.display = 'flex'; }
        }
    };

    // Fungsi untuk menambah gelembung chat ke window
    function addBubble(text, type) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type}`;
        bubble.innerText = text;
        chatWindow.appendChild(bubble);
        
        // Auto-scroll ke bawah
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Fungsi untuk menampilkan pilihan jawaban
    function showOptions(options) {
        responseOptions.innerHTML = ''; // Kosongkan pilihan lama
        
        if (!options) return; // Jika tidak ada options, selesai

        options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.text;
            
            // Tambahkan kelas 'danger' jika text mengandung "Blokir"
            if (option.text.toLowerCase().includes('blokir')) {
                button.classList.add('danger');
            }

            button.addEventListener('click', () => {
                // Saat tombol diklik, tambahkan jawaban 'out' jika itu pilihan user
                if (option.next !== 'ignore') {
                    addBubble(option.text, 'out');
                }
                // Hapus semua tombol
                responseOptions.innerHTML = '';
                // Lanjut ke 'step' berikutnya
                runStep(option.next);
            });
            responseOptions.appendChild(button);
        });
    }

    // Fungsi utama yang menjalankan 'game'
    function runStep(stepName) {
        const step = gameScript[stepName];

        if (!step) return; // Game selesai

        // Jika step adalah 'action', jalankan fungsinya
        if (step.action) {
            step.action();
            return;
        }

        // Tampilkan pesan chat dengan jeda
        setTimeout(() => {
            addBubble(step.message, step.type);
            
            // Tampilkan pilihan jawaban (jika ada)
            if (step.options) {
                setTimeout(() => {
                    showOptions(step.options);
                }, 500); // Jeda sebelum tombol muncul
            }
            
            // Jika ada 'next' otomatis, jalankan
            if (step.next) {
                runStep(step.next);
            }
        }, step.delay || 0); // Gunakan 'delay' atau 0
    }

    // Listener untuk tombol "Coba Lagi"
    retryBtn.addEventListener('click', () => {
        failModal.style.display = 'none'; // Sembunyikan modal
        chatWindow.innerHTML = ''; // Kosongkan chat
        responseOptions.innerHTML = ''; // Kosongkan tombol
        runStep('start'); // Mulai ulang game
    });

    // Mulai game!
    runStep('start');
});
