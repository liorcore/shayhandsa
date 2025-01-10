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
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with reveal classes
    document.querySelectorAll('.reveal-right, .reveal-left, .reveal-up').forEach((el) => {
        observer.observe(el);
    });

    // Form Handling
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: form.querySelector('input[placeholder="שם מלא"]').value,
            email: form.querySelector('input[type="email"]').value,
            phone: form.querySelector('input[type="tel"]').value,
            message: form.querySelector('textarea').value
        };

        // Validate form
        if (!validateForm(formData)) {
            showToast('אנא מלא את כל השדות', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
        submitBtn.disabled = true;

        fetch('https://script.google.com/macros/s/AKfycbyfL3Jv-nNyDAOd5mT2o-CtJQGkMAEZavOWa4Xwvjut-s-ZGWXW140yEpfbhMUaOuJu/exec', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        })
        .then(response => {
            if (response.type === 'opaque') {
                showToast('ההודעה נשלחה בהצלחה! ניצור איתך קשר בהקדם', 'success');
                showResponseMessage('success');
                form.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('אירעה שגיאה בשליחת הטופס', 'error');
            showResponseMessage('error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

function validateForm(data) {
    return Object.values(data).every(value => value.trim() !== '');
}

function showToast(message, type = 'success') {
    // Remove existing toast if exists
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-4 left-1/2 transform -translate-x-1/2 
                      px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3
                      ${type === 'success' ? 'bg-[#177F75]/95' : 'bg-red-500/95'}`;

    // Create icon element
    const icon = document.createElement('i');
    icon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-white text-xl`;
    toast.appendChild(icon);

    // Create text element
    const text = document.createElement('span');
    text.className = 'text-white text-sm font-medium';
    text.textContent = message;
    toast.appendChild(text);

    // Add to DOM
    document.body.appendChild(toast);

    // Slide in animation
    requestAnimationFrame(() => {
        toast.style.animation = 'slideInDown 0.5s ease forwards';
    });

    // Slide out animation
    setTimeout(() => {
        toast.style.animation = 'slideOutUp 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

function showResponseMessage(type) {
    const responseMessage = document.querySelector('.response-message');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');
    const form = document.querySelector('form');
    
    // מסתירים את שדות הטופס
    Array.from(form.elements).forEach(element => {
        if (element.type !== 'submit') {
            element.closest('.form-group')?.classList.add('opacity-0');
        }
    });
    
    // מציגים את ההודעה המתאימה
    responseMessage.classList.remove('hidden');
    if (type === 'success') {
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } else {
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }
}

function resetForm() {
    const form = document.querySelector('form');
    const responseMessage = document.querySelector('.response-message');
    const successMessage = document.querySelector('.success-message');
    
    // מסתירים את הודעת ההצלחה
    responseMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    
    // מאפסים את הטופס ומציגים את השדות
    form.reset();
    Array.from(form.elements).forEach(element => {
        if (element.type !== 'submit') {
            element.closest('.form-group')?.classList.remove('opacity-0');
        }
    });
}

function retrySubmission() {
    const form = document.querySelector('form');
    const responseMessage = document.querySelector('.response-message');
    const errorMessage = document.querySelector('.error-message');
    
    // מסתירים את הודעת השגיאה
    responseMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // מציגים את השדות שוב
    Array.from(form.elements).forEach(element => {
        if (element.type !== 'submit') {
            element.closest('.form-group')?.classList.remove('opacity-0');
        }
    });
} 