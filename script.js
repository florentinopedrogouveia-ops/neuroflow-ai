// 1. Advanced Scroll Reveal & Staggering
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
});

// 2. Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollBar = document.querySelector('.scroll-progress');
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollBar) scrollBar.style.width = scrollPercent + '%';
});

// 3. Incredible "Skew on Scroll" Effect
let currentScroll = window.pageYOffset;
let skew = 0;
let maxSkew = 15; // Max degrees

function smoothSkew() {
    let newScroll = window.pageYOffset;
    let diff = newScroll - currentScroll;
    currentScroll = newScroll;

    // Calculate skew based on scroll velocity
    skew = diff * 0.1; 
    if (skew > maxSkew) skew = maxSkew;
    if (skew < -maxSkew) skew = -maxSkew;

    // Apply skew to all major sections
    document.querySelectorAll('section').forEach(section => {
        section.style.transform = `skewY(${skew * 0.2}deg)`;
        section.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    requestAnimationFrame(smoothSkew);
}
smoothSkew();

// 4. Text Reveal Helper: Wrap lines in spans
document.querySelectorAll('.reveal-text span').forEach(span => {
    const text = span.textContent;
    span.textContent = '';
    const inner = document.createElement('div');
    inner.textContent = text;
    inner.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    inner.style.transform = 'translateY(100%)';
    span.appendChild(inner);
    
    // Add to observer
    const textObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            inner.style.transform = 'translateY(0)';
            textObserver.unobserve(span);
        }
    }, { threshold: 1 });
    textObserver.observe(span);
});

// 5. Particle Grid: Minimal & Dynamic
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.3;
        this.vy = -(Math.random() * 0.2 + 0.1);
    }
    update() {
        this.y += this.vy;
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}
for (let i = 0; i < 150; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// Initialize Lucide
lucide.createIcons();
