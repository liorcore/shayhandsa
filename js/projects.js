document.addEventListener('DOMContentLoaded', () => {
    // Load Projects Content
    fetch('./components/projects.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('projects-container').innerHTML = data;
            initProjects();
        })
        .catch(error => console.error('Error loading projects section:', error));
});

function initProjects() {
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