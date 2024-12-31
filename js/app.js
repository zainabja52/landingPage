document.addEventListener('DOMContentLoaded', function () {
    const navItems = [
        { id: 'home', text: 'Home' },
        { id: 'menu', text: 'Menu' },
        { id: 'order', text: 'Order' },
        { id: 'about', text: 'About' }
    ];

    const navContainer = document.querySelector('.center-nav');
    const ul = document.createElement('ul');
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${item.id}`;
        a.textContent = item.text;
        a.className = 'nav-link';
        a.setAttribute('aria-label', `Navigate to ${item.text}`); // Added for accessibility
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (!targetSection) {
                console.warn(`Section with ID ${this.getAttribute('href')} not found.`); // Added error handling
                return;
            }
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
        li.appendChild(a);
        ul.appendChild(li);
    });

    navContainer.appendChild(ul);

    const navLinks = document.querySelectorAll('.navbar .nav-link');

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

    function createStars() {
        const starsContainer = document.getElementById('stars');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const starCount = Math.min(100, Math.floor(windowWidth / 10)); // Improved performance
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * windowWidth}px`;
            star.style.top = `${Math.random() * windowHeight}px`;
            starsContainer.appendChild(star);
        }
    }

    window.addEventListener('load', createStars);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
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
});
