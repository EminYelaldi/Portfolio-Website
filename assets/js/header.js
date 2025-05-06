// Header elemanlarını seç
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navRight = document.querySelector('.nav-right');
let lastScrollY = window.scrollY;

// Header scroll efekti
function updateHeader() {
    if (window.scrollY > 150) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollY = window.scrollY;
}

// Scroll olayını throttle ile optimize et
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeader();
            ticking = false;
        });
        ticking = true;
    }
});

// Hamburger menü toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navRight.classList.toggle('active');
});

// Menü linklerine tıklandığında mobil menüyü kapat
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navRight.classList.remove('active');
    });
});

// Sayfa yüklendiğinde scroll pozisyonunu kontrol et
document.addEventListener('DOMContentLoaded', () => {
    updateHeader();
}); 