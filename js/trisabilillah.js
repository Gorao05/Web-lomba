document.addEventListener('DOMContentLoaded', function() {
    
    // --- Elemen-elemen Penting ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('#nav-mobile');
    const mainContent = document.querySelector('main');
    const ppdbPage = document.querySelector('#ppdb-page');
    const showPpdbButtons = document.querySelectorAll('.js-show-ppdb');
    const backToMainButtons = document.querySelectorAll('.js-back-to-main');
    const footer = document.querySelector('footer');

    // --- Logika Buka/Tutup Halaman PPDB ---
    function showPpdbPage() {
        mainContent.style.display = 'none';
        footer.style.display = 'none';
        ppdbPage.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Tutup menu mobile jika terbuka
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

    showPpdbButtons.forEach(button => {
        button.addEventListener('click', showPpdbPage);
    });

    backToMainButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showMainPage();
        });
    });

    // --- Navbar & Mobile Menu Toggle ---
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('nav-active');
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        mobileNav.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', function() {
                 if (!this.classList.contains('js-show-ppdb')) {
                    showMainPage(); 
                    mobileNav.classList.remove('nav-active');
                    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
    
    // --- Animasi Scroll ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('is-visible'), delay);
                obs.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});
    scrollElements.forEach(el => io.observe(el));

    // --- Typing Effect ---
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const words = ["Unggul", "Cerdas", "Kreatif", "Berkarakter"];
        let w = 0, letter = 0, deleting = false;
        const typeSpeed = 100, deleteSpeed = 60, pauseAfterType = 1500, pauseAfterDelete = 500;

        function tick() {
            const current = words[w];
            if (!deleting) {
                typingElement.textContent = current.slice(0, ++letter);
                if (letter === current.length) { deleting = true; setTimeout(tick, pauseAfterType); return; }
                setTimeout(tick, typeSpeed);
            } else {
                typingElement.textContent = current.slice(0, --letter);
                if (letter === 0) { deleting = false; w = (w + 1) % words.length; setTimeout(tick, pauseAfterDelete); return; }
                setTimeout(tick, deleteSpeed);
            }
        }
        tick();
    }

    // --- Tombol Kembali ke Atas ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.pageYOffset > 400);
        });
        backToTopButton.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // --- Scrollspy ---
    const sections = document.querySelectorAll('main section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-links a:not(.ppdb-button)');
    
    window.addEventListener('scroll', () => {
        let current = 'hero'; // Default to hero
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 85) { 
                current = section.getAttribute('id');
            }
        });

        desktopNavLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });


    // --- Particles.js ---
    if (typeof particlesJS !== 'undefined') {
        const isSmall = window.matchMedia('(max-width:768px)').matches;
        particlesJS('particles-js', {
            particles: {
                number: { value: isSmall ? 30 : 90, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.2, sync: false } },
                size: { value: isSmall ? 3 : 4, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.5, width: 1.5 },
                move: { enable: true, speed: isSmall ? 1.5 : 2.5, direction: "none", out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true },
                modes: { grab: { distance: 150, line_linked: { opacity: 1 } } }
            },
            retina_detect: true
        });
    }

    // --- Inisialisasi Swiper Sliders ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.news-slider', { slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 4500, disableOnInteraction: false }, pagination: { el: '.news-slider .swiper-pagination', clickable: true }, navigation: { nextEl: '.news-slider .swiper-button-next', prevEl: '.news-slider .swiper-button-prev' }, breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }, });
        new Swiper('.program-slider', { slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 5000, disableOnInteraction: false }, pagination: { el: '.program-slider .swiper-pagination', clickable: true }, navigation: { nextEl: '.program-slider .swiper-button-next', prevEl: '.program-slider .swiper-button-prev' }, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }, });
        new Swiper('.testimonial-slider', { slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 4000, disableOnInteraction: false }, pagination: { el: '.testimonial-slider .swiper-pagination', clickable: true }, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }, });
    }

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        if(preloader) preloader.classList.add('hidden');
    });

    // --- AI Live Chat Logic ---
    const chatWidget = document.getElementById('chat-widget');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatCloseButton = document.getElementById('chat-close-button');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    const schoolInfo = `
        Anda adalah asisten virtual yang ramah dan sangat membantu untuk Sekolah Sabilillah. Tugas Anda adalah menjawab pertanyaan dari calon siswa atau orang tua. Gunakan informasi berikut untuk menjawab pertanyaan. Selalu jawab dalam Bahasa Indonesia yang sopan dan bersahabat. Jika Anda tidak tahu jawabannya, sarankan pengguna untuk menghubungi nomor telepon sekolah di (0341) 488-808.

        Informasi Kunci Sekolah:
        - Nama Sekolah: Sekolah Sabilillah
        - Lokasi: Jl. Ikan Kakap No.1 B, Tunjungsekar, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142
        - Telepon: (0341) 488-808
        - WhatsApp PPDB: 0812-3456-7890
        - Jam Operasional Kantor: Senin - Jumat, 08.00 - 16.00 WIB
        - Jadwal Pendaftaran (PPDB) 2025/2026:
            - Gelombang 1: 1 November 2024 - 31 Januari 2025
            - Gelombang 2: 1 Februari 2025 - 31 Maret 2025 (jika kuota masih tersedia)
        - Keunggulan Utama: Kurikulum Terpadu, Guru Profesional, Lingkungan Belajar Positif, Pembinaan Karakter & Akhlak.
        - Program Unggulan: Kelas Robotik & Coding, Kelas Bilingual, Sains & Penelitian Muda, Tahfidz Al-Qur'an.
    `;

    let chatHistory = [{
        role: "user",
        parts: [{ text: schoolInfo }]
    }, {
        role: "model",
        parts: [{ text: "Baik, saya mengerti. Saya adalah asisten virtual Sekolah Sabilillah. Saya siap membantu menjawab pertanyaan." }]
    }];

    const toggleChat = () => {
        chatWidget.classList.toggle('visible');
        if (chatWidget.classList.contains('visible') && chatMessages.children.length === 0) {
            addMessage('ai', 'Halo! Ada yang bisa saya bantu seputar Sekolah Sabilillah?');
        }
    };

    chatToggleButton.addEventListener('click', toggleChat);
    chatCloseButton.addEventListener('click', toggleChat);

    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        let typingIndicator = chatMessages.querySelector('.typing');
        if (!typingIndicator) {
            typingIndicator = document.createElement('div');
            typingIndicator.classList.add('chat-message', 'ai', 'typing');
            typingIndicator.textContent = 'Asisten sedang mengetik...';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function removeTypingIndicator() {
        const typingIndicator = chatMessages.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async function getAiResponseWithRetry(prompt, retries = 3, delay = 1000) {
        showTypingIndicator();
        
        const currentHistory = [...chatHistory, { role: "user", parts: [{ text: prompt }] }];

        try {
            const payload = { contents: currentHistory };
            const apiKey = "AIzaSyC0nU5kudyQJpdxpSlLGIbwRgZ24jqyvGY"; // API key is handled by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                 if (response.status >= 500 && retries > 0) {
                    await new Promise(res => setTimeout(res, delay));
                    return getAiResponseWithRetry(prompt, retries - 1, delay * 2);
                }
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            
            removeTypingIndicator();

            if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts) {
                const aiText = result.candidates[0].content.parts[0].text;
                addMessage('ai', aiText);
                // Update the main chat history
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                chatHistory.push({ role: "model", parts: [{ text: aiText }] });
            } else {
                addMessage('ai', 'Maaf, saya tidak dapat memproses permintaan itu. Bisakah Anda bertanya dengan cara lain?');
                console.warn('AI response was valid but missing content.', result);
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            if (retries > 0) {
                await new Promise(res => setTimeout(res, delay));
                return getAiResponseWithRetry(prompt, retries - 1, delay * 2);
            } else {
                removeTypingIndicator();
                addMessage('ai', 'Maaf, terjadi kesalahan koneksi. Mohon hubungi kami melalui telepon di (0341) 488-808 untuk informasi lebih lanjut.');
            }
        }
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = chatInput.value.trim();
        if (userInput) {
            addMessage('user', userInput);
            getAiResponseWithRetry(userInput);
            chatInput.value = '';
        }
    });
});
