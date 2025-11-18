document.addEventListener('DOMContentLoaded', () => {
    // === Elemen Layar ===
    const ransomwareScreen = document.getElementById('ransomware-screen');
    const backupScreen = document.getElementById('backup-screen');

    // === Elemen Ransomware Screen ===
    const countdownElement = document.getElementById('countdown');
    const btnPay = document.getElementById('btn-pay');
    const btnBackup = document.getElementById('btn-backup');

    // === Elemen Backup Screen ===
    const backupItems = document.querySelectorAll('.backup-item');

    // === Elemen Modals ===
    const modalPayFail = document.getElementById('modal-pay-fail');
    const modalInfectedBackup = document.getElementById('modal-infected-backup');
    const modalSuccess = document.getElementById('modal-success');
    const retryRansomBtn = modalPayFail.querySelector('.btn-retry');
    const retryBackupBtn = modalInfectedBackup.querySelector('.btn-retry');
    const backToDashboardBtn = modalSuccess.querySelector('.btn-back-dashboard');

    let countdownInterval; // Untuk menyimpan interval countdown

    // === Fungsi Pindah Layar ===
    function goToScreen(screenElement) {
        // Hentikan countdown jika pindah dari layar ransomware
        if (screenElement !== ransomwareScreen && countdownInterval) {
            clearInterval(countdownInterval);
        }
        ransomwareScreen.classList.remove('active');
        backupScreen.classList.remove('active');
        screenElement.classList.add('active');
    }

    // === Fungsi untuk memulai Countdown (hanya visual) ===
    function startCountdown() {
        let totalSeconds = 23 * 3600 + 59 * 60 + 59; // 23 jam 59 menit 59 detik
        countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "00:00:00";
                // Di sini bisa ditambahkan logika "Game Over" jika ingin lebih keras
                return;
            }

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            countdownElement.textContent =
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            totalSeconds--;
        }, 1000);
    }

    // === Logika Tombol di Layar Ransomware ===
    btnPay.addEventListener('click', () => {
        modalPayFail.style.display = 'flex'; // Tampilkan modal Gagal Bayar
    });

    btnBackup.addEventListener('click', () => {
        goToScreen(backupScreen); // Pindah ke layar pilihan backup
    });

    // === Logika Pilihan Backup ===
    backupItems.forEach(item => {
        item.addEventListener('click', () => {
            // Hapus seleksi sebelumnya
            backupItems.forEach(i => i.classList.remove('selected'));
            // Tambahkan seleksi ke item yang diklik
            item.classList.add('selected');

            const selectedDate = item.getAttribute('data-date');

            if (selectedDate === 'today') {
                // Pilihan salah, backup hari ini sudah terinfeksi
                modalInfectedBackup.style.display = 'flex';
            } else {
                // Pilihan benar (kemarin atau minggu lalu)
                localStorage.setItem('pilar_completed_10', 'true');
                modalSuccess.style.display = 'flex';
            }
        });
    });

    // === Logika Tombol Modals ===
    retryRansomBtn.addEventListener('click', () => {
        modalPayFail.style.display = 'none';
        // Reset game ke layar ransomware
        goToScreen(ransomwareScreen);
        startCountdown(); // Mulai lagi countdown
    });

    retryBackupBtn.addEventListener('click', () => {
        modalInfectedBackup.style.display = 'none';
        // Reset pilihan backup
        backupItems.forEach(i => i.classList.remove('selected'));
        goToScreen(backupScreen); // Kembali ke layar pilihan backup
    });

    backToDashboardBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // Kembali ke dashboard utama Pilar-Hub
    });

    // === Inisialisasi: Mulai dari Layar Ransomware ===
    goToScreen(ransomwareScreen);
    startCountdown(); // Mulai countdown saat pertama kali masuk
});
