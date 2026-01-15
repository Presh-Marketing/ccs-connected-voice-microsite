// Custom Computer Specialists - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');
  const header = document.querySelector('.header');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function() {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
      mainNav.setAttribute('aria-hidden', isExpanded);
      menuBtn.classList.toggle('active');
    });
  }
  
  // Header scroll effect
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe service cards and other elements
  document.querySelectorAll('.service-card, .testimonial-card, .resource-card, .partner-logo').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
  });
});
