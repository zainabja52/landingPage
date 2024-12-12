document.addEventListener('DOMContentLoaded', function () {
    // Navigation items configuration
    const navItems = [
        { id: 'home', text: 'Home' },
        { id: 'menu', text: 'Menu' },
        { id: 'order', text: 'Order' },
        { id: 'about', text: 'About' }
    ];

    // Create and append navigation items dynamically
    const navContainer = document.querySelector('.center-nav');
    navItems.forEach(item => {
        const a = document.createElement('a');
        a.href = `#${item.id}`;
        a.textContent = item.text;
        a.className = 'nav-link';
        a.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default anchor click behavior
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
            }
        });
        navContainer.appendChild(a);

    });

    // Retrieve all nav links after they have been dynamically added
    const navLinks = document.querySelectorAll('.navbar a');

    // Functionality to toggle burger images
    const burgerImages = document.querySelectorAll('.burger img');
    const toggleImages = document.querySelectorAll('.burger-toggle img');
    let currentIndex = 0;

    toggleImages[currentIndex].classList.add('active');

    burgerImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            toggleImages.forEach(toggleImg => toggleImg.classList.remove('active'));
            toggleImages[currentIndex].classList.add('active');
            toggleImages[currentIndex].src = burgerImages[index].src;
            currentIndex = (currentIndex + 1) % toggleImages.length;
        });
    });

    // Functionality to create twinkling stars
    function createStars() {
        const starsContainer = document.getElementById('stars');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * windowWidth}px`;
            star.style.top = `${Math.random() * windowHeight}px`;
            starsContainer.appendChild(star);
        }
    }

    window.addEventListener('load', createStars);

    // Function to activate section based on viewport
    function activateSection() {
        let found = false; // This flag will prevent multiple sections from being marked active
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150 && !found) {
                const activeId = '#' + section.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === activeId) {
                        link.classList.add('active');
                    }
                });
                found = true; // Mark as found to prevent activating multiple sections
            }
        });
        if (!found) navLinks.forEach(link => link.classList.remove('active')); // If no section is active, remove all
    }

    // Manage active state on scroll
    window.addEventListener('scroll', activateSection);
    activateSection(); // Initialize on page load
});
