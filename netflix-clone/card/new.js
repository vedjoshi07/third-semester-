// JavaScript for Tech Fest Website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Register button animation
    const registerBtn = document.querySelector('button');
    if (registerBtn) {
        registerBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });

        registerBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        registerBtn.addEventListener('click', function() {
            alert('Registration for Tech Fest 2024 will open soon! Stay tuned!');
        });
    }

    // Add animation to event cards
    const eventCards = document.querySelectorAll('#events > div > div');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Update copyright year dynamically
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Tech Fest. All rights reserved.`;
    }
});

// Function to handle form submission (if forms are added later)
function handleFormSubmission(event) {
    event.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted!');
}
