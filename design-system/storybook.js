(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Private gate.
     This is a static site, so this is a privacy screen, not real auth:
     it keeps the page out of casual view. The page is unlinked, excluded
     from analytics and from search engines (robots.txt + noindex).
     To change the passphrase, put its SHA-256 hex here:
       printf '%s' 'new-passphrase' | sha256sum
     ------------------------------------------------------------------ */
  var PASS_HASH = '137ae5844df97d1aa3d561e5997af42aa4c378d7cb053f93d8ffc385c4038177';
  var STORAGE_KEY = 'ds_unlock';
  var root = document.documentElement;

  function store(get, value) {
    try {
      if (get) return localStorage.getItem(STORAGE_KEY);
      if (value === null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, value);
    } catch (e) { return null; }
  }

  function sha256(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }

  function unlock() {
    root.classList.remove('sb-locked');
    root.classList.add('sb-unlocked');
    initApp();
  }

  function initGate() {
    if (store(true) === PASS_HASH) { unlock(); return; }

    var form = document.getElementById('sb-gate-form');
    var input = document.getElementById('sb-pass');
    var error = document.getElementById('sb-gate-error');
    input.focus();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      error.hidden = true;
      if (!window.crypto || !crypto.subtle) {
        error.textContent = 'This browser cannot verify the passphrase here (needs HTTPS or localhost).';
        error.hidden = false;
        return;
      }
      sha256(input.value).then(function (hash) {
        if (hash === PASS_HASH) {
          store(false, hash);
          unlock();
        } else {
          error.textContent = 'Wrong passphrase.';
          error.hidden = false;
          input.select();
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */

  var appReady = false;

  function initApp() {
    if (appReady) return;
    appReady = true;
    buildCode();
    buildControls();
    buildSwatches();
    buildNav();
    bindChrome();
  }

  /* ---------- Code snippets generated from the live preview ---------- */
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function dedent(s) {
    var lines = s.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
    var min = Infinity;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      var m = l.match(/^\s*/)[0].length;
      if (m < min) min = m;
    });
    return lines.map(function (l) { return l.slice(min === Infinity ? 0 : min); }).join('\n');
  }

  function buildCode() {
    document.querySelectorAll('.sb-story').forEach(function (story) {
      var canvas = story.querySelector('.sb-canvas');
      if (!canvas || story.hasAttribute('data-no-code')) return;
      var source = dedent(canvas.innerHTML)
        // Strip what the lightbox script adds to figure images at runtime.
        .replace(/ lightbox-trigger/g, '')
        .replace(/ tabindex="0" role="button" aria-label="Open image in fullscreen"/g, '');

      var details = document.createElement('details');
      details.className = 'sb-code';
      details.innerHTML =
        '<summary>Show code</summary>' +
        '<button class="sb-copy" type="button">Copy</button>' +
        '<pre><code>' + escapeHtml(source) + '</code></pre>';
      story.appendChild(details);

      details.querySelector('.sb-copy').addEventListener('click', function (e) {
        var btn = e.currentTarget;
        var done = function () {
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1200);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(source).then(done, function () {});
      });
    });
  }

  /* ---------- State controls (default / hover / focus …) ---------- */
  function buildControls() {
    document.querySelectorAll('.sb-controls').forEach(function (bar) {
      var story = bar.closest('.sb-story');
      var selector = bar.getAttribute('data-target');
      var states = bar.getAttribute('data-states').split(',');
      var targets = story.querySelectorAll('.sb-canvas ' + selector);

      states.forEach(function (state, i) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'sb-chip';
        chip.textContent = state;
        chip.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        chip.addEventListener('click', function () {
          bar.querySelectorAll('.sb-chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
          chip.setAttribute('aria-pressed', 'true');
          targets.forEach(function (t) {
            t.classList.remove('sb-force-hover', 'sb-force-focus');
            if (state === 'hover') t.classList.add('sb-force-hover');
            if (state === 'focus') t.classList.add('sb-force-focus');
            if (state === 'error') {
              var err = story.querySelector('.login-error');
              if (err) err.hidden = false;
            } else {
              var e2 = story.querySelector('.login-error');
              if (e2 && bar.hasAttribute('data-error-toggle')) e2.hidden = true;
            }
          });
        });
        bar.appendChild(chip);
      });
    });
  }

  /* ---------- Color tokens with live contrast ---------- */
  var COLORS = [
    { group: 'Brand', name: '--color-accent', use: 'Links, block titles, primary button, focus ring' },
    { group: 'Brand', name: '--color-accent-hover', use: 'Hover/focus for links & buttons, inline code' },
    { group: 'Text', name: '--color-text', use: 'Body copy, headings' },
    { group: 'Text', name: '--color-text-secondary', use: 'Leads, card descriptions, notes' },
    { group: 'Text', name: '--color-text-emphasis', use: 'Italic emphasis in prose (CV)' },
    { group: 'Text', name: '--color-text-muted', use: 'Meta lines, labels, captions, section titles' },
    { group: 'Text', name: '--color-text-disabled', use: '“Soon” card label and link' },
    { group: 'Text', name: '--color-separator', use: 'Dot separator in hero nav' },
    { group: 'Surface', name: '--color-bg', use: 'Page background, button text' },
    { group: 'Surface', name: '--color-surface', use: 'Cards, highlights, decisions, inputs' },
    { group: 'Surface', name: '--color-surface-hover', use: 'Project card hover' },
    { group: 'Surface', name: '--color-border', use: 'Input & control borders, rules' },
    { group: 'Surface', name: '--color-border-dashed', use: 'Placeholder media outline' },
    { group: 'Surface', name: '--color-overlay', use: 'Lightbox backdrop' },
    { group: 'Feedback', name: '--color-danger', use: 'Form error text' }
  ];

  function parseColor(str) {
    var el = document.createElement('div');
    el.style.color = str;
    document.body.appendChild(el);
    var rgb = getComputedStyle(el).color.match(/[\d.]+/g).map(Number);
    el.remove();
    return rgb;
  }

  function luminance(rgb) {
    var c = rgb.slice(0, 3).map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  function contrast(a, b) {
    var l1 = luminance(a), l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  function badge(label, ratio) {
    var cls = ratio >= 4.5 ? 'pass' : ratio >= 3 ? 'warn' : 'fail';
    var verdict = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'Fail';
    return '<span class="sb-badge sb-badge--' + cls + '" title="Contrast on ' + label + '">' +
      label + ' ' + ratio.toFixed(2) + ' · ' + verdict + '</span>';
  }

  function buildSwatches() {
    var host = document.getElementById('sb-swatches');
    if (!host) return;
    var cs = getComputedStyle(root);
    var bg = parseColor(cs.getPropertyValue('--color-bg').trim());
    var surface = parseColor(cs.getPropertyValue('--color-surface').trim());
    var currentGroup = null;
    var html = '';

    COLORS.forEach(function (c) {
      var value = cs.getPropertyValue(c.name).trim();
      if (c.group !== currentGroup) {
        if (currentGroup) html += '</div>';
        html += '<h3 class="sb-h3">' + c.group + '</h3><div class="sb-swatches">';
        currentGroup = c.group;
      }
      var rgb = parseColor(value);
      var isSurface = c.group === 'Surface';
      var onColor = luminance(rgb) > 0.3 ? 'var(--color-bg)' : 'var(--color-text)';
      html +=
        '<figure class="sb-swatch">' +
        '<div class="sb-swatch__color" style="background:' + value + ';color:' + onColor + '">' +
        '<span>Aa</span><span>' + value + '</span></div>' +
        '<figcaption class="sb-swatch__body">' +
        '<p class="sb-swatch__name">' + c.name + '</p>' +
        '<p class="sb-swatch__value">var(' + c.name + ')</p>' +
        '<p class="sb-swatch__use">' + c.use + '</p>' +
        (isSurface ? '' : '<div class="sb-contrast">' + badge('bg', contrast(rgb, bg)) + badge('surface', contrast(rgb, surface)) + '</div>') +
        '</figcaption></figure>';
    });
    html += '</div>';
    host.innerHTML = html;
  }

  /* ---------- Navigation (hash routing, one page at a time) ---------- */
  function buildNav() {
    var pages = Array.prototype.slice.call(document.querySelectorAll('.sb-page'));
    var links = Array.prototype.slice.call(document.querySelectorAll('.sb-nav__link'));

    function show() {
      var id = (location.hash || '').slice(1) || pages[0].id;
      var page = document.getElementById(id);
      if (!page || !page.classList.contains('sb-page')) page = pages[0];
      pages.forEach(function (p) { p.hidden = p !== page; });
      links.forEach(function (l) {
        if (l.getAttribute('href') === '#' + page.id) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      });
      document.title = page.getAttribute('data-title') + ' — Design system';
      root.classList.remove('sb-nav-open');
      window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', show);
    show();

    var search = document.getElementById('sb-search');
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      document.querySelectorAll('.sb-nav__group').forEach(function (group) {
        var any = false;
        group.querySelectorAll('li').forEach(function (li) {
          var hit = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
          li.hidden = !hit;
          if (hit) any = true;
        });
        group.hidden = !any;
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== search && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        e.preventDefault();
        search.focus();
      }
    });
  }

  function bindChrome() {
    var toggle = document.getElementById('sb-menu');
    toggle.addEventListener('click', function () {
      var open = root.classList.toggle('sb-nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.getElementById('sb-lock').addEventListener('click', function () {
      store(false, null);
      location.reload();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGate);
  else initGate();
})();
