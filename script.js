// 1. Core Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
});

// 2. Parallax (Only Desktop)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) {
        const scroll = window.pageYOffset;
        const pText = document.querySelector('.parallax-bg-text');
        if (pText) pText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.1}px))`;
    }
});

// 3. Text Reveal Logic (Safely handled)
document.querySelectorAll('.reveal-text span').forEach(span => {
    const text = span.textContent;
    if (!text.trim()) return;
    
    span.textContent = '';
    const inner = document.createElement('div');
    inner.textContent = text;
    inner.style.transform = 'translateY(110%)';
    inner.style.transition = 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
    span.appendChild(inner);
    
    const tObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(() => inner.style.transform = 'translateY(0)', 100);
            tObs.unobserve(span);
        }
    }, { threshold: 0.1 });
    tObs.observe(span);
});

// 4. Particles (Simplified)
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];
for(let i=0; i<50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: Math.random() * 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    particles.forEach(p => {
        p.y -= p.v;
        if (p.y < 0) p.y = canvas.height;
        ctx.fillRect(p.x, p.y, 1, 1);
    });
    requestAnimationFrame(animate);
}
animate();

// Initialize Lucide
lucide.createIcons();
