/* Vatsalya Sewa Griha — shared site behavior */
(function () {
  'use strict';

  // ---- Wavy section dividers (injected from data attributes) --------------
  // A section gets a soft wavy crest melting into the next one by adding:
  //   data-divider="<next section colour>"   (required)
  //   data-divider-accent="<pale band colour>" (optional echo of the hero)
  //   data-leaves            (optional leaf cluster resting on the crest)
  //   data-leaves-dark       (lighten the leaves for a dark crest)
  (function () {
    var WAVE_ACCENT = 'M0,140 C240,96 470,196 760,166 C1030,138 1230,92 1440,134 L1440,210 L0,210 Z';
    var WAVE_FRONT = 'M0,170 C260,124 470,210 760,186 C1040,164 1230,116 1440,160 L1440,210 L0,210 Z';
    var LEAVES = '<svg class="wave-leaves%CLS%" viewBox="0 0 230 200" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'
      + '<path data-fill="d1" d="M30 200 C2 150 6 86 70 40 C92 96 86 158 44 200 Z" fill="var(--color-primary-500)" opacity="0.92"/>'
      + '<path d="M70 40 C70 96 58 150 40 196" stroke="#1f5a29" stroke-width="2" stroke-linecap="round" opacity="0.4"/>'
      + '<path data-fill="d2" d="M96 200 C72 162 78 110 132 78 C150 124 144 174 110 200 Z" fill="var(--color-primary-400)" opacity="0.9"/>'
      + '<path d="M132 78 C128 124 116 166 104 196" stroke="#1f5a29" stroke-width="1.8" stroke-linecap="round" opacity="0.35"/>'
      + '<path data-fill="d3" d="M150 200 C136 172 142 134 184 116 C196 150 190 184 168 200 Z" fill="var(--color-primary-300)" opacity="0.85"/>'
      + '</svg>';
    [].slice.call(document.querySelectorAll('[data-divider]')).forEach(function (sec) {
      var fill = sec.getAttribute('data-divider') || 'var(--cream-0)';
      var accent = sec.getAttribute('data-divider-accent') || '';
      sec.classList.add('sec-divider');
      var svg = '<svg class="wave-sep" viewBox="0 0 1440 210" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">';
      if (accent) svg += '<path class="w-accent" d="' + WAVE_ACCENT + '" fill="' + accent + '"/>';
      svg += '<path d="' + WAVE_FRONT + '" fill="' + fill + '"/></svg>';
      var leaves = '';
      if (sec.hasAttribute('data-leaves')) {
        leaves = LEAVES.replace('%CLS%', sec.hasAttribute('data-leaves-dark') ? ' on-dark' : '');
      }
      sec.insertAdjacentHTML('beforeend', svg + leaves);
    });
  })();

  // ---- Sticky header shadow on scroll ----
  var header = document.querySelector('.page-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile nav toggle (scoped to the sticky page header) ----
  var toggle = (header || document).querySelector('.nav-toggle');
  var nav = (header || document).querySelector('.page-nav');
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
      news.innerHTML = '<p style="color:var(--color-secondary-300); font-size:15px; line-height:1.6; margin:0">Thanks — you\u2019re on the list. We\u2019ll only email when there\u2019s something actually worth sending.</p>';
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
