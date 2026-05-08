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

// 2. 3D Tilt (Only Desktop)
if (window.innerWidth > 1024) {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}

// 3. Magnetic Buttons (Only Desktop)
if (window.innerWidth > 1024) {
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
}

// 4. Parallax Text (Only Desktop)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) {
        const scroll = window.pageYOffset;
        const pText = document.querySelector('.parallax-bg-text');
        if (pText) pText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.1}px))`;
    }
});

// 5. Counters
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

// 6. Text Reveal (Robust)
document.querySelectorAll('.reveal-text span').forEach(span => {
    const text = span.textContent;
    span.textContent = '';
    const inner = document.createElement('div');
    inner.textContent = text;
    inner.style.transform = 'translateY(105%)';
    inner.style.transition = 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
    span.appendChild(inner);
    
    const tObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(() => inner.style.transform = 'translateY(0)', 100);
        }
    }, { threshold: 0.1 });
    tObs.observe(span);
});

// Initialize Lucide
lucide.createIcons();
