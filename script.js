// ==========================================
// GLOBAL VIDEO POPUP MODAL CONTROLLERS
// ==========================================
window.openVideoModal = function() {
  const videoModal = document.getElementById('hero-video-modal');
  const modalVideoPlayer = document.getElementById('modal-video-player');
  if (videoModal) {
    videoModal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    videoModal.classList.add('flex');
    setTimeout(() => {
      videoModal.classList.remove('opacity-0', 'pointer-events-none');
    }, 10);
    if (modalVideoPlayer) {
      modalVideoPlayer.currentTime = 0;
      modalVideoPlayer.play().catch(e => console.log('Video play error:', e));
    }
    document.body.style.overflow = 'hidden';
  }
};

window.closeVideoModal = function() {
  const videoModal = document.getElementById('hero-video-modal');
  const modalVideoPlayer = document.getElementById('modal-video-player');
  if (videoModal) {
    videoModal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
    }, 300);
    if (modalVideoPlayer) {
      modalVideoPlayer.pause();
    }
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. HERO DAYLIGHT CAROUSEL CONTROLLER
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroPrevBtn = document.getElementById('hero-prev');
  const heroNextBtn = document.getElementById('hero-next');
  let currentHeroSlide = 0;
  let heroInterval = null;

  function setHeroSlide(index) {
    if (!heroSlides.length) return;
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, idx) => {
      if (idx === currentHeroSlide) {
        slide.classList.remove('opacity-0', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'z-0');
      }
    });

    heroDots.forEach((dot, idx) => {
      if (idx === currentHeroSlide) {
        dot.className = 'hero-dot w-9 h-2.5 rounded-full bg-[#c5a880] transition-all duration-300';
      } else {
        dot.className = 'hero-dot w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300';
      }
    });

    // Re-trigger text float-down and float-up animations on every slide change
    const animatedElements = document.querySelectorAll('#home .animate-float-down, #home .animate-float-up');
    animatedElements.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // trigger DOM reflow
      el.style.animation = '';
    });
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroInterval = setInterval(() => {
      setHeroSlide(currentHeroSlide + 1);
    }, 4500);
  }

  function stopHeroAutoplay() {
    if (heroInterval) clearInterval(heroInterval);
  }

  if (heroSlides.length > 0) {
    setHeroSlide(0);
    startHeroAutoplay();

    if (heroPrevBtn) {
      heroPrevBtn.addEventListener('click', () => {
        setHeroSlide(currentHeroSlide - 1);
        startHeroAutoplay();
      });
    }

    if (heroNextBtn) {
      heroNextBtn.addEventListener('click', () => {
        setHeroSlide(currentHeroSlide + 1);
        startHeroAutoplay();
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        setHeroSlide(idx);
        startHeroAutoplay();
      });
    });
  }

  const openVideoBtns = document.querySelectorAll('#open-hero-video, #open-hero-video-lg, #open-video-modal, .hero-play-btn');
  const closeVideoBtn = document.getElementById('close-video-modal');
  const videoModal = document.getElementById('hero-video-modal');

  openVideoBtns.forEach(btn => btn.addEventListener('click', window.openVideoModal));
  if (closeVideoBtn) closeVideoBtn.addEventListener('click', window.closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) window.closeVideoModal();
    });
  }
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) window.closeVideoModal();
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
  // 4. CONSTANT NAVBAR (Maintains #381e23 Luxury Brown Background Across All Sections)
  // ==========================================

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
  // CONSTANT SOLID LUXURY BROWN NAVBAR (#381e23)
  // ==========================================

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

  // ==========================================
  // STATS COUNTER ANIMATION
  // Only starts counting when user scrolls down to the stats bar
  // ==========================================
  (function() {
    var statsBar = document.getElementById('stats-counter-bar');
    var statCounters = document.querySelectorAll('.stat-counter');
    var hasAnimated = false;

    if (!statsBar || statCounters.length === 0) return;

    // Always reset to 0 on page load
    statCounters.forEach(function(el) {
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = '0' + suffix;
    });

    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 50 && rect.bottom > 50;
    }

    function countUp(el, target, suffix, delay) {
      setTimeout(function() {
        var current = 0;
        var stepTime = 30; // ms between each tick
        var timer = setInterval(function() {
          var remaining = target - current;
          var increment = Math.max(1, Math.ceil(remaining / 10));
          current = Math.min(current + increment, target);
          el.textContent = current + suffix;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          }
        }, stepTime);
      }, delay);
    }

    function startAnimation() {
      if (hasAnimated) return;
      hasAnimated = true;

      // Reset to 0 before animating
      statCounters.forEach(function(el) {
        var suffix = el.getAttribute('data-suffix') || '';
        el.textContent = '0' + suffix;
      });

      // Start each counter with a stagger
      statCounters.forEach(function(el, i) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        countUp(el, target, suffix, i * 250);
      });
    }

    // Listen on scroll — only trigger when stats bar enters the viewport
    function onScroll() {
      if (isInViewport(statsBar)) {
        startAnimation();
        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  // ==========================================
  // SERVICES AUTOMATIC CONTINUOUS MOVING & FLOATING TRACK
  // High-performance 60FPS smooth auto-scroll loop with pause-on-hover
  // ==========================================
  const servicesTrack = document.getElementById('services-track');
  const scrollLeftBtns = [
    document.getElementById('services-scroll-left'),
    document.getElementById('services-track-left')
  ];
  const scrollRightBtns = [
    document.getElementById('services-scroll-right'),
    document.getElementById('services-track-right')
  ];

  const marqueeTrack = document.querySelector('.infinite-marquee-track');

  if (marqueeTrack) {
    scrollLeftBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          marqueeTrack.style.animationPlayState = 'paused';
          servicesTrack.scrollBy({ left: -390, behavior: 'smooth' });
          setTimeout(() => {
            marqueeTrack.style.animationPlayState = 'running';
          }, 4000);
        });
      }
    });

    scrollRightBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          marqueeTrack.style.animationPlayState = 'paused';
          servicesTrack.scrollBy({ left: 390, behavior: 'smooth' });
          setTimeout(() => {
            marqueeTrack.style.animationPlayState = 'running';
          }, 4000);
        });
      }
    });
  }


});


