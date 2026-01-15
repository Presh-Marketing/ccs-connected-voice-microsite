/**
 * CCS Connected Voice - Main JavaScript
 * Navigation, scroll effects, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===================================
  // Set Active Navigation State
  // ===================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.includes(linkPath) && linkPath !== '/') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      
      // If it's a dropdown link, also mark parent as active
      const parentNavItem = link.closest('.nav-item');
      if (parentNavItem) {
        const parentLink = parentNavItem.querySelector('.nav-link.has-dropdown');
        if (parentLink) {
          parentLink.classList.add('active');
        }
      }
    } else if (linkPath === '/' && currentPath === '/') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ===================================
  // Mobile Menu Toggle
  // ===================================
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
  
  // ===================================
  // Mobile Dropdown Toggle
  // ===================================
  const dropdownLinks = document.querySelectorAll('.nav-link.has-dropdown');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only handle on mobile
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const navItem = this.parentElement;
        navItem.classList.toggle('active');
      }
    });
  });
  
  // ===================================
  // Header Scroll Effect
  // ===================================
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
  
  // ===================================
  // Smooth Scroll for Anchor Links
  // ===================================
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
          
          // Close mobile menu if open
          if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
  
  // ===================================
  // Intersection Observer for Fade-in Animations
  // ===================================
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
  
  // Observe elements with fade-in class
  document.querySelectorAll('.fade-in, .product-card, .feature-card, .pricing-card').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
  });
  
  // ===================================
  // Close dropdown when clicking outside
  // ===================================
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.active').forEach(item => {
        item.classList.remove('active');
      });
    }
  });
  
  // ===================================
  // Handle window resize
  // ===================================
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 992 && mainNav) {
        mainNav.classList.remove('active');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    }, 250);
  });
});
