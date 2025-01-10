document.addEventListener('DOMContentLoaded', () => {
    // Load Hero Content
    fetch('./components/hero.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('hero-container').innerHTML = data;
            initHero();
        })
        .catch(error => console.error('Error loading hero section:', error));
});

function initHero() {
    // GSAP Animation Timeline
    const heroTimeline = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });
    
    heroTimeline
        .to('.hero-title', { 
            opacity: 1, 
            y: 0,
            duration: 1.2
        })
        .to('.hero-subtitle', { 
            opacity: 1, 
            y: 0 
        }, '-=0.8')
        .to('.hero-cta', { 
            opacity: 1, 
            y: 0 
        }, '-=0.6')
        .to('.hero-scroll', { 
            opacity: 0.5,
            duration: 0.5
        }, '-=0.3');

    // Parallax Effect on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const limit = hero.offsetHeight;
        
        if (scrolled <= limit) {
            gsap.to('.hero iframe', {
                y: scrolled * 0.5,
                duration: 0.1
            });
        }
    });
} 