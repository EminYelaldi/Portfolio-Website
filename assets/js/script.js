// Typing Animation
const typingText = document.querySelector('.typing-text');
const texts = ['Web Frontend Geliştiricisiyim', 'Mobil React Native Geliştiricisiyim'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Start typing animation
setTimeout(type, 1000);

// Form Submission
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    try {
        const response = await fetch('process.php', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Mesajınız başarıyla gönderildi!');
            contactForm.reset();
        } else {
            throw new Error('Bir hata oluştu');
        }
    } catch (error) {
        alert('Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.');
    }
});

// Timeline animasyonu
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Timeline itemlarına başlangıç stilleri ekleme
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('timeline-item:nth-child(even)') 
            ? 'translateX(100px)' 
            : 'translateX(-100px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
