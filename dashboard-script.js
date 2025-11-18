document.addEventListener('DOMContentLoaded', () => {
    const totalModules = 10;
    let completedCount = 0;

    // 1. Loop untuk mengecek setiap modul
    for (let i = 1; i <= totalModules; i++) {
        const moduleId = `modul-${i}`;
        const storageKey = `pilar_completed_${i}`; // Kunci memori: pilar_completed_1, dst.
        
        // Cek apakah ada data 'true' di memori browser
        const isCompleted = localStorage.getItem(storageKey) === 'true';

        if (isCompleted) {
            completedCount++;
            
            // Cari elemen kartu di HTML
            const cardElement = document.getElementById(moduleId);
            if (cardElement) {
                // Tambahkan kelas CSS 'completed' (jadi hijau)
                cardElement.classList.add('completed');
                
                // Ubah teks tombol (opsional, karena CSS sudah menangani)
                const statusSpan = cardElement.querySelector('.module-status');
                if(statusSpan) statusSpan.innerText = "Selesai";
            }
        }
    }

    // 2. Update Progress Bar
    const percentage = Math.round((completedCount / totalModules) * 100);
    document.getElementById('progress-text').innerText = `${percentage}%`;
    document.getElementById('progress-fraction').innerText = `${completedCount}/${totalModules} Selesai`;
    document.getElementById('main-progress-bar').style.width = `${percentage}%`;

    // 3. Tombol Reset (Untuk Testing)
    document.getElementById('btn-reset-progress').addEventListener('click', () => {
        if(confirm("Reset semua progres belajar Anda?")) {
            localStorage.clear(); // Hapus memori
            location.reload(); // Refresh halaman
        }
    });
});
