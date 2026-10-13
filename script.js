/**
 * Muhammed Adhil KS — DevOps Portfolio
 * Script: Terminal Typing Animation, Scrollspy, Mobile Drawer,
 * Background Dotted Globe Canvas, and Project Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Dynamic Footer Copyright Year
  // -------------------------------------------------------------------------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 2. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // -------------------------------------------------------------------------
  // 3. Navbar Scroll Shadow Effect
  // -------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // -------------------------------------------------------------------------
  // 4. Scrollspy Active Navigation Indicator
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // -------------------------------------------------------------------------
  // 5. Reveal on Scroll Animation (IntersectionObserver)
  // -------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  function checkImmediateVisibility() {
    const windowH = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowH * 1.15) {
        el.classList.add('revealed');
      }
    });
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
  } else {
    document.body.classList.add('js-loaded');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '100px 0px 100px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
    checkImmediateVisibility();
    setTimeout(checkImmediateVisibility, 100);
    window.addEventListener('scroll', checkImmediateVisibility, { passive: true });
    window.addEventListener('resize', checkImmediateVisibility, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 6. Terminal Card Typing Animation
  // -------------------------------------------------------------------------
  const terminalData = [
    { entryId: 'entry-whoami', cmdId: 'cmd-whoami', outId: 'out-whoami', cmdText: 'whoami' },
    { entryId: 'entry-role', cmdId: 'cmd-role', outId: 'out-role', cmdText: 'role' },
    { entryId: 'entry-location', cmdId: 'cmd-location', outId: 'out-location', cmdText: 'location' },
    { entryId: 'entry-skills', cmdId: 'cmd-skills', outId: 'out-skills', cmdText: 'skills' },
    { entryId: 'entry-status', cmdId: 'cmd-status', outId: 'out-status', cmdText: 'status' }
  ];

  function runTerminalAnimation() {
    if (prefersReducedMotion) return;

    // Initially hide all entries after the first one
    for (let i = 1; i < terminalData.length; i++) {
      const entryEl = document.getElementById(terminalData[i].entryId);
      if (entryEl) entryEl.style.display = 'none';
    }

    const firstCmd = document.getElementById(terminalData[0].cmdId);
    const firstOut = document.getElementById(terminalData[0].outId);
    if (firstCmd) firstCmd.textContent = '';
    if (firstOut) firstOut.style.display = 'none';

    function runStep(stepIndex) {
      if (stepIndex >= terminalData.length) return;

      const item = terminalData[stepIndex];
      const entryEl = document.getElementById(item.entryId);
      const cmdEl = document.getElementById(item.cmdId);
      const outEl = document.getElementById(item.outId);

      if (entryEl) entryEl.style.display = 'flex';
      if (cmdEl) cmdEl.textContent = '';
      if (outEl) outEl.style.display = 'none';

      let charIdx = 0;
      const textToType = item.cmdText;

      function typeChar() {
        if (charIdx < textToType.length) {
          if (cmdEl) cmdEl.textContent += textToType.charAt(charIdx);
          charIdx++;
          setTimeout(typeChar, 35);
        } else {
          // Show output
          setTimeout(() => {
            if (outEl) outEl.style.display = 'block';
            // Move to next line
            setTimeout(() => {
              runStep(stepIndex + 1);
            }, 140);
          }, 70);
        }
      }

      typeChar();
    }

    setTimeout(() => {
      runStep(0);
    }, 250);

    // Safety fallback: ensure everything is visible after 3.5s
    setTimeout(() => {
      terminalData.forEach(item => {
        const entryEl = document.getElementById(item.entryId);
        const cmdEl = document.getElementById(item.cmdId);
        const outEl = document.getElementById(item.outId);
        if (entryEl) entryEl.style.display = 'flex';
        if (cmdEl) cmdEl.textContent = item.cmdText;
        if (outEl) outEl.style.display = 'block';
      });
    }, 3500);
  }

  runTerminalAnimation();

  // -------------------------------------------------------------------------
  // 7. Project Modal
  // -------------------------------------------------------------------------
  const openProjectBtn = document.getElementById('open-project-btn');
  const projectModal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal() {
    if (!projectModal) return;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openProjectBtn) openProjectBtn.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // -------------------------------------------------------------------------
  // 8. Back to Top Smooth Scroll
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 9. Subtle Interactive Dotted-Globe Canvas
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('hero-globe-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 180;
    const globeRadius = 380;
    let rotationX = 0.2;
    let rotationY = 0;
    let targetRotationY = 0;
    let isMouseOver = false;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    // Initialize 3D points on a sphere (Fibonacci lattice)
    function initGlobeParticles() {
      particles = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;

      for (let i = 0; i < particleCount; i++) {
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);

        const x = globeRadius * Math.sin(phi) * Math.cos(theta);
        const y = globeRadius * Math.sin(phi) * Math.sin(theta);
        const z = globeRadius * Math.cos(phi);

        particles.push({ x, y, z, baseSize: 1.5 + Math.random() * 1.5 });
      }
    }

    function project(x, y, z, cx, cy) {
      // Perspective projection
      const cameraDistance = 1000;
      const scale = cameraDistance / (cameraDistance + z);
      return {
        x: cx + x * scale,
        y: cy + y * scale,
        scale: scale,
        z: z
      };
    }

    function rotateY(x, z, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos - z * sin,
        z: x * sin + z * cos
      };
    }

    function rotateX(y, z, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        y: y * cos - z * sin,
        z: y * sin + z * cos
      };
    }

    let animationFrameId;

    function renderGlobe() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Auto rotation
      targetRotationY += 0.0018;
      rotationY += (targetRotationY - rotationY) * 0.05;

      const centerX = width > 1024 ? width * 0.72 : width * 0.5;
      const centerY = height * 0.45;

      // Draw faint connections
      ctx.lineWidth = 0.5;

      // Project all points
      const projectedPoints = particles.map(p => {
        let rotated = rotateY(p.x, p.z, rotationY);
        let rotated2 = rotateX(p.y, rotated.z, rotationX);
        return {
          ...project(rotated.x, rotated2.y, rotated2.z, centerX, centerY),
          baseSize: p.baseSize
        };
      });

      // Sort by depth so closer dots render crisp
      projectedPoints.sort((a, b) => a.z - b.z);

      // Draw subtle orbital dots
      projectedPoints.forEach(p => {
        if (p.scale <= 0) return;

        const alpha = Math.max(0.1, Math.min(0.7, (p.z + globeRadius) / (2 * globeRadius) * 0.6 + 0.1));
        const size = p.baseSize * p.scale;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        // Violet gradient glow
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
        ctx.shadowBlur = size * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(renderGlobe);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      initGlobeParticles();
    });

    window.addEventListener('mousemove', (e) => {
      const mouseNormX = (e.clientX / width) - 0.5;
      targetRotationY += mouseNormX * 0.0015;
    }, { passive: true });

    resizeCanvas();
    initGlobeParticles();
    renderGlobe();
  }

});
