document.addEventListener('DOMContentLoaded', () => {

    // 1. Ambil semua elemen Layar
    const screenStart = document.getElementById('screen-start');
    const screenScan = document.getElementById('screen-scan');
    const screenThreats = document.getElementById('screen-threats');
    
    // 2. Ambil semua Tombol Aksi
    const btnScan = document.getElementById('btn-scan');
    const btnFinish = document.getElementById('btn-finish');
    
    // 3. Ambil elemen-elemen Modal
    const modalSukses = document.getElementById('modal-sukses');
    const modalGagal = document.getElementById('modal-gagal');
    const closeButtons = document.querySelectorAll('.modal-button');
    
    // 4. Ambil elemen Scan
    const progressBar = document.getElementById('scan-progress-bar');
    const scanLog = document.getElementById('scan-log');
    
    // 5. Ambil Dropdown Tindakan
    const action1 = document.getElementById('action-1');
    const action2 = document.getElementById('action-2');
    const action3 = document.getElementById('action-3');

    // 6. Fungsi Pindah Layar
    function goToScreen(screenElement) {
        // Sembunyikan semua
        screenStart.classList.remove('active');
        screenScan.classList.remove('active');
        screenThreats.classList.remove('active');
        // Tampilkan yang dituju
        screenElement.classList.add('active');
    }

    // 7. Logika Tombol Scan
    btnScan.addEventListener('click', () => {
        goToScreen(screenScan); // Pindah ke layar scan
        simulateScan(); // Mulai scan palsu
    });

    // 8. Fungsi Simulasi Scan
    function simulateScan() {
        let width = 0;
        progressBar.style.width = '0%';
        scanLog.innerText = 'Memulai scan... C:\\Windows\\...';
        
        // Buat interval untuk animasi progress bar
        const scanInterval = setInterval(() => {
            width += 10;
            progressBar.style.width = width + '%';
            
            if (width === 30) {
                scanLog.innerText = 'Memeriksa C:\\Program Files\\...';
            }
            if (width === 60) {
                scanLog.innerText = 'Memeriksa C:\\Users\\...';
            }
            if (width === 90) {
                scanLog.innerText = 'Ancaman ditemukan! Menyelesaikan scan...';
            }
            if (width >= 100) {
                clearInterval(scanInterval);
                // Selesai scan, pindah ke layar Ancaman
                setTimeout(() => {
                    goToScreen(screenThreats);
                }, 500); // Jeda 0.5 detik
            }
        }, 400); // 0.4 detik per 10%
    }

    // 9. Logika Tombol "Bersihkan Sistem"
    btnFinish.addEventListener('click', () => {
        // Cek apakah ada ancaman kritis yang di 'ignore'
        // Ancaman 2 (Trojan) dan 3 (Spyware) adalah kritis
        if (action2.value === 'ignore' || action3.value === 'ignore') {
            modalGagal.style.display = 'flex'; // Tampilkan modal Gagal
        } else {
            // Jika Adware (action1) diabaikan, kita anggap tetap "sukses"
            // tapi idealnya semua harus ditangani.
            // Untuk 'game' ini, kita fokus ke yang kritis.
            localStorage.setItem('pilar_completed_9', 'true');
            modalSukses.style.display = 'flex'; // Tampilkan modal Sukses
        }
    });
    
    // 10. Logika Tombol Tutup Modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            
            if (action === 'close-success') {
                window.location.href = 'index.html'; // Kembali ke dashboard
            } else if (action === 'close-fail') {
                button.closest('.modal-backdrop').style.display = 'none';
            }
        });
    });

    // Mulai!
    goToScreen(screenStart);
});
