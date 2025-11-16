document.addEventListener('DOMContentLoaded', () => {

    // 1. Ambil elemen Wi-Fi yang bisa diklik
    const wifiAman = document.getElementById('wifi-aman');
    const wifiBerisiko = document.getElementById('wifi-berisiko');
    const wifiJebakan = document.getElementById('wifi-jebakan');

    // 2. Ambil elemen Modal (pop-up)
    const modalAman = document.getElementById('modal-aman');
    const modalBerisiko = document.getElementById('modal-berisiko');
    const modalJebakan = document.getElementById('modal-jebakan');

    // 3. Ambil semua tombol 'Tutup' di modal
    const closeButtons = document.querySelectorAll('.modal-button');

    // 4. Tambahkan 'listener' ke setiap pilihan Wi-Fi
    
    wifiAman.addEventListener('click', () => {
        modalAman.style.display = 'flex';
    });

    wifiBerisiko.addEventListener('click', () => {
        modalBerisiko.style.display = 'flex';
    });

    wifiJebakan.addEventListener('click', () => {
        modalJebakan.style.display = 'flex';
    });

    // 5. Tambahkan 'listener' untuk menutup SEMUA modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Temukan modal-backdrop terdekat dan sembunyikan
            button.closest('.modal-backdrop').style.display = 'none';
        });
    });

});
