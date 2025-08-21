"use strict";

// js/trisabilillah.js - improved, accessible, performance-minded
// Wrap all DOM manipulation in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  // --- Navbar & Mobile Menu Toggle ---
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  var ppdbButton = document.querySelector('.ppdb-button'); // Mengambil langsung tombol PPDB
  // Add null checks for critical elements

  if (!menuToggle || !navLinks || !ppdbButton) {
    console.error('ERROR: One or more critical navbar elements not found. Check HTML structure.'); // Prevent further script execution if elements are missing

    return;
  }

  menuToggle.addEventListener('click', function () {
    var isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('nav-active'); // Toggle PPDB button visibility on mobile

    if (window.innerWidth <= 768) {
      // Jika menu aktif, tampilkan tombol PPDB
      if (navLinks.classList.contains('nav-active')) {
        ppdbButton.style.display = 'flex'; // Menggunakan flex agar bisa di-center
      } else {
        ppdbButton.style.display = 'none';
      }
    }
  }); // Close menu when clicking outside on mobile

  document.addEventListener('click', function (e) {
    // Check if click is outside nav and menu is active on mobile
    if (window.innerWidth <= 768 && !e.target.closest('nav') && navLinks.classList.contains('nav-active')) {
      navLinks.classList.remove('nav-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      ppdbButton.style.display = 'none'; // Sembunyikan tombol PPDB saat menu tertutup
    }
  }); // Handle window resize to reset menu state for desktop

  function handleResize() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('nav-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      ppdbButton.style.display = 'block'; // Selalu tampilkan di desktop
    } else {
      // On mobile, hide PPDB button if menu is not active
      if (!navLinks.classList.contains('nav-active')) {
        ppdbButton.style.display = 'none';
      }
    }
  } // Debounce resize handler for performance


  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 200); // Adjust debounce time as needed
  }); // Initial call to handleResize to set correct state on load

  handleResize(); // --- Scroll Reveal (IntersectionObserver) ---

  var scrollElements = document.querySelectorAll('.animate-on-scroll');
  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(function () {
          return entry.target.classList.add('is-visible');
        }, delay);
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  }); // Threshold sedikit lebih tinggi

  scrollElements.forEach(function (el) {
    return io.observe(el);
  }); // --- Typing Effect (reliable & smooth) ---

  var typingElement = document.querySelector('.typing-effect');

  if (typingElement) {
    // Jeda setelah menghapus penuh
    var tick = function tick() {
      var current = words[w];

      if (!deleting) {
        // Typing
        typingElement.textContent = current.slice(0, letter + 1);
        letter++;

        if (letter === current.length) {
          deleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }

        setTimeout(tick, TYPING_SPEED);
      } else {
        // Deleting
        typingElement.textContent = current.slice(0, letter - 1);
        letter--;

        if (letter === 0) {
          deleting = false;
          w = (w + 1) % words.length; // Pindah ke kata berikutnya

          setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }

        setTimeout(tick, DELETING_SPEED);
      }
    };

    // Ensure element exists before trying to animate
    var words = ["Unggul", "Cerdas", "Kreatif", "Berkarakter"];
    var w = 0; // word index

    var letter = 0; // character index

    var deleting = false;
    var TYPING_SPEED = 100; // Kecepatan mengetik

    var DELETING_SPEED = 60; // Kecepatan menghapus

    var PAUSE_AFTER_TYPE = 1500; // Jeda setelah mengetik penuh

    var PAUSE_AFTER_DELETE = 500;
    tick(); // Start the typing effect
  } else {
    console.warn('Typing effect element (.typing-effect) not found.');
  } // --- Back to Top Button ---


  var backToTopButton = document.querySelector('.back-to-top');

  if (backToTopButton) {
    // Ensure element exists
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) backToTopButton.classList.add('visible'); // Muncul lebih cepat
      else backToTopButton.classList.remove('visible');
    });
    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } else {
    console.warn('Back to top button (.back-to-top) not found.');
  } // --- Scrollspy: highlight nav items on scroll ---


  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');
  var spyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      var link = document.querySelector(".nav-links a[href=\"#".concat(id, "\"]"));

      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          return a.classList.remove('active');
        });
        if (link) link.classList.add('active');
      }
    });
  }, {
    threshold: 0.45,
    // Sesuaikan threshold
    rootMargin: '-50px 0px -50px 0px' // Margin untuk akurasi

  });
  sections.forEach(function (s) {
    return spyObserver.observe(s);
  }); // --- Particles.js Initialization ---

  function initParticles() {
    try {
      // reduce particle count on small screens
      var isSmall = window.matchMedia('(max-width:768px)').matches;
      var count = isSmall ? 25 : 70; // Jumlah partikel lebih banyak

      var size = isSmall ? 2.5 : 3.5; // Ukuran partikel

      var distance = isSmall ? 100 : 160; // Jarak line linked

      if (typeof particlesJS !== 'undefined') {
        // Check if particlesJS is loaded
        particlesJS('particles-js', {
          particles: {
            number: {
              value: count,
              density: {
                enable: true,
                value_area: isSmall ? 700 : 900
              }
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: size,
              random: true,
              anim: {
                enable: false
              }
            },
            line_linked: {
              enable: true,
              distance: distance,
              color: "#ffffff",
              opacity: 0.35,
              width: 1.2
            },
            move: {
              enable: true,
              speed: isSmall ? 1.5 : 2.5,
              out_mode: "out",
              bounce: false
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 150,
                line_linked: {
                  opacity: 1
                }
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        });
      } else {
        console.warn('particlesJS function not found. Ensure particles.min.js is loaded.');
      }
    } catch (err) {
      console.error('Error initializing particles:', err);
    }
  } // Initialize particles after small delay (and only if lib loaded)
  // Use a timeout to give particles.min.js time to load if it's deferred


  setTimeout(initParticles, 500); // --- Swiper JS (for Aktivitas section) ---

  if (typeof Swiper !== 'undefined') {
    // Check if Swiper is loaded
    new Swiper('.news-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      // Loop carousel
      autoplay: {
        // Autoplay
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  } else {
    console.warn('Swiper.js library not loaded. Carousel will not function.');
  } // --- Optional: keyboard accessibility improvements ---


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('nav-active')) {
      navLinks.classList.remove('nav-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      ppdbButton.style.display = 'none'; // Hide PPDB button when menu closes
    }
  }); // --- Preloader ---

  var preloader = document.querySelector('.preloader');

  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 500); // Tambahkan jeda untuk transisi yang lebih halus
    });
  }
}); // DOMContentLoaded end