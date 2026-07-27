document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. HERO CAROUSEL CONTROLLER
  // ==========================================
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let currentIndex = 0;
  let slideInterval;
  const slideDuration = 6000; // 6 seconds per slide

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove('active');
      const video = slide.querySelector('video');
      if (video) {
        video.pause();
      }
    });

    // Handle index wrap around
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides[currentIndex].classList.add('active');

    // Play video if the active slide contains one
    const activeVideo = slides[currentIndex].querySelector('video');
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(e => console.log('Autoplay video failed or blocked:', e));
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  // Initialize Carousel
  if (slides.length > 0) {
    showSlide(0);

    slides.forEach((slide) => {
      const video = slide.querySelector('video');
      if (video) {
        video.removeAttribute('loop');
        video.addEventListener('ended', () => {
          nextSlide();
        });
      }
    });
  }

  // ==========================================
  // 2. SCROLL REVEAL (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing to maintain performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 3. WHY TRUST US - ACCORDION SCROLL LINKED REVEAL
  // ==========================================
  const whyTrustSection = document.getElementById('why-trust-section');
  const whyTrustItems = document.querySelectorAll('.why-trust-item');

  if (whyTrustSection && whyTrustItems.length > 0) {
    // Initial state: hide other items (index > 0)
    whyTrustItems.forEach((item, index) => {
      if (index > 0) {
        item.classList.add('collapsed');
      } else {
        item.classList.add('expanded'); // first one is always visible
      }
    });

    window.addEventListener('scroll', () => {
      const rect = whyTrustSection.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // When why-trust-section is within scroll view
      if (rect.top < viewHeight * 0.7 && rect.bottom > 200) {
        whyTrustItems.forEach((item, index) => {
          if (index > 0) {
            setTimeout(() => {
              item.classList.remove('collapsed');
              item.classList.add('expanded');
            }, (index - 1) * 150);
          }
        });
      } else {
        // Collapse items back when scrolled out (scrolling backward or forward past)
        if (rect.top > viewHeight || rect.bottom < 150) {
          whyTrustItems.forEach((item, index) => {
            if (index > 0) {
              item.classList.remove('expanded');
              item.classList.add('collapsed');
            }
          });
        }
      }
    });
  }

  // ==========================================
  // 4. ACTIVE LINK HIGHLIGHTER ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section, header[id]');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // Offset for sticky header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      if (link.classList.contains('nav-link')) {
        link.classList.remove('text-[#c5a880]', 'border-[#d4a672]');
        link.classList.add('text-[#334155]', 'border-transparent');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.remove('text-[#334155]', 'border-transparent');
          link.classList.add('text-[#c5a880]', 'border-[#d4a672]');
        }
      } else {
        link.classList.remove('text-burgundy-700', 'font-bold');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('text-burgundy-700', 'font-bold');
        }
      }
    });
  });

  // ==========================================
  // 5. INQUIRY FORM SUCCESS HANDLER
  // ==========================================
  const inquiryForm = document.getElementById('inquiry-form');
  const successToast = document.getElementById('success-toast');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values (can be used for further integration)
      const name = document.getElementById('inquiry-name').value;
      const email = document.getElementById('inquiry-email').value;
      const phone = document.getElementById('inquiry-phone').value;
      
      // Simulate form submission success
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Sending...`;
      
      setTimeout(() => {
        // Show custom success toast
        if (successToast) {
          successToast.classList.remove('translate-y-24', 'opacity-0');
          successToast.classList.add('translate-y-0', 'opacity-100');
          
          // Hide toast after 4 seconds
          setTimeout(() => {
            successToast.classList.remove('translate-y-0', 'opacity-100');
            successToast.classList.add('translate-y-24', 'opacity-0');
          }, 4000);
        }
        
        // Reset form
        inquiryForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }

  // ==========================================
  // 5.5 PROPERTY CARD IMAGE CAROUSEL / SLIDER
  // ==========================================
  const propertyCards = document.querySelectorAll('.property-card');

  const cardGalleries = [
    ['assets/images/plot-layout-1.jpg', 'assets/images/plot-layout-2.jpg', 'assets/images/plot-layout-3.jpg', 'assets/images/land-development.jpg'],
    ['assets/images/plot-layout-2.jpg', 'assets/images/plot-layout-1.jpg', 'assets/images/plot-layout-3.jpg', 'assets/images/about-property-management.jpg'],
    ['assets/images/plot-layout-3.jpg', 'assets/images/plot-layout-1.jpg', 'assets/images/plot-layout-2.jpg', 'assets/images/experience.jpg'],
    ['assets/images/land-development.jpg', 'assets/images/plot-layout-1.jpg', 'assets/images/plot-layout-2.jpg', 'assets/images/hero-1.jpg'],
    ['assets/images/about-property-management.jpg', 'assets/images/plot-layout-3.jpg', 'assets/images/plot-layout-1.jpg', 'assets/images/hero-3.jpg'],
    ['assets/images/hero-2.jpg', 'assets/images/plot-layout-1.jpg', 'assets/images/plot-layout-2.jpg', 'assets/images/hero-4.jpg']
  ];

  propertyCards.forEach((card, index) => {
    const prevBtn = card.querySelector('.card-prev-btn');
    const nextBtn = card.querySelector('.card-next-btn');
    const imgEl = card.querySelector('.property-slider-img');
    const dots = card.querySelectorAll('.dot-indicator');
    const gallery = cardGalleries[index % cardGalleries.length];

    let currentIndex = 0;

    function updateCardImage(newIndex) {
      if (!imgEl || !gallery.length) return;
      currentIndex = (newIndex + gallery.length) % gallery.length;

      imgEl.style.opacity = '0.4';
      imgEl.src = gallery[currentIndex];
      setTimeout(() => {
        imgEl.style.opacity = '1';
      }, 200);

      dots.forEach((dot, dotIdx) => {
        if (dotIdx === currentIndex) {
          dot.classList.add('opacity-100');
          dot.classList.remove('opacity-40');
        } else {
          dot.classList.remove('opacity-100');
          dot.classList.add('opacity-40');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCardImage(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCardImage(currentIndex + 1);
      });
    }
  });

  // ==========================================
  // 5.6 BUILT ON EXPERIENCE AUTOMATIC IMAGE CAROUSEL (1 SECOND FAST CYCLE)
  // ==========================================
  const trustImages = document.querySelectorAll('.trust-carousel-img');
  if (trustImages.length > 0) {
    let trustIndex = 0;
    setInterval(() => {
      trustImages[trustIndex].classList.add('opacity-0');
      trustImages[trustIndex].classList.remove('opacity-100');
      trustIndex = (trustIndex + 1) % trustImages.length;
      trustImages[trustIndex].classList.remove('opacity-0');
      trustImages[trustIndex].classList.add('opacity-100');
    }, 1000); // 1 second rapid change
  }

  // ==========================================
  // 6. MOBILE MENU TOGGLE
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ==========================================
  // DYNAMIC NAVBAR SCROLL BEHAVIOR
  // ==========================================
  const mainHeader = document.getElementById('main-header');
  const heroSection = document.getElementById('home');

  if (mainHeader && heroSection) {
    function updateHeaderStyle() {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      // When scrolling through hero video section: solid white background
      if (heroBottom > 80) {
        mainHeader.classList.remove('bg-white/85', 'backdrop-blur-md', 'border-white/40');
        mainHeader.classList.add('bg-white', 'border-gray-100');
      } else {
        // When scrolled past hero into About/Services: glassy blur effect
        mainHeader.classList.remove('bg-white', 'border-gray-100');
        mainHeader.classList.add('bg-white/85', 'backdrop-blur-md', 'border-white/40');
      }
    }

    window.addEventListener('scroll', updateHeaderStyle);
    updateHeaderStyle(); // Initial execution
  }

  // ==========================================
  // SERVICE CARDS 3D FLIP ON TOUCH / CLICK
  // ==========================================
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Toggle 3D flip class for touch interaction
      card.classList.toggle('flipped');
    });
  });
});
