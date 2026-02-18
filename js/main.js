// ============================================
// YouTube Tags Generator - Main Script
// ============================================

// Component Loading
async function loadComponent(componentPath, targetSelector) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    const target = document.querySelector(targetSelector);
    if (target) {
      target.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Initialize all components
async function initializeComponents() {
  await Promise.all([
    loadComponent('/public/components/header.html', '#header-container'),
    loadComponent('/public/components/footer.html', '#footer-container'),
    loadComponent('/public/components/tools-nav.html', '#tools-container')
  ]);
  
  // Initialize features after components load
  initializeMobileMenu();
  initializeTagsGenerator();
  initializeFAQ();
  initializeScrollAnimations();
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

// Tags Generator Functionality
function initializeTagsGenerator() {
  const generateBtn = document.getElementById('generate-tags-btn');
  const videoInput = document.getElementById('video-input');
  const platformSelect = document.getElementById('platform-select');
  const tagsOutput = document.querySelector('.tags-output');
  const tagsList = document.querySelector('.tags-list');
  const copyBtn = document.querySelector('.copy-btn');
  
  if (generateBtn) {
    generateBtn.addEventListener('click', generateTags);
    if (videoInput) {
      videoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateTags();
      });
    }
  }
  
  function generateTags() {
    const topic = videoInput.value.trim();
    const platform = platformSelect ? platformSelect.value : 'youtube';
    
    if (!topic) {
      alert('Please enter a topic or keywords');
      return;
    }
    
    const tags = tagGenerator.generateTags(topic, platform);
    displayTags(tags);
  }
  
  function displayTags(tags) {
    tagsList.innerHTML = '';
    tags.forEach((tag, index) => {
      const tagElement = document.createElement('div');
      tagElement.className = 'tag';
      tagElement.textContent = '#' + tag;
      tagElement.style.animationDelay = `${index * 0.05}s`;
      tagsList.appendChild(tagElement);
    });
    
    if (copyBtn) {
      const tagsText = tags.map(t => '#' + t).join(' ');
      copyBtn.onclick = () => copyToClipboard(tagsText, copyBtn);
    }
    
    tagsOutput.classList.add('active');
  }
}

// FAQ Accordion
function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't open
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Scroll Animations
function initializeScrollAnimations() {
  const elements = document.querySelectorAll('[data-animation]');
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Smooth Scroll for Navigation Links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        smoothScroll(href.substring(1));
      }
    });
  });
});

// Newsletter form handling
function handleNewsletterSubmit(event) {
  if (event) {
    event.preventDefault();
  }
  
  const input = document.querySelector('.newsletter-form input');
  const button = document.querySelector('.newsletter-form button');
  
  if (input && input.value) {
    const email = input.value;
    
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    const originalText = button.textContent;
    button.textContent = '✓ Subscribed!';
    input.value = '';
    
    setTimeout(() => {
      button.textContent = originalText;
    }, 3000);
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeComponents();
});

// Handle newsletter form submission
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
});

// Scroll to top button
window.addEventListener('scroll', throttle(() => {
  // Add any scroll-based functionality here
}, 100));
