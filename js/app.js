document.addEventListener('DOMContentLoaded', function () {
    // Navigation items configuration
    const navItems = [
        { id: 'home', text: 'Home' },
        { id: 'menu', text: 'Menu' },
        { id: 'order', text: 'Order' },
        { id: 'about', text: 'About' }
    ];

    // Create and append navigation items dynamically as an unordered list
    const navContainer = document.querySelector('.center-nav');
    const ul = document.createElement('ul'); // Create an unordered list

    navItems.forEach(item => {
        const li = document.createElement('li'); // Create a list item
        const a = document.createElement('a'); // Create a link
        a.href = `#${item.id}`;
        a.textContent = item.text;
        a.className = 'nav-link';
        a.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
            }
        });
        li.appendChild(a); // Append link to list item
        ul.appendChild(li); // Append list item to the unordered list
    });

    navContainer.appendChild(ul); // Append the unordered list to the navigation container

    // Retrieve all nav links after they have been dynamically added
    const navLinks = document.querySelectorAll('.navbar .nav-link');

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

    // Function to activate section based on viewport using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Adjust threshold to activate section when 70% of it is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    // Initialize the active state on page load
    const firstSection = document.querySelector('section');
    if (firstSection) {
        const firstNavLink = document.querySelector(`.navbar a[href="#${firstSection.id}"]`);
        if (firstNavLink) firstNavLink.classList.add('active');
    }
});
