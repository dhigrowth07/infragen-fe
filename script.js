document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. HERO 7-IMAGE CARD CAROUSEL & VIDEO MODAL CONTROLLER
  // ==========================================
  const heroCardSlides = document.querySelectorAll('.hero-card-slide');
  const dotsContainer = document.getElementById('hero-carousel-dots');
  let currentCardIndex = 0;

  if (heroCardSlides.length > 0) {
    // Populate Dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      heroCardSlides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'w-6 bg-[#c5a880]' : 'bg-white/50'}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => setHeroCardSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }

    function setHeroCardSlide(index) {
      heroCardSlides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
          slide.style.opacity = '1';
        } else {
          slide.classList.remove('active');
          slide.style.opacity = '0';
        }
      });

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, idx) => {
          if (idx === index) {
            dot.className = 'w-6 h-2 rounded-full bg-[#c5a880] transition-all duration-300';
          } else {
            dot.className = 'w-2 h-2 rounded-full bg-white/50 transition-all duration-300';
          }
        });
      }
      currentCardIndex = index;
    }

    // Auto rotate every 2.0 seconds for a pleasant, smooth pace
    setInterval(() => {
      const nextIndex = (currentCardIndex + 1) % heroCardSlides.length;
      setHeroCardSlide(nextIndex);
    }, 2000);
  }

  // Video Popup Modal Controller
  const openVideoBtn = document.getElementById('open-video-modal');
  const closeVideoBtn = document.getElementById('close-video-modal');
  const videoModal = document.getElementById('hero-video-modal');
  const modalVideoPlayer = document.getElementById('modal-video-player');

  function openVideoModal() {
    if (videoModal && modalVideoPlayer) {
      videoModal.classList.remove('opacity-0', 'pointer-events-none');
      modalVideoPlayer.currentTime = 0;
      modalVideoPlayer.play().catch(e => console.log('Video play error:', e));
      document.body.style.overflow = 'hidden';
    }
  }

  function closeVideoModal() {
    if (videoModal && modalVideoPlayer) {
      videoModal.classList.add('opacity-0', 'pointer-events-none');
      modalVideoPlayer.pause();
      document.body.style.overflow = '';
    }
  }

  if (openVideoBtn) openVideoBtn.addEventListener('click', openVideoModal);
  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
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
  // 2B. END-TO-END PROCESS PROGRESSIVE DRAW CONTROLLER
  // ==========================================
  const processSection = document.getElementById('process');
  const drawLine = document.getElementById('serpentine-main-path') || document.querySelector('.serpentine-draw-line');
  const pathTip = document.getElementById('serpentine-path-tip');
  const processNodes = document.querySelectorAll('.process-step-node');

  if (processSection && drawLine) {
    const totalLength = drawLine.getTotalLength ? drawLine.getTotalLength() : 2146;
    drawLine.style.strokeDasharray = totalLength;
    drawLine.style.strokeDashoffset = totalLength;

    // Relative progress thresholds along path for Steps 1-8
    const stepThresholds = [0.037, 0.154, 0.270, 0.387, 0.613, 0.730, 0.846, 0.963];
    let animationStarted = false;

    function runSerpentineAnimation() {
      const startTime = performance.now();
      const duration = 8000; // 8.0 seconds relaxed smooth draw time (decreased arrow speed)

      function animateStep(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const distance = totalLength * progress;

        // Update SVG stroke-dashoffset synchronously with progress
        drawLine.style.strokeDashoffset = totalLength * (1 - progress);

        // Update Moving Path Tip position & rotation angle around U-turn curve
        if (pathTip && drawLine.getPointAtLength) {
          const pt = drawLine.getPointAtLength(distance);
          const ptNext = drawLine.getPointAtLength(Math.min(distance + 2, totalLength));
          const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

          pathTip.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
        }

        // Reveal step simultaneously when line tip touches its threshold
        processNodes.forEach((node, index) => {
          if (progress >= stepThresholds[index]) {
            node.classList.add('step-visible');
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animateStep);
        }
      }

      requestAnimationFrame(animateStep);
    }

    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          processSection.classList.add('process-active');
          runSerpentineAnimation();
          processObserver.unobserve(processSection);
        }
      });
    }, { threshold: 0.25 });

    processObserver.observe(processSection);
  }

  // ==========================================
  // 3. WHY CHOOSE US - HORIZONTAL SCROLL CAROUSEL TRACK
  // ==========================================
  const scrollTrack = document.getElementById('why-choose-scroll-track');
  const prevBtn = document.getElementById('why-choose-prev-btn');
  const nextBtn = document.getElementById('why-choose-next-btn');

  if (scrollTrack && prevBtn && nextBtn) {
    const cardWidth = 380; // approximate width of card + gap

    prevBtn.addEventListener('click', () => {
      scrollTrack.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      scrollTrack.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
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
  // 5. INQUIRY FORM MAIL & CONTACT HANDLER
  // ==========================================
  const inquiryForm = document.getElementById('inquiry-form');
  const successToast = document.getElementById('success-toast');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('inquiry-name') ? document.getElementById('inquiry-name').value : '';
      const email = document.getElementById('inquiry-email') ? document.getElementById('inquiry-email').value : '';
      const phone = document.getElementById('inquiry-phone') ? document.getElementById('inquiry-phone').value : '';
      const messageEl = document.getElementById('inquiry-message') || document.getElementById('inquiry-msg');
      const customMsg = messageEl ? messageEl.value : '';

      const constantToEmail = 'srissa2006@gmail.com';
      const defaultMessage = "Hii! I'm interested can I know about more details";
      const finalMessage = customMsg && customMsg.trim() !== '' ? customMsg : defaultMessage;

      const subject = encodeURIComponent(`Property Inquiry from ${name || 'Client'} - Vizhi Infragen`);
      const body = encodeURIComponent(`${finalMessage}\n\n---\nClient Contact Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);

      const mailtoUrl = `mailto:${constantToEmail}?subject=${subject}&body=${body}`;

      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Opening Mail...`;
      }

      // Open user's default email application with prefilled fields
      window.location.href = mailtoUrl;

      setTimeout(() => {
        if (successToast) {
          successToast.classList.remove('translate-y-24', 'opacity-0');
          successToast.classList.add('translate-y-0', 'opacity-100');

          setTimeout(() => {
            successToast.classList.remove('translate-y-0', 'opacity-100');
            successToast.classList.add('translate-y-24', 'opacity-0');
          }, 4000);
        }

        inquiryForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1000);
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
  // 6. SIDE DRAWER TOGGLE (3-LINE MENU OVERLAY)
  // ==========================================
  const openDrawerBtn = document.getElementById('open-side-drawer');
  const closeDrawerBtn = document.getElementById('close-side-drawer');
  const sideDrawer = document.getElementById('side-drawer');
  const drawerOverlay = document.getElementById('side-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (sideDrawer && drawerOverlay) {
      sideDrawer.classList.remove('translate-x-full');
      drawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (sideDrawer && drawerOverlay) {
      sideDrawer.classList.add('translate-x-full');
      drawerOverlay.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // ==========================================
  // DYNAMIC NAVBAR OVERLAY (Transparent on Video -> Solid White on Cursor Hover or Scroll)
  // ==========================================
  const mainHeader = document.getElementById('main-header');

  if (mainHeader) {
    function updateHeaderStyle() {
      // Turns solid white immediately when user scrolls inside hero section (> 20px)
      if (window.scrollY > 20) {
        mainHeader.classList.add('is-scrolled');
      } else {
        mainHeader.classList.remove('is-scrolled');
      }
    }

    // Explicit cursor hover state handler (turns solid white when hovering navbar over video)
    mainHeader.addEventListener('mouseenter', () => {
      mainHeader.classList.add('is-hovered');
    });

    mainHeader.addEventListener('mouseleave', () => {
      mainHeader.classList.remove('is-hovered');
    });

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


