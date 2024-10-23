// Lazy loading images with alt text for accessibility
const images = document.querySelectorAll('img[loading="lazy"]');
images.forEach((image) => {
  const loadImage = () => {
    image.src = image.getAttribute('data-src');
  };

  image.onload = () => image.classList.add('loaded');
  image.onerror = () => console.error('Failed to load image:', image.src);
  if (image.complete) {
    loadImage();
  } else {
    image.addEventListener('load', loadImage);
  }
});

// Navigation click handler with debounced scrolling
const navLinks = document.querySelectorAll('nav a');
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    debounce(() => {
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }, 100)();
  });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load theme preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Service Worker with error handling
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
