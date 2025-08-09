 // Mobile Navigation - Fixed JavaScript
    document.addEventListener('DOMContentLoaded', function() {
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
      const body = document.body;

      // Toggle mobile menu
      function toggleMobileMenu() {
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
          // Close menu
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          body.style.overflow = '';
        } else {
          // Open menu
          hamburger.classList.add('active');
          mobileMenu.classList.add('active');
          body.style.overflow = 'hidden';
        }
      }

      // Event listeners
      hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
      });

      // Close menu when clicking on mobile nav links
      mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          body.style.overflow = '';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
          if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
          }
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          body.style.overflow = '';
        }
      });

      // Handle window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          body.style.overflow = '';
        }
      });

      // Smooth scrolling for navigation links
      const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
      allNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });

      // Navbar scroll effect
      let lastScrollTop = 0;
      const navbar = document.querySelector('.navbar');

      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
          navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
          navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        
        lastScrollTop = scrollTop;
      });

      console.log('Mobile navigation initialized successfully!');
    });