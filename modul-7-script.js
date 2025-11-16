document.addEventListener('DOMContentLoaded', () => {

    // 1. Ambil semua elemen Jebakan
    const jebakanIklan = document.getElementById('jebakan-iklan');
    const jebakanPopup = document.getElementById('jebakan-popup');
    const tombolPopup = jebakanPopup.querySelector('.popup-button');
    const tombolTutupPopup = document.getElementById('popup-close-btn');
    const jebakanCookie = document.getElementById('jebakan-cookie');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');

    // 2. Ambil semua Tombol Benar
    const tombolBenar = document.getElementById('tombol-benar');

    // 3. Ambil semua Modal Feedback
    const modalSukses = document.getElementById('modal-sukses');
    const modalJebakanPopup = document.getElementById('modal-jebakan-popup');
    const modalJebakanIklan = document.getElementById('modal-jebakan-iklan');
    const modalJebakanCookie = document.getElementById('modal-jebakan-cookie');
    
    // 4. Ambil semua tombol 'Tutup' di modal
    const closeButtons = document.querySelectorAll('.modal-button');

    // === LOGIKA GAME ===

    // Jebakan A: Tampilkan Pop-up setelah 2 detik
    setTimeout(() => {
        jebakanPopup.style.display = 'flex';
    }, 2000);

    // Menutup Pop-up (Pilihan Aman)
    tombolTutupPopup.addEventListener('click', () => {
        jebakanPopup.style.display = 'none';
    });
    
    // --- Listener untuk semua Jebakan ---

    // Klik tombol 'Klaim Sekarang' di Pop-up
    tombolPopup.addEventListener('click', () => {
        jebakanPopup.style.display = 'none'; // Sembunyikan pop-up asli
        modalJebakanPopup.style.display = 'flex'; // Tampilkan modal feedback
    });

    // Klik tombol 'DOWNLOAD NOW' (Hijau)
    jebakanIklan.addEventListener('click', () => {
        modalJebakanIklan.style.display = 'flex';
    });

    // Klik cookie 'Terima Semua'
    cookieAccept.addEventListener('click', () => {
        modalJebakanCookie.style.display = 'flex';
        jebakanCookie.style.display = 'none'; // Sembunyikan banner
    });
    
    // Klik cookie 'Tolak' (Pilihan Aman)
    cookieReject.addEventListener('click', () => {
        jebakanCookie.style.display = 'none'; // Sembunyikan banner
        alert('Pilihan bagus! Anda menolak pelacakan.');
    });

    // --- Listener untuk Tombol BENAR ---
    tombolBenar.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah link pindah halaman
        modalSukses.style.display = 'flex';
    });

    // --- Listener untuk menutup semua Modal Feedback ---
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal-backdrop').style.display = 'none';
        });
    });

});
