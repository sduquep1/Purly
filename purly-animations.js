/* ════════════════════════════════════════════════════════════
   PŪRLY · purly-animations.js
   GSAP scroll animations · Custom cursor · Organic reveals
   Requires: GSAP 3.12.2 + ScrollTrigger via CDN
════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── prefers-reduced-motion ─────────────────────────────── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── CUSTOM CURSOR ──────────────────────────────────────── */
  var isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice && !reducedMotion) {
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var cx = mx, cy = my;
    var dotVisible = false;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!dotVisible) {
        cx = mx; cy = my;
        dot.style.opacity = '1';
        dotVisible = true;
      }
    });
    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      dotVisible = false;
    });

    (function tick() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      dot.style.left = cx + 'px';
      dot.style.top  = cy + 'px';
      requestAnimationFrame(tick);
    })();

    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('is-hover'); });
    });
  }

  /* ── GSAP CHECK ─────────────────────────────────────────── */
  if (typeof gsap === 'undefined' || reducedMotion) {
    document.querySelectorAll('.clip-reveal, .hero-line').forEach(function (el) {
      el.style.opacity = '1';
      el.style.clipPath = 'none';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.line-grow').forEach(function (el) {
      el.style.transform = 'scaleX(1)';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Set initial states immediately — prevents any flash */
  gsap.set('.clip-reveal',  { clipPath: 'inset(0 0 100% 0)', opacity: 0 });
  gsap.set('.hero-line',    { y: 80, opacity: 0 });
  gsap.set('.line-grow',    { scaleX: 0, transformOrigin: 'left center' });

  /* ── HERO HEADLINE STAGGER ──────────────────────────────── */
  var heroLines = document.querySelectorAll('.hero-line');
  if (heroLines.length) {
    gsap.to(heroLines, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.35
    });
  }

  /* ── HERO CONTENT PARALLAX ──────────────────────────────── */
  var heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* ── CLIP-PATH REVEAL ───────────────────────────────────── */
  document.querySelectorAll('.clip-reveal').forEach(function (el) {
    gsap.to(el, {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    });
  });

  /* ── LINE GROW ──────────────────────────────────────────── */
  document.querySelectorAll('.line-grow').forEach(function (el) {
    gsap.to(el, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        once: true
      }
    });
  });

  /* ── NUMBER COUNTERS ────────────────────────────────────── */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target  = parseFloat(el.dataset.count);
    var suffix  = el.dataset.suffix || '';
    var isInt   = Number.isInteger(target);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: function () {
        var obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = (isInt ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          }
        });
      }
    });
  });

  /* ── DOT SPRING — materiales ────────────────────────────── */
  document.querySelectorAll('.mat-card-dot, .mat-dot').forEach(function (d) {
    var parent = d.closest('.mat-card, .mat-col');
    if (!parent) return;
    parent.addEventListener('mouseenter', function () {
      gsap.to(d, { scale: 1.8, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
    parent.addEventListener('mouseleave', function () {
      gsap.to(d, { scale: 1, duration: 0.5, ease: 'power2.out' });
    });
  });

  /* ── PACKAGING REVEAL — coleccion ───────────────────────── */
  var pkgItems = document.querySelectorAll('.pkg-item');
  if (pkgItems.length) {
    gsap.set(pkgItems, { clipPath: 'inset(0 0 100% 0)', opacity: 0 });

    gsap.to(pkgItems, {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      duration: 1.3,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#pkg-stage',
        start: 'top 78%',
        once: true
      }
    });

    /* Gold packaging — slightly faster parallax (protagonist) */
    var goldPkg = document.querySelector('.pkg-item.gold');
    if (goldPkg) {
      gsap.to(goldPkg, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '#pkg-stage',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    }
  }

  /* ── SECTION ENTRANCE — editorial ──────────────────────── */
  document.querySelectorAll('.manifesto-quote, .bridge-text, .adulta-stat-big').forEach(function (el) {
    if (el.classList.contains('reveal') || el.classList.contains('clip-reveal')) return;
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 84%',
        once: true
      }
    });
  });

})();
