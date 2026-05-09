"use client";
import { useEffect, useRef } from 'react';

export default function ScrollAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Intersection Observer for reveal-on-scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Don't unobserve — let it re-animate if needed
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade'
    );
    revealElements.forEach((el) => observer.observe(el));

    // Stagger children animation
    const staggerGroups = document.querySelectorAll('[data-stagger]');
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, i) => {
              child.style.transitionDelay = `${i * 0.1}s`;
              child.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    staggerGroups.forEach((el) => staggerObserver.observe(el));

    // Animated counters
    const counterElements = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterElements.forEach((el) => counterObserver.observe(el));

    // Parallax on scroll + Progress bar
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    const handleScroll = () => {
      // Progress bar
      if (progressBar) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? (window.scrollY / h) * 100 : 0;
        progressBar.style.width = p + '%';
      }
      // Parallax
      if (parallaxElements.length > 0) {
        const scrollY = window.scrollY;
        parallaxElements.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.3;
          const rect = el.getBoundingClientRect();
          const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
          el.style.transform = `translateY(${-offset * 0.1}px)`;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Magnetic hover effect for buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.15s ease-out';
      });
    });

    // Tilt effect for cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `
          perspective(800px)
          rotateY(${x * 8}deg)
          rotateX(${-y * 8}deg)
          translateY(-4px)
          scale(1.02)
        `;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.15s ease-out';
      });
    });

    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}

function animateCounter(el) {
  const target = el.dataset.count;
  const isPercentage = target.includes('%');
  const hasX = target.includes('X') || target.includes('x');
  const hasPlus = target.includes('+');
  const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * numericValue);

    let display = current.toString();
    if (hasPlus) display += '+';
    if (isPercentage) display += '%';
    if (hasX) display += 'X';

    el.textContent = display;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
