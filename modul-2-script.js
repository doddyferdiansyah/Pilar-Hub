document.addEventListener('DOMContentLoaded', () => {

    // Ambil semua elemen yang kita butuhkan
    const passwordInput = document.getElementById('password-input');
    const strengthBar = document.getElementById('strength-bar');
    const feedbackText = document.getElementById('feedback-text');
    const timeToCrackText = document.getElementById('time-to-crack').querySelector('span');
    
    // Ambil elemen checklist
    const checkLength = document.getElementById('check-length');
    const checkUppercase = document.getElementById('check-uppercase');
    const checkNumber = document.getElementById('check-number');
    const checkSymbol = document.getElementById('check-symbol');

    // 'Listener' ini berjalan SETIAP KALI pengguna mengetik
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const result = checkPasswordStrength(password);

        // Update Progress Bar
        strengthBar.style.width = result.width;
        strengthBar.className = `strength-bar ${result.colorClass}`; // Ganti kelas warna
        
        // Update Teks Feedback
        feedbackText.innerText = result.feedback;
        feedbackText.className = result.colorClass; // Ganti kelas warna
        
        // Update Waktu Bobol
        timeToCrackText.innerText = result.timeToCrack;
        
        // Update Checklist
        updateChecklist(result.criteria);
    });

    function checkPasswordStrength(password) {
        let score = 0;
        let criteria = {
            length: false,
            uppercase: false,
            number: false,
            symbol: false
        };

        // Kriteria 1: Panjang (Paling Penting)
        if (password.length >= 8) {
            score++;
            if (password.length >= 12) {
                score++;
                criteria.length = true;
            }
        }
        
        // Kriteria 2: Huruf Besar
        if (/[A-Z]/.test(password)) {
            score++;
            criteria.uppercase = true;
        }
        
        // Kriteria 3: Angka
        if (/[0-9]/.test(password)) {
            score++;
            criteria.number = true;
        }
        
        // Kriteria 4: Simbol
        if (/[^A-Za-z0-9]/.test(password)) {
            score++;
            criteria.symbol = true;
        }

        // Tentukan hasil berdasarkan skor (skor maks 5)
        let width, colorClass, feedback, timeToCrack;

        switch (score) {
            case 0:
            case 1:
                width = '20%';
                colorClass = 'lemah';
                feedback = 'Sangat Lemah';
                timeToCrack = '< 1 detik';
                break;
            case 2:
                width = '40%';
                colorClass = 'sedang';
                feedback = 'Sedang';
                timeToCrack = '10 menit';
                break;
            case 3:
                width = '60%';
                colorClass = 'lumayan';
                feedback = 'Lumayan';
                timeToCrack = '2 hari';
                break;
            case 4:
                width = '80%';
                colorClass = 'kuat';
                feedback = 'Kuat';
                timeToCrack = '100 tahun';
                break;
            case 5:
                width = '100%';
                colorClass = 'kuat';
                feedback = 'Sangat Kuat!';
                timeToCrack = '5000+ tahun';
                break;
            default:
                width = '0%';
                colorClass = 'lemah';
                feedback = 'Mulai ketik...';
                timeToCrack = '---';
        }
        
        if (password.length === 0) {
             width = '0%';
             feedback = 'Mulai ketik untuk melihat kekuatan...';
             timeToCrack = '---';
        }

        return { width, colorClass, feedback, timeToCrack, criteria };
    }
    
    function updateChecklist(criteria) {
        // Cek Panjang
        if (criteria.length) {
            checkLength.classList.add('terpenuhi');
        } else {
            checkLength.classList.remove('terpenuhi');
        }
        
        // Cek Huruf Besar
        if (criteria.uppercase) {
            checkUppercase.classList.add('terpenuhi');
        } else {
            checkUppercase.classList.remove('terpenuhi');
        }
        
        // Cek Angka
        if (criteria.number) {
            checkNumber.classList.add('terpenuhi');
        } else {
            checkNumber.classList.remove('terpenuhi');
        }
        
        // Cek Simbol
        if (criteria.symbol) {
            checkSymbol.classList.add('terpenuhi');
        } else {
            checkSymbol.classList.remove('terpenuhi');
        }
    }
});
