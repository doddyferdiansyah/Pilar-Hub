document.addEventListener('DOMContentLoaded', () => {
    const totalModules = 10;
    let completedCount = 0;

    // 1. Loop Cek Progres
    for (let i = 1; i <= totalModules; i++) {
        const moduleId = `modul-${i}`;
        const storageKey = `pilar_completed_${i}`;
        
        if (localStorage.getItem(storageKey) === 'true') {
            completedCount++;
            const cardElement = document.getElementById(moduleId);
            if (cardElement) {
                cardElement.classList.add('completed');
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

    // 3. LOGIKA BARU: Cek Sertifikat (Jika 100%)
    if (percentage === 100) {
        const certSection = document.getElementById('certificate-section');
        if (certSection) certSection.style.display = 'block'; // Tampilkan tombol klaim
    }

    // 4. Logika Modal & Print Sertifikat
    const btnClaim = document.getElementById('btn-claim-cert');
    const modal = document.getElementById('cert-modal');
    const btnGenerate = document.getElementById('btn-generate-cert');
    const btnClose = document.getElementById('btn-close-cert-modal');

    if (btnClaim) {
        btnClaim.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (btnClose) {
        btnClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            const nameInput = document.getElementById('cert-name-input').value;
            if (nameInput.trim() === "") {
                alert("Mohon isi nama Anda.");
                return;
            }

            // Isi Data ke Sertifikat
            document.getElementById('cert-student-name').innerText = nameInput;
            
            // Isi Tanggal Hari Ini
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('cert-date').innerText = today.toLocaleDateString('id-ID', options);

            // Print!
            window.print();
            
            // Tutup modal setelah print dialog muncul
            modal.style.display = 'none';
        });
    }

    // ... (Kode Reset Button tetap ada di bawah sini) ...
     document.getElementById('btn-reset-progress').addEventListener('click', () => {
        if(confirm("Reset semua progres belajar Anda?")) {
            localStorage.clear();
            location.reload();
        }
    });
});
