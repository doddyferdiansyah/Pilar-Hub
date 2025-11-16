// Menunggu seluruh halaman siap
document.addEventListener('DOMContentLoaded', () => {

    // Ambil semua elemen yang merupakan tanda bahaya
    const redFlags = document.querySelectorAll('.red-flag');
    
    // Total tanda bahaya yang harus ditemukan
    const totalFlags = 2; // Kita punya 2 (http dan .xyz)
    
    // Set untuk melacak tanda bahaya yang sudah ditemukan
    let foundFlags = new Set();

    // Ambil elemen teks progres
    const progressText = document.getElementById('progress-text');
    
    // Ambil elemen pop-up kemenangan
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Tambahkan 'listener' klik ke setiap tanda bahaya
    redFlags.forEach(flag => {
        flag.addEventListener('click', () => {
            
            // Dapatkan info penjelasan dari atribut 'data-flag-info'
            const info = flag.getAttribute('data-flag-info');

            // Tampilkan info ke pengguna
            alert(info); // Kita pakai alert() dulu, ini paling simpel

            // Tandai sebagai 'ditemukan'
            flag.classList.add('found');
            
            // Tambahkan ke Set pelacak kita
            foundFlags.add(flag);

            // Update teks progres
            progressText.innerText = `Tanda bahaya ditemukan: ${foundFlags.size} dari ${totalFlags}`;

            // Cek apakah semua sudah ditemukan
            if (foundFlags.size === totalFlags) {
                // Tampilkan pop-up kemenangan
                setTimeout(() => { // Kasih jeda dikit biar terasa
                    successModal.style.display = 'flex';
                }, 500);
            }
        });
    });

    // Logika untuk menutup modal
    closeModalBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

});
