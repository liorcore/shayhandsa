document.addEventListener('DOMContentLoaded', () => {
    // Load Contact Content
    fetch('./components/contact.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contact-container').innerHTML = data;
            initContact();
        })
        .catch(error => console.error('Error loading contact section:', error));
});

function initContact() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal-right, .reveal-left, .reveal-up').forEach((el) => {
        observer.observe(el);
    });

    // Form Handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    }
} 