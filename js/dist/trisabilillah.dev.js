"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // --- Elemen-elemen Penting ---
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('#nav-mobile');
  var mainContent = document.querySelector('main');
  var ppdbPage = document.querySelector('#ppdb-page');
  var showPpdbButtons = document.querySelectorAll('.js-show-ppdb');
  var backToMainButtons = document.querySelectorAll('.js-back-to-main');
  var footer = document.querySelector('footer'); // --- Logika Buka/Tutup Halaman PPDB ---

  function showPpdbPage() {
    mainContent.style.display = 'none';
    footer.style.display = 'none';
    ppdbPage.style.display = 'block';
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }); // Tutup menu mobile jika terbuka

    if (mobileNav.classList.contains('nav-active')) {
      mobileNav.classList.remove('nav-active');
      menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function showMainPage() {
    mainContent.style.display = 'block';
    footer.style.display = 'block';
    ppdbPage.style.display = 'none';
  }

  showPpdbButtons.forEach(function (button) {
    button.addEventListener('click', showPpdbPage);
  });
  backToMainButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      showMainPage();
    });
  }); // --- Navbar & Mobile Menu Toggle ---

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('nav-active');
      var icon = this.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    mobileNav.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function () {
        if (!this.classList.contains('js-show-ppdb')) {
          showMainPage();
          mobileNav.classList.remove('nav-active');
          menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  } // --- Animasi Scroll ---


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
    threshold: 0.1
  });
  scrollElements.forEach(function (el) {
    return io.observe(el);
  }); // --- Typing Effect ---

  var typingElement = document.querySelector('.typing-effect');

  if (typingElement) {
    var tick = function tick() {
      var current = words[w];

      if (!deleting) {
        typingElement.textContent = current.slice(0, ++letter);

        if (letter === current.length) {
          deleting = true;
          setTimeout(tick, pauseAfterType);
          return;
        }

        setTimeout(tick, typeSpeed);
      } else {
        typingElement.textContent = current.slice(0, --letter);

        if (letter === 0) {
          deleting = false;
          w = (w + 1) % words.length;
          setTimeout(tick, pauseAfterDelete);
          return;
        }

        setTimeout(tick, deleteSpeed);
      }
    };

    var words = ["Unggul", "Cerdas", "Kreatif", "Berkarakter"];
    var w = 0,
        letter = 0,
        deleting = false;
    var typeSpeed = 100,
        deleteSpeed = 60,
        pauseAfterType = 1500,
        pauseAfterDelete = 500;
    tick();
  } // --- Tombol Kembali ke Atas ---


  var backToTopButton = document.querySelector('.back-to-top');

  if (backToTopButton) {
    window.addEventListener('scroll', function () {
      backToTopButton.classList.toggle('visible', window.pageYOffset > 400);
    });
    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } // --- Scrollspy ---


  var sections = document.querySelectorAll('main section[id]');
  var desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-links a:not(.ppdb-button)');
  window.addEventListener('scroll', function () {
    var current = 'hero'; // Default to hero

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;

      if (pageYOffset >= sectionTop - 85) {
        current = section.getAttribute('id');
      }
    });
    desktopNavLinks.forEach(function (a) {
      a.classList.remove('active');

      if (a.getAttribute('href') === "#".concat(current)) {
        a.classList.add('active');
      }
    });
  }); // --- Particles.js ---

  if (typeof particlesJS !== 'undefined') {
    var isSmall = window.matchMedia('(max-width:768px)').matches;
    particlesJS('particles-js', {
      particles: {
        number: {
          value: isSmall ? 30 : 90,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.2,
            sync: false
          }
        },
        size: {
          value: isSmall ? 3 : 4,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.5,
          width: 1.5
        },
        move: {
          enable: true,
          speed: isSmall ? 1.5 : 2.5,
          direction: "none",
          out_mode: "out"
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
            enable: false
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 150,
            line_linked: {
              opacity: 1
            }
          }
        }
      },
      retina_detect: true
    });
  } // --- Inisialisasi Swiper Sliders ---


  if (typeof Swiper !== 'undefined') {
    new Swiper('.news-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.news-slider .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.news-slider .swiper-button-next',
        prevEl: '.news-slider .swiper-button-prev'
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
    new Swiper('.program-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.program-slider .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.program-slider .swiper-button-next',
        prevEl: '.program-slider .swiper-button-prev'
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
    new Swiper('.testimonial-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.testimonial-slider .swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  } // --- Preloader ---


  var preloader = document.querySelector('.preloader');
  window.addEventListener('load', function () {
    if (preloader) preloader.classList.add('hidden');
  }); // --- AI Live Chat Logic ---

  var chatWidget = document.getElementById('chat-widget');
  var chatToggleButton = document.getElementById('chat-toggle-button');
  var chatCloseButton = document.getElementById('chat-close-button');
  var chatForm = document.getElementById('chat-form');
  var chatInput = document.getElementById('chat-input');
  var chatMessages = document.getElementById('chat-messages');
  var schoolInfo = "\n        Anda adalah asisten virtual yang ramah dan sangat membantu untuk Sekolah Sabilillah. Tugas Anda adalah menjawab pertanyaan dari calon siswa atau orang tua. Gunakan informasi berikut untuk menjawab pertanyaan. Selalu jawab dalam Bahasa Indonesia yang sopan dan bersahabat. Jika Anda tidak tahu jawabannya, sarankan pengguna untuk menghubungi nomor telepon sekolah di (0341) 488-808.\n\n        Informasi Kunci Sekolah:\n        - Nama Sekolah: Sekolah Sabilillah\n        - Lokasi: Jl. Ikan Kakap No.1 B, Tunjungsekar, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142\n        - Telepon: (0341) 488-808\n        - WhatsApp PPDB: 0812-3456-7890\n        - Jam Operasional Kantor: Senin - Jumat, 08.00 - 16.00 WIB\n        - Jadwal Pendaftaran (PPDB) 2025/2026:\n            - Gelombang 1: 1 November 2024 - 31 Januari 2025\n            - Gelombang 2: 1 Februari 2025 - 31 Maret 2025 (jika kuota masih tersedia)\n        - Keunggulan Utama: Kurikulum Terpadu, Guru Profesional, Lingkungan Belajar Positif, Pembinaan Karakter & Akhlak.\n        - Program Unggulan: Kelas Robotik & Coding, Kelas Bilingual, Sains & Penelitian Muda, Tahfidz Al-Qur'an.\n    ";
  var chatHistory = [{
    role: "user",
    parts: [{
      text: schoolInfo
    }]
  }, {
    role: "model",
    parts: [{
      text: "Baik, saya mengerti. Saya adalah asisten virtual Sekolah Sabilillah. Saya siap membantu menjawab pertanyaan."
    }]
  }];

  var toggleChat = function toggleChat() {
    chatWidget.classList.toggle('visible');

    if (chatWidget.classList.contains('visible') && chatMessages.children.length === 0) {
      addMessage('ai', 'Halo! Ada yang bisa saya bantu seputar Sekolah Sabilillah?');
    }
  };

  chatToggleButton.addEventListener('click', toggleChat);
  chatCloseButton.addEventListener('click', toggleChat);

  function addMessage(sender, text) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    var typingIndicator = chatMessages.querySelector('.typing');

    if (!typingIndicator) {
      typingIndicator = document.createElement('div');
      typingIndicator.classList.add('chat-message', 'ai', 'typing');
      typingIndicator.textContent = 'Asisten sedang mengetik...';
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function removeTypingIndicator() {
    var typingIndicator = chatMessages.querySelector('.typing');

    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  function getAiResponseWithRetry(prompt) {
    var retries,
        delay,
        currentHistory,
        payload,
        apiKey,
        apiUrl,
        response,
        result,
        aiText,
        _args = arguments;
    return regeneratorRuntime.async(function getAiResponseWithRetry$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            retries = _args.length > 1 && _args[1] !== undefined ? _args[1] : 3;
            delay = _args.length > 2 && _args[2] !== undefined ? _args[2] : 1000;
            showTypingIndicator();
            currentHistory = [].concat(chatHistory, [{
              role: "user",
              parts: [{
                text: prompt
              }]
            }]);
            _context.prev = 4;
            payload = {
              contents: currentHistory
            };
            apiKey = "AIzaSyC0nU5kudyQJpdxpSlLGIbwRgZ24jqyvGY"; // API key is handled by the environment

            apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=".concat(apiKey);
            _context.next = 10;
            return regeneratorRuntime.awrap(fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            }));

          case 10:
            response = _context.sent;

            if (response.ok) {
              _context.next = 17;
              break;
            }

            if (!(response.status >= 500 && retries > 0)) {
              _context.next = 16;
              break;
            }

            _context.next = 15;
            return regeneratorRuntime.awrap(new Promise(function (res) {
              return setTimeout(res, delay);
            }));

          case 15:
            return _context.abrupt("return", getAiResponseWithRetry(prompt, retries - 1, delay * 2));

          case 16:
            throw new Error("API request failed with status ".concat(response.status));

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(response.json());

          case 19:
            result = _context.sent;
            removeTypingIndicator();

            if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts) {
              aiText = result.candidates[0].content.parts[0].text;
              addMessage('ai', aiText); // Update the main chat history

              chatHistory.push({
                role: "user",
                parts: [{
                  text: prompt
                }]
              });
              chatHistory.push({
                role: "model",
                parts: [{
                  text: aiText
                }]
              });
            } else {
              addMessage('ai', 'Maaf, saya tidak dapat memproses permintaan itu. Bisakah Anda bertanya dengan cara lain?');
              console.warn('AI response was valid but missing content.', result);
            }

            _context.next = 35;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](4);
            console.error("Error fetching AI response:", _context.t0);

            if (!(retries > 0)) {
              _context.next = 33;
              break;
            }

            _context.next = 30;
            return regeneratorRuntime.awrap(new Promise(function (res) {
              return setTimeout(res, delay);
            }));

          case 30:
            return _context.abrupt("return", getAiResponseWithRetry(prompt, retries - 1, delay * 2));

          case 33:
            removeTypingIndicator();
            addMessage('ai', 'Maaf, terjadi kesalahan koneksi. Mohon hubungi kami melalui telepon di (0341) 488-808 untuk informasi lebih lanjut.');

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 24]]);
  }

  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var userInput = chatInput.value.trim();

    if (userInput) {
      addMessage('user', userInput);
      getAiResponseWithRetry(userInput);
      chatInput.value = '';
    }
  });
});