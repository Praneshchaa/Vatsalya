/* Vatsalya Sewa Griha — shared site behavior */
(function () {
  'use strict';

  // ---- Sticky header shadow on scroll ----
  var header = document.querySelector('.page-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.page-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') nav.classList.remove('open'); });
  }

  // ---- Reveal on scroll (instant if already in view; failsafe never leaves hidden) ----
  var reveal = function (el) { el.classList.add('in'); };

  // Stagger groups: when the group scrolls in, its .r children appear one by one.
  var groups = [].slice.call(document.querySelectorAll('[data-stagger]'));
  var staggered = [];
  groups.forEach(function (group) {
    var kids = [].slice.call(group.querySelectorAll('.r'));
    kids.forEach(function (k) { staggered.push(k); });           // mark so the plain loop skips them
    var step = parseInt(group.getAttribute('data-stagger'), 10) || 140;
    var fired = false;
    var fire = function () {
      if (fired) return; fired = true;
      kids.forEach(function (k, i) { setTimeout(function () { reveal(k); }, i * step); });
    };
    if (!('IntersectionObserver' in window)) { fire(); return; }
    var gr = group.getBoundingClientRect();
    if (gr.top < (window.innerHeight || 0) * 0.82 && gr.bottom > 0) { fire(); return; }
    var gio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { fire(); gio.disconnect(); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -14% 0px' });
    gio.observe(group);
  });

  // Plain reveals (everything not inside a stagger group).
  var items = [].slice.call(document.querySelectorAll('.r')).filter(function (el) { return staggered.indexOf(el) === -1; });
  if (items.length) {
    if (!('IntersectionObserver' in window)) {
      items.forEach(reveal);
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 0) * 0.92) reveal(el);  // already in view
        else io.observe(el);
      });
    }
  }
  // failsafe ONLY where there's no observer support — otherwise the observer
  // must drive the one-by-one reveal no matter how long the user takes to scroll.
  if (!('IntersectionObserver' in window)) {
    [].slice.call(document.querySelectorAll('.r')).forEach(reveal);
  }

  // ---- FAQ accordion ----
  var faqItems = [].slice.call(document.querySelectorAll('.faq-item'));
  function setOpen(item, open) {
    var ans = item.querySelector('.faq-a');
    var btn = item.querySelector('.faq-q');
    item.classList.toggle('open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (ans) ans.style.maxHeight = open ? (ans.scrollHeight + 'px') : '0px';
    if (ans) ans.style.opacity = open ? '1' : '0';
  }
  faqItems.forEach(function (item, i) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    setOpen(item, i === 0); // first open by default
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (o) { if (o !== item) setOpen(o, false); });
      setOpen(item, !isOpen);
    });
  });
  window.addEventListener('resize', function () {
    faqItems.forEach(function (item) { if (item.classList.contains('open')) setOpen(item, true); });
  });

  // ---- Contact form (front-end only; swaps to a thank-you state) ----
  var form = document.querySelector('#visit-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var card = form.closest('.form-card');
      if (card) card.innerHTML = document.querySelector('#form-success-tpl').innerHTML;
    });
  }

  // ---- Why-choose-us accordion (.acc) ----
  var accItems = [].slice.call(document.querySelectorAll('.acc-item'));
  function setAcc(item, open) {
    var ans = item.querySelector('.acc-a');
    var btn = item.querySelector('.acc-q');
    item.classList.toggle('open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (ans) { ans.style.maxHeight = open ? (ans.scrollHeight + 'px') : '0px'; ans.style.opacity = open ? '1' : '0'; }
  }
  accItems.forEach(function (item, i) {
    var btn = item.querySelector('.acc-q');
    if (!btn) return;
    setAcc(item, i === 0);
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      accItems.forEach(function (o) { if (o !== item) setAcc(o, false); });
      setAcc(item, !isOpen);
    });
  });

  // ---- Interactive values list ----
  var vnames = [].slice.call(document.querySelectorAll('.values-names .vn'));
  var vBodyTitle = document.querySelector('.values-body .vtext h3');
  var vBodyText = document.querySelector('.values-body .vtext p');
  var vBodyArt = document.querySelector('.values-body .vart');
  function showValue(vn) {
    vnames.forEach(function (o) { o.classList.toggle('on', o === vn); });
    if (vBodyTitle) vBodyTitle.textContent = vn.getAttribute('data-title') || vn.textContent.trim();
    if (vBodyText) vBodyText.textContent = vn.getAttribute('data-desc') || '';
  }
  vnames.forEach(function (vn) {
    vn.addEventListener('mouseenter', function () { showValue(vn); });
    vn.addEventListener('click', function () { showValue(vn); });
  });

  // ---- Newsletter (front-end only) ----
  var news = document.querySelector('.news-form');
  if (news) {
    news.addEventListener('submit', function (e) {
      e.preventDefault();
      news.innerHTML = '<p style="color:var(--color-secondary-300); font-size:15px; line-height:1.6; margin:0">Thank you — you\u2019re on the list. We\u2019ll share gentle, useful tips for caring families.</p>';
    });
  }

  // ---- Resize: recompute open accordion heights ----
  window.addEventListener('resize', function () {
    accItems.forEach(function (item) { if (item.classList.contains('open')) setAcc(item, true); });
  });

  // ---- Values, dark immersive list (.vword) ----
  var vwords = [].slice.call(document.querySelectorAll('.vword'));
  var vdesc = document.getElementById('vdesc');
  function showWord(w) {
    vwords.forEach(function (o) { o.classList.toggle('on', o === w); });
    if (vdesc) vdesc.textContent = w.getAttribute('data-desc') || '';
  }
  vwords.forEach(function (w) {
    w.addEventListener('mouseenter', function () { showWord(w); });
    w.addEventListener('click', function () { showWord(w); });
  });

  // ---- Gentle parallax (drift on inner imgs; never on a reveal element) ----
  var plx = [].slice.call(document.querySelectorAll('[data-parallax]'));
  if (plx.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ptick = false;
    function prender() {
      ptick = false;
      var vh = window.innerHeight || 1;
      plx.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var d = ((r.top + r.height / 2) - vh / 2) / vh;   // -0.5 … 0.5
        var speed = parseFloat(el.getAttribute('data-parallax')) || 40;
        el.style.transform = 'translateY(' + (-d * speed).toFixed(1) + 'px)';
      });
    }
    function ponscroll() { if (!ptick) { ptick = true; requestAnimationFrame(prender); } }
    window.addEventListener('scroll', ponscroll, { passive: true });
    window.addEventListener('resize', ponscroll);
    prender();
  }

  // ---- Year in footer ----
  var y = document.querySelector('#year');
  if (y) y.textContent = new Date().getFullYear();
})();


/* ============================================================
   Hero scroll storytelling — as the page scrolls away the hands
   + text gently lift, soften and fade into the next section.
   ============================================================ */
(function () {
  var wrap = document.getElementById('fadewrap');
  if (!wrap) return;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var smooth = function (t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
  var ticking = false;
  function render() {
    ticking = false;
    var vh = window.innerHeight;
    var p = clamp((window.scrollY || window.pageYOffset || 0) / (vh * 0.78), 0, 1);
    var hands = smooth(p);
    wrap.style.opacity = (1 - hands).toFixed(3);
    wrap.style.transform = 'translateY(' + (-hands * vh * 0.06).toFixed(1) + 'px) scale(' + (1 - hands * 0.03).toFixed(4) + ')';
    wrap.style.filter = 'blur(' + (hands * 2.4).toFixed(2) + 'px)';
  }
  function onScroll() {
    render();
    if (!ticking) { ticking = true; requestAnimationFrame(render); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  render();
})();
