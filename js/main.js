/* ============================================================
   MAIN.JS — Invitación XV Años Rapunzel
   Countdown, Scroll Reveal, Parallax, Lanterns, Stars,
   Particles, Music Player, Invitation Open
   ============================================================ */

(function () {
    'use strict';

    // ——— CONFIG ———
    const CONFIG = {
        eventDate: '2026-11-14T20:00:00',
        lanternCount: 14,
        starCount: 80,
        particleCount: 25,
        revealThreshold: 0.15,
        parallaxSpeed: 0.3,
        whatsappNumber: '573133972380',
        whatsappMessage: '¡Hola! Confirmo mi asistencia a los XV de Givana Naiad. Soy [Tu nombre] y asistiré con [Número] pases.'
    };

    // ——— DOM READY ———
    document.addEventListener('DOMContentLoaded', () => {
        initInvitationOverlay();
        initCountdown();
        initScrollReveal();
        initParallax();
        generateStars();
        generateLanterns();
        generateParticles();
        initMusicPlayer();
        initRSVPForm();
        initWhatsAppButton();
        initSmoothScroll();
    });


    // ============================================================
    // INVITATION OVERLAY (Open button)
    // ============================================================
    function initInvitationOverlay() {
        const overlay = document.getElementById('invitationOverlay');
        const btnOpen = document.getElementById('btnOpenInvitation');
        const audio = document.getElementById('bgMusic');

        if (!overlay || !btnOpen) return;

        btnOpen.addEventListener('click', () => {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';

            // Try to play music (audio element or synthesized music box)
            playBackgroundMusic();

            // Trigger initial scroll reveals
            setTimeout(() => checkReveal(), 300);
        });

        // Lock scroll while overlay is visible
        document.body.style.overflow = 'hidden';
    }


    // ============================================================
    // COUNTDOWN TIMER
    // ============================================================
    function initCountdown() {
        const eventDate = new Date(CONFIG.eventDate).getTime();
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl) return;

        function update() {
            const now = Date.now();
            const diff = eventDate - now;

            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const d = Math.floor(diff / (86400000));
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);

            animateNumber(daysEl, d);
            animateNumber(hoursEl, h);
            animateNumber(minutesEl, m);
            animateNumber(secondsEl, s);
        }

        function animateNumber(el, value) {
            const str = String(value).padStart(2, '0');
            if (el.textContent !== str) {
                el.style.transform = 'rotateX(90deg)';
                el.style.opacity = '0.3';
                setTimeout(() => {
                    el.textContent = str;
                    el.style.transform = 'rotateX(0deg)';
                    el.style.opacity = '1';
                }, 200);
            }
        }

        update();
        setInterval(update, 1000);
    }


    // ============================================================
    // SCROLL REVEAL (IntersectionObserver)
    // ============================================================
    let revealObserver;

    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        if ('IntersectionObserver' in window) {
            revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: CONFIG.revealThreshold,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            // Fallback
            revealElements.forEach(el => el.classList.add('active'));
        }
    }

    function checkReveal() {
        const revealElements = document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active)');
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.88) {
                el.classList.add('active');
                if (revealObserver) revealObserver.unobserve(el);
            }
        });
    }


    // ============================================================
    // PARALLAX
    // ============================================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (parallaxElements.length === 0) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    parallaxElements.forEach(el => {
                        const speed = parseFloat(el.dataset.parallax) || CONFIG.parallaxSpeed;
                        const rect = el.parentElement.getBoundingClientRect();
                        const offset = (rect.top + window.pageYOffset) - scrollY;
                        el.style.transform = `translateY(${offset * speed * 0.3}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }


    // ============================================================
    // GENERATE STARS
    // ============================================================
    function generateStars() {
        const container = document.getElementById('starsContainer');
        if (!container) return;

        for (let i = 0; i < CONFIG.starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2.5 + 0.5;
            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                --twinkle-duration: ${2 + Math.random() * 4}s;
                --twinkle-delay: ${Math.random() * 5}s;
                opacity: ${0.3 + Math.random() * 0.5};
            `;
            container.appendChild(star);
        }
    }


    // ============================================================
    // GENERATE FLOATING LANTERNS
    // ============================================================
    function generateLanterns() {
        const container = document.getElementById('lanternsContainer');
        if (!container) return;

        for (let i = 0; i < CONFIG.lanternCount; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'lantern';
            const size = 0.7 + Math.random() * 0.6;
            lantern.style.cssText = `
                left: ${Math.random() * 100}%;
                --duration: ${9 + Math.random() * 8}s;
                --delay: ${Math.random() * 10}s;
                transform: scale(${size});
            `;
            container.appendChild(lantern);
        }
    }


    // ============================================================
    // GENERATE GOLDEN PARTICLES
    // ============================================================
    function generateParticles() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${50 + Math.random() * 50}%;
                --p-duration: ${6 + Math.random() * 8}s;
                --p-delay: ${Math.random() * 10}s;
            `;
            container.appendChild(particle);
        }
    }


    // ============================================================
    // MUSIC ENGINE (Audio Element + Fairy-tale Web Audio Synth Fallback)
    // ============================================================
    let audioCtx = null;
    let synthPlaying = false;
    let synthTimer = null;
    let synthGain = null;

    // Gentle fairy-tale music box melody (inspired by magical waltz / Tangled theme)
    // [noteName, durationInBeats, octave]
    const FAIRY_MELODY = [
        { f: 523.25, d: 1.0 }, // C5
        { f: 659.25, d: 1.0 }, // E5
        { f: 783.99, d: 1.5 }, // G5
        { f: 659.25, d: 0.5 }, // E5
        { f: 587.33, d: 1.0 }, // D5
        { f: 523.25, d: 1.5 }, // C5
        { f: 493.88, d: 0.5 }, // B4
        { f: 440.00, d: 2.0 }, // A4

        { f: 440.00, d: 1.0 }, // A4
        { f: 523.25, d: 1.0 }, // C5
        { f: 659.25, d: 1.5 }, // E5
        { f: 587.33, d: 0.5 }, // D5
        { f: 523.25, d: 1.0 }, // C5
        { f: 493.88, d: 1.0 }, // B4
        { f: 392.00, d: 2.0 }, // G4

        { f: 392.00, d: 1.0 }, // G4
        { f: 523.25, d: 1.0 }, // C5
        { f: 587.33, d: 1.0 }, // D5
        { f: 659.25, d: 1.5 }, // E5
        { f: 698.46, d: 0.5 }, // F5
        { f: 659.25, d: 1.0 }, // E5
        { f: 587.33, d: 1.0 }, // D5
        { f: 523.25, d: 2.0 }, // C5

        { f: 440.00, d: 1.0 }, // A4
        { f: 493.88, d: 1.0 }, // B4
        { f: 523.25, d: 2.0 }, // C5
        { f: 587.33, d: 1.0 }, // D5
        { f: 523.25, d: 2.5 }  // C5 (sustain)
    ];

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playMusicBoxChime(freq, time, duration) {
        if (!audioCtx) return;

        // Main sine oscillator
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Overtone oscillator for music box chime sparkle
        const overtone = audioCtx.createOscillator();
        const overtoneGain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2.01, time);

        // Envelope
        const attack = 0.005;
        const decay = duration * 0.9;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.18, time + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + attack + decay);

        overtoneGain.gain.setValueAtTime(0, time);
        overtoneGain.gain.linearRampToValueAtTime(0.04, time + attack);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, time + attack + (decay * 0.5));

        // Connect
        osc.connect(gain);
        overtone.connect(overtoneGain);
        gain.connect(synthGain || audioCtx.destination);
        overtoneGain.connect(synthGain || audioCtx.destination);

        osc.start(time);
        overtone.start(time);
        osc.stop(time + attack + decay);
        overtone.stop(time + attack + decay);
    }

    function startMusicBox() {
        const ctx = getAudioContext();
        if (!ctx) return;

        synthPlaying = true;
        const musicBtn = document.getElementById('musicToggle');
        if (musicBtn) musicBtn.classList.add('playing');

        if (!synthGain) {
            synthGain = ctx.createGain();
            synthGain.gain.setValueAtTime(0.6, ctx.currentTime);

            // Add subtle gentle delay for dreamlike reverb effect
            const delay = ctx.createDelay();
            delay.delayTime.value = 0.28;
            const delayGain = ctx.createGain();
            delayGain.gain.value = 0.25;

            synthGain.connect(delay);
            delay.connect(delayGain);
            delayGain.connect(delay);
            delayGain.connect(ctx.destination);
            synthGain.connect(ctx.destination);
        }

        let step = 0;
        const tempo = 0.55; // seconds per beat

        function scheduleNext() {
            if (!synthPlaying) return;

            const item = FAIRY_MELODY[step];
            const now = ctx.currentTime;
            playMusicBoxChime(item.f, now + 0.05, item.d * tempo);

            step = (step + 1) % FAIRY_MELODY.length;
            synthTimer = setTimeout(scheduleNext, item.d * tempo * 1000);
        }

        scheduleNext();
    }

    function stopMusicBox() {
        synthPlaying = false;
        if (synthTimer) {
            clearTimeout(synthTimer);
            synthTimer = null;
        }
        const musicBtn = document.getElementById('musicToggle');
        if (musicBtn) musicBtn.classList.remove('playing');
    }

    function playBackgroundMusic() {
        const audio = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicToggle');

        // Check if real audio source is present
        const hasSource = audio && (audio.src || (audio.querySelector('source') && audio.querySelector('source').src));

        if (hasSource) {
            audio.volume = 0.4;
            audio.play().then(() => {
                if (musicBtn) musicBtn.classList.add('playing');
            }).catch(() => {
                // If audio element failed or blocked, fall back to Web Audio music box
                startMusicBox();
            });
        } else {
            // Use fairytale music box synthesizer
            startMusicBox();
        }
    }

    function pauseBackgroundMusic() {
        const audio = document.getElementById('bgMusic');
        if (audio && !audio.paused) {
            audio.pause();
        }
        stopMusicBox();
    }

    function toggleBackgroundMusic() {
        const audio = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicToggle');
        const isAudioPlaying = audio && !audio.paused;

        if (isAudioPlaying || synthPlaying) {
            pauseBackgroundMusic();
            if (musicBtn) musicBtn.classList.remove('playing');
        } else {
            playBackgroundMusic();
        }
    }

    function initMusicPlayer() {
        const musicBtn = document.getElementById('musicToggle');
        if (!musicBtn) return;

        musicBtn.addEventListener('click', () => {
            toggleBackgroundMusic();
        });
    }


    // ============================================================
    // RSVP FORM
    // ============================================================
    function initRSVPForm() {
        const form = document.getElementById('rsvpForm');
        const successMsg = document.getElementById('rsvpSuccess');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // In production, send to a backend/API
            console.log('RSVP Data:', data);

            // Show success
            form.style.display = 'none';
            if (successMsg) {
                successMsg.classList.add('show');
            }
        });
    }


    // ============================================================
    // WHATSAPP BUTTON
    // ============================================================
    function initWhatsAppButton() {
        const waBtn = document.getElementById('whatsappBtn');
        if (!waBtn) return;

        const encodedMsg = encodeURIComponent(CONFIG.whatsappMessage);
        waBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;
    }


    // ============================================================
    // SMOOTH SCROLL (for anchor links)
    // ============================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

})();
