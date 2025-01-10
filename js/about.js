document.addEventListener('DOMContentLoaded', () => {
    // Load About Content
    fetch('./components/about.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('about-container').innerHTML = data;
            initAbout();
        })
        .catch(error => console.error('Error loading about section:', error));
});

function initAbout() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left').forEach((el) => {
        observer.observe(el);
    });
} 