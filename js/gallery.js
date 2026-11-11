/* ============================================================
   GALLERY.JS — Invitación XV Años Rapunzel
   Carousel / Slider con navegación, dots, touch/swipe
   ============================================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
    });

    function initGallery() {
        const track = document.getElementById('galleryTrack');
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');
        const dotsContainer = document.getElementById('galleryDots');
        const thumbsContainer = document.getElementById('galleryThumbs');

        if (!track) return;

        const slides = track.querySelectorAll('.gallery-slide');
        const totalSlides = slides.length;
        let currentSlide = 0;
        let startX = 0;
        let isDragging = false;
        let autoPlayTimer = null;

        // ——— Create dots ———
        if (dotsContainer) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Foto ${i + 1}`);
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        // ——— Navigation buttons ———
        if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

        // ——— Touch/Swipe support ———
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                navigate(diff > 0 ? 1 : -1);
            }
            startAutoPlay();
        }, { passive: true });

        // ——— Mouse drag support ———
        track.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            track.style.cursor = 'grabbing';
            stopAutoPlay();
        });

        track.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            const diff = startX - e.clientX;

            if (Math.abs(diff) > 50) {
                navigate(diff > 0 ? 1 : -1);
            }
            startAutoPlay();
        });

        track.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                track.style.cursor = 'grab';
            }
        });

        // ——— Keyboard navigation ———
        track.setAttribute('tabindex', '0');
        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });

        // ——— Thumbnails ———
        if (thumbsContainer) {
            const thumbs = thumbsContainer.querySelectorAll('.gallery-thumb');
            thumbs.forEach((thumb, i) => {
                thumb.addEventListener('click', () => goToSlide(i));
            });
        }

        // ——— Core functions ———
        function navigate(direction) {
            const newSlide = currentSlide + direction;
            if (newSlide < 0) {
                goToSlide(totalSlides - 1);
            } else if (newSlide >= totalSlides) {
                goToSlide(0);
            } else {
                goToSlide(newSlide);
            }
        }

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update dots
            if (dotsContainer) {
                dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentSlide);
                });
            }

            // Update thumbnails
            if (thumbsContainer) {
                thumbsContainer.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === currentSlide);
                });
            }
        }

        // ——— Auto-play ———
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(() => navigate(1), 5000);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        // Initialize
        track.style.cursor = 'grab';
        startAutoPlay();

        // Pause autoplay when gallery is not visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startAutoPlay();
                    } else {
                        stopAutoPlay();
                    }
                });
            }, { threshold: 0.3 });

            const carousel = track.closest('.gallery-carousel');
            if (carousel) observer.observe(carousel);
        }
    }

})();
