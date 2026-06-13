// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a, .btn-primary, .btn-outline').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash && hash.startsWith('#') && hash !== '#') {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Logo click to home
document.querySelector('.logo-container')?.addEventListener('click', () => {
  document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
});

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Message sent! I will get back to you soon.');
    contactForm.reset();
  });
}

// Add animation on scroll for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate project cards and other elements
document.querySelectorAll('.project-card, .edu-item, .exp-item, .cert-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

//sfsaasfa