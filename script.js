// 1. Reveal Observer
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

// 2. Incredible SKEW ON SCROLL (Desktop Only)
if (window.innerWidth > 1024) {
    let currentScroll = window.pageYOffset;
    function smoothSkew() {
        let newScroll = window.pageYOffset;
        let diff = newScroll - currentScroll;
        currentScroll = newScroll;
        let skew = diff * 0.15;
        if (skew > 15) skew = 15;
        if (skew < -15) skew = -15;
        
        document.querySelectorAll('section').forEach(sec => {
            sec.style.transform = `skewY(${skew * 0.1}deg)`;
            sec.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        requestAnimationFrame(smoothSkew);
    }
    smoothSkew();
}

// 3. 3D Tilt & Magnetic (Desktop Only)
if (window.innerWidth > 1024) {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            card.style.transform = `perspective(1000px) rotateX(${-y/15}deg) rotateY(${x/15}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            btn.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
    });
}

// 4. Parallax Text (Desktop Only)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) {
        const scroll = window.pageYOffset;
        const pText = document.querySelector('.parallax-bg-text');
        if (pText) pText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.12}px))`;
    }
});

// 5. Animated Counter
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.textContent.replace(/[^0-9]/g, ''));
            let current = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                current = Math.floor(progress * countTo);
                const prefix = target.textContent.includes('+') ? '+' : (target.textContent.includes('-') ? '-' : '');
                const suffix = target.textContent.includes('%') ? '%' : '';
                target.textContent = prefix + current + suffix;
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat').forEach(stat => statsObserver.observe(stat));

// 6. Text Mask Reveal (Robust Fix)
document.querySelectorAll('.reveal-text span').forEach(span => {
    const text = span.textContent;
    span.textContent = '';
    const inner = document.createElement('div');
    inner.textContent = text;
    inner.style.transform = 'translateY(110%)';
    inner.style.transition = 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
    span.appendChild(inner);
    const tObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(() => inner.style.transform = 'translateY(0)', 100);
            tObs.unobserve(span);
        }
    }, { threshold: 0.1 });
    tObs.observe(span);
});

// Particles
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();
let dots = [];
for(let i=0; i<70; i++) dots.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, v: Math.random()*0.4});
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    dots.forEach(d => { d.y -= d.v; if(d.y < 0) d.y = canvas.height; ctx.fillRect(d.x, d.y, 1, 1); });
    requestAnimationFrame(animate);
}
animate();
lucide.createIcons();
