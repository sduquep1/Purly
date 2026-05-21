/* ════════════════════════════════════════════════════════════
   PŪRLY · purly-animations.js
   GSAP scroll animations · Custom cursor · Organic reveals
   Requires: GSAP 3.12.2 + ScrollTrigger via CDN
════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── prefers-reduced-motion ─────────────────────────────── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── MOUSE TRAIL ────────────────────────────────────────── */
  var isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice && !reducedMotion) {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    var trail = [];
    var GOLD  = [200, 167, 117]; // --gold #C8A775
    var LIFE  = 600;

    document.addEventListener('mousemove', function (e) {
      for (var i = 0; i < 2; i++) {
        trail.push({
          x:    e.clientX + (Math.random() - 0.5) * 8,
          y:    e.clientY + (Math.random() - 0.5) * 8,
          size: 2.5 + Math.random() * 2.5,
          born: performance.now()
        });
      }
    });

    function drawDiamond(c, x, y, s) {
      c.beginPath();
      c.moveTo(x,           y - s);
      c.lineTo(x + s * 0.55, y);
      c.lineTo(x,           y + s);
      c.lineTo(x - s * 0.55, y);
      c.closePath();
      c.fill();
    }

    (function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var now = performance.now();
      trail = trail.filter(function (p) {
        var t = (now - p.born) / LIFE;
        if (t >= 1) return false;
        ctx.globalAlpha = 0.55 * (1 - t);
        ctx.fillStyle   = 'rgb(' + GOLD[0] + ',' + GOLD[1] + ',' + GOLD[2] + ')';
        drawDiamond(ctx, p.x, p.y, p.size * (1 - t * 0.4));
        return true;
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    })();
  }

  /* ── GSAP CHECK ─────────────────────────────────────────── */
  if (typeof gsap === 'undefined' || reducedMotion) {
    document.querySelectorAll('.clip-reveal, .hero-line').forEach(function (el) {
      el.style.opacity   = '1';
      el.style.clipPath  = 'none';
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
    var isMobilePkg = window.innerWidth < 768;

    if (isMobilePkg) {
      gsap.set(pkgItems, { opacity: 0, y: 40 });
      gsap.to(pkgItems, {
        opacity: 1, y: 0,
        duration: 1.0, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '#pkg-stage', start: 'top 85%', once: true }
      });
    } else {
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
    }

    /* Gold packaging — slightly faster parallax (protagonist) — desktop only */
    var goldPkg = document.querySelector('.pkg-item.gold');
    if (goldPkg && window.innerWidth >= 768) {
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
