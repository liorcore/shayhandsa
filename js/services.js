document.addEventListener('DOMContentLoaded', () => {
    // Load Services Content
    fetch('./components/services.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('services-container').innerHTML = data;
            initServices();
        })
        .catch(error => console.error('Error loading services section:', error));
});

function initServices() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal-up').forEach((el) => {
        observer.observe(el);
    });
} 