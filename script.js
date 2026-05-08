// 1. Core Intersection Observer for Reveals
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
});

// 2. 3D Tilt Effect for Cards
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// 3. Magnetic Button Effect
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// 4. Advanced Parallax Background
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const parallaxText = document.querySelector('.parallax-bg-text');
    if (parallaxText) {
        parallaxText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.15}px))`;
    }
    
    // Scroll Progress
    const progress = document.querySelector('.scroll-progress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (scroll / totalHeight) * 100 + '%';
});

// 5. Animated Number Counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-target'));
            let current = 0;
            const duration = 2000;
            const step = countTo / (duration / 16);
            
            const counter = setInterval(() => {
                current += step;
                if (current >= countTo) {
                    target.textContent = (target.textContent.includes('+') ? '+' : (target.textContent.includes('-') ? '-' : '')) + countTo + (target.textContent.includes('%') ? '%' : '');
                    clearInterval(counter);
                } else {
                    target.textContent = (target.textContent.includes('+') ? '+' : (target.textContent.includes('-') ? '-' : '')) + Math.floor(current) + (target.textContent.includes('%') ? '%' : '');
                }
            }, 16);
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    if (stat.getAttribute('data-target')) statsObserver.observe(stat);
});

// 6. Text Reveal Refinement
document.querySelectorAll('.reveal-text span').forEach(span => {
    const text = span.textContent;
    span.textContent = '';
    const inner = document.createElement('div');
    inner.textContent = text;
    inner.style.transform = 'translateY(100%)';
    inner.style.transition = 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
    span.appendChild(inner);
    
    const textObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            inner.style.transform = 'translateY(0)';
        }
    }, { threshold: 0.1 });
    textObs.observe(span);
});

// 7. Dynamic Particle Grid (Refined)
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
}
window.addEventListener('resize', initCanvas);
initCanvas();

let dots = [];
for (let i = 0; i < 80; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: Math.random() * 0.5 + 0.1
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    dots.forEach(dot => {
        dot.y -= dot.v;
        if (dot.y < 0) dot.y = canvas.height;
        ctx.fillRect(dot.x, dot.y, 1, 1);
    });
    requestAnimationFrame(draw);
}
draw();

// Initialize Lucide
lucide.createIcons();
