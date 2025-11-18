document.addEventListener('DOMContentLoaded', () => {

    // 1. Definisikan Skor Awal
    let currentScore = 0; // Mulai dari 0. 5 pengaturan x 20 poin = 100.
    
    // 2. Ambil Elemen Skor
    const scoreBar = document.getElementById('score-bar');
    const scoreText = document.getElementById('score-text');
    
    // 3. Ambil Elemen Modal
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // 4. Ambil semua Elemen Pengaturan
    const selectPost = document.getElementById('select-post');
    const selectFriends = document.getElementById('select-friends');
    const toggleSearch = document.getElementById('toggle-search');
    const toggleTag = document.getElementById('toggle-tag');
    const toggle2FA = document.getElementById('toggle-2fa');
    
    // 5. Fungsi untuk Update Skor
    function updateScore(pointsToAdd) {
        // Cek jika elemen sudah 'good' agar tidak menambah skor berulang kali
        if (this.classList.contains('setting-good')) {
             return; // Sudah aman, jangan lakukan apa-apa
        }
        
        currentScore += pointsToAdd; // Tambah skor
        
        // Update Tampilan Skor
        scoreText.innerText = `${currentScore}/100`;
        scoreBar.style.width = `${currentScore}%`;

        // Tandai elemen ini sebagai 'aman'
        this.classList.remove('setting-bad');
        this.classList.add('setting-good');
        
        // Update Warna Skor
        if (currentScore > 0) { // Beri warna merah jika > 0, tapi masih < 40
            scoreBar.style.backgroundColor = '#dc3545';
            scoreText.style.color = '#dc3545';
        }
        if (currentScore > 40) {
            scoreBar.style.backgroundColor = '#ffc107'; // Kuning
            scoreText.style.color = '#ffc107';
        }
        if (currentScore > 70) {
            scoreBar.style.backgroundColor = '#28a745'; // Hijau
            scoreText.style.color = '#28a745';
        }
        
        // Cek Kemenangan
        if (currentScore === 100) {
            scoreText.innerText = "100/100 (Sangat Aman!)";
            setTimeout(() => {
                localStorage.setItem('pilar_completed_8', 'true');
                successModal.style.display = 'flex';
            }, 500); // Tampilkan modal kemenangan
        }
    }

    // === 6. Tambahkan Listener ke setiap Pengaturan ===

    // Pilihan yang 'Aman' adalah 'Hanya Teman' atau 'Hanya Saya'
    selectPost.addEventListener('change', () => {
        if (selectPost.value === 'teman' || selectPost.value === 'saya') {
            // 'this' tidak bisa dipakai di 'change', jadi kita panggil manual
            updateScore.call(selectPost, 20); 
        }
    });

    // Pilihan yang 'Aman' HANYA 'Hanya Saya'
    selectFriends.addEventListener('change', () => {
        if (selectFriends.value === 'saya') {
            updateScore.call(selectFriends, 20);
        }
    });

    // Pengaturan 'Aman' adalah 'Mati' (checked = false)
    toggleSearch.addEventListener('click', () => {
        if (!toggleSearch.checked) { // Jika tidak dicentang (Mati)
            updateScore.call(toggleSearch, 20);
        }
    });

    // Pengaturan 'Aman' adalah 'Nyala' (checked = true)
    toggleTag.addEventListener('click', () => {
        if (toggleTag.checked) { // Jika dicentang (Nyala)
            updateScore.call(toggleTag, 20);
        }
    });

    // Pengaturan 'Aman' adalah 'Nyala' (checked = true)
    toggle2FA.addEventListener('click', () => {
        if (toggle2FA.checked) { // Jika dicentang (Nyala)
            updateScore.call(toggle2FA, 20);
        }
    });

    // 7. Listener Tombol Tutup Modal
    closeModalBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // Arahkan ke dashboard
    });

});
