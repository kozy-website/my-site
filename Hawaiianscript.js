document.addEventListener('DOMContentLoaded', () => {
    // 1. Floating Reservation Button Logic
    const floatingBtn = document.getElementById('floating-btn-wrap');
    const heroSection = document.getElementById('hero_view');

    const handleScroll = () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom < 0) {
            floatingBtn.classList.add('show');
        } else {
            floatingBtn.classList.remove('show');
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    // 2. Parallax Monstera Leaves Logic
    const parallaxContainer = document.getElementById('parallax-container');
    const template = document.getElementById('monstera-template');
    
    const leavesConfig = [
        { x: 5, y: 15, size: 120, speed: 0.2, rotate: 15 },
        { x: 80, y: 30, size: 180, speed: 0.4, rotate: -20 },
        { x: 10, y: 60, size: 100, speed: 0.15, rotate: 45 },
        { x: 75, y: 80, size: 150, speed: 0.35, rotate: -10 }
    ];

    const leafElements = [];

    // Create leaf elements
    leavesConfig.forEach(config => {
        const clone = template.content.cloneNode(true);
        const svgElement = clone.querySelector('.monstera-svg');
        const wrapper = document.createElement('div');
        wrapper.className = 'leaf';
        
        wrapper.style.left = `${config.x}vw`;
        wrapper.style.top = `${config.y}vh`;
        wrapper.style.width = `${config.size}px`;
        wrapper.style.height = `${config.size}px`;
        wrapper.style.transform = `rotate(${config.rotate}deg)`;
        
        wrapper.appendChild(svgElement);
        parallaxContainer.appendChild(wrapper);
        
        leafElements.push({
            el: wrapper,
            config: config,
            baseTransform: `rotate(${config.rotate}deg)`
        });
    });

    // Handle Parallax Scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                leafElements.forEach(item => {
                    const yPos = -(scrolled * item.config.speed);
                    item.el.style.transform = `${item.baseTransform} translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を解除する
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
