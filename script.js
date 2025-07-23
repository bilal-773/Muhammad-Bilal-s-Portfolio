const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// Mobile menu toggle
const nav = document.querySelector('nav');
if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Smooth scroll for navigation links
navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        // Smooth scroll to section if anchor
        const section = sections[idx];
        if (section) {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        }
        // Mobile menu: close after click
        nav.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        // Active page logic
        if (!link.classList.contains('active')) {
            activePage();
            link.classList.add('active');
            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

// Portfolio arrows: clamp index and disable appropriately for mobile
const updatePortfolioArrows = () => {
    const total = document.querySelectorAll('.portfolio-detail').length;
    arrowLeft.classList.toggle('disabled', index <= 0);
    arrowRight.classList.toggle('disabled', index >= total - 1);
};

arrowRight.addEventListener('click', () => {
    const total = document.querySelectorAll('.portfolio-detail').length;
    if (index < total - 1) {
        index++;
    }
    updatePortfolioArrows();
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
    }
    updatePortfolioArrows();
    activePortfolio();
});

// Initialize arrow state on load
updatePortfolioArrows();

// Contact form validation and feedback
const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, textarea');
        let valid = true;
        let firstInvalid = null;
        inputs.forEach(input => {
            input.classList.remove('invalid');
            if (!input.value.trim()) {
                input.classList.add('invalid');
                valid = false;
                if (!firstInvalid) firstInvalid = input;
            } else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
                input.classList.add('invalid');
                valid = false;
                if (!firstInvalid) firstInvalid = input;
            }
        });
        let feedback = contactForm.querySelector('.form-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'form-feedback';
            contactForm.appendChild(feedback);
        }
        if (!valid) {
            feedback.textContent = 'Please fill out all fields correctly.';
            feedback.style.color = '#ff4d4f';
            if (firstInvalid) firstInvalid.focus();
        } else {
            feedback.textContent = 'Message sent successfully! (Demo only)';
            feedback.style.color = '#58A6FF';
            contactForm.reset();
        }
    });
}
