// Evden Eve Nakliyat - JavaScript Dosyası

document.addEventListener('DOMContentLoaded', function() {
    console.log('Evden Eve Nakliyat sitesi yüklendi!');
    
    // Price Calculator Functionality
    initPriceCalculator();
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // Process Steps Animation
    initProcessSteps();
    
    // Form Validation
    initFormValidation();
});

// Fiyat Hesaplayıcı
function initPriceCalculator() {
    const calculatorForm = document.getElementById('calculator-form');
    if (!calculatorForm) return;
    
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const distance = parseFloat(document.getElementById('distance').value) || 0;
        const volume = parseFloat(document.getElementById('volume').value) || 0;
        const packing = document.getElementById('packing').checked;
        const assembly = document.getElementById('assembly').checked;
        
        // Base price calculation
        let basePrice = distance * 5 + volume * 50;
        
        // Additional services
        if (packing) basePrice += 500;
        if (assembly) basePrice += 300;
        
        // Display result
        const resultElement = document.getElementById('calculated-price');
        if (resultElement) {
            resultElement.textContent = basePrice.toFixed(2) + ' TL';
            
            // Show result with animation
            const resultDiv = document.querySelector('.calculator-result');
            resultDiv.style.display = 'block';
            resultDiv.classList.add('animate');
        }
    });
}

// Müşteri Yorumları Slider
function initTestimonialSlider() {
    const testimonials = [
        {
            name: "Ahmet Y.",
            text: "Eşyalarımızı hiç hasar görmeden taşıdılar. Çok profesyonel ve güler yüzlü bir ekip. Kesinlikle tavsiye ederim.",
            avatar: "AY"
        },
        {
            name: "Ayşe K.",
            text: "Ofis taşımamızı çok hızlı ve düzenli bir şekilde gerçekleştirdiler. İş kesintimiz minimum seviyede kaldı.",
            avatar: "AK"
        },
        {
            name: "Mehmet T.",
            text: "Fiyat performans açısından çok iyi. Önceden verilen fiyat hiç değişmedi. Çok memnun kaldık.",
            avatar: "MT"
        }
    ];
    
    const testimonialContainer = document.getElementById('testimonial-container');
    if (!testimonialContainer) return;
    
    // Create testimonial cards
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-text">${testimonial.text}</div>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.avatar}</div>
                <div>
                    <strong>${testimonial.name}</strong>
                    <div class="rating">
                        ${'★'.repeat(5)}
                    </div>
                </div>
            </div>
        `;
        testimonialContainer.appendChild(card);
    });
    
    // Simple auto-slide
    let currentSlide = 0;
    const cards = testimonialContainer.querySelectorAll('.testimonial-card');
    
    function showSlide(index) {
        cards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (cards.length > 0) {
        showSlide(0);
        
        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % cards.length;
            showSlide(currentSlide);
        }, 5000);
    }
}

// Süreç Adımları Animasyonu
function initProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    steps.forEach(step => observer.observe(step));
}

// Form Doğrulama
function initFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;
    
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format phone number
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d{3})/, '$1 $2');
            }
            
            e.target.value = value;
        });
    }
    
    // Date input min value (today)
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set default to 3 days from now
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 3);
        dateInput.value = defaultDate.toISOString().split('T')[0];
    }
}

// WhatsApp Mesaj Formatı
function sendWhatsAppMessage() {
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const from = document.getElementById('from')?.value || '';
    const to = document.getElementById('to')?.value || '';
    
    const message = `Merhaba, nakliye hizmeti için bilgi almak istiyorum:
    
Ad Soyad: ${name}
Telefon: ${phone}
Taşınacak Adres: ${from}
Yeni Adres: ${to}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905530930325?text=${encodedMessage}`, '_blank');
}

// SOS Tuşu (Acil Durum)
function createSOSButton() {
    const sosButton = document.createElement('button');
    sosButton.innerHTML = '<i class="fas fa-phone-alt"></i> ACİL';
    sosButton.className = 'sos-button';
    sosButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #ff4757;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(255, 71, 87, 0.3);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: pulse-red 2s infinite;
    `;
    
    sosButton.addEventListener('click', function() {
        if (confirm('Acil nakliye desteği için 0553 093 03 25 numaralı telefonu aramak istiyor musunuz?')) {
            window.location.href = 'tel:05530930325';
        }
    });
    
    document.body.appendChild(sosButton);
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-red {
            0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 71, 87, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize SOS button
createSOSButton();

// Back to Top Button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 170px;
        right: 30px;
        background: var(--primary);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(42, 110, 255, 0.3);
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s;
    `;
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// Initialize back to top button
createBackToTopButton();

// Cookie Consent
function initCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const cookieConsent = document.createElement('div');
        cookieConsent.className = 'cookie-consent';
        cookieConsent.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--dark);
            color: white;
            padding: 20px;
            text-align: center;
            z-index: 1001;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 20px;
        `;
        
        cookieConsent.innerHTML = `
            <p>Bu site çerezleri kullanır. Sitemizi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.</p>
            <button id="accept-cookies" style="
                background: var(--primary);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: var(--radius);
                cursor: pointer;
            ">Kabul Et</button>
            <button id="reject-cookies" style="
                background: transparent;
                color: white;
                border: 1px solid white;
                padding: 10px 20px;
                border-radius: var(--radius);
                cursor: pointer;
            ">Reddet</button>
        `;
        
        document.body.appendChild(cookieConsent);
        
        document.getElementById('accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.style.display = 'none';
        });
        
        document.getElementById('reject-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            cookieConsent.style.display = 'none';
        });
    }
}

// Initialize cookie consent
initCookieConsent();