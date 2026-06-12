(function () {
  'use strict';

  function init() {
    var images = Array.prototype.slice.call(
      document.querySelectorAll('.project-figure__image')
    );
    if (!images.length) return;

    // Build overlay
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.hidden = true;
    overlay.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">✕</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image">←</button>' +
      '<figure class="lightbox__figure">' +
      '  <img class="lightbox__image" alt="">' +
      '  <figcaption class="lightbox__caption"></figcaption>' +
      '</figure>' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image">→</button>' +
      '<p class="lightbox__counter"></p>';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('.lightbox__image');
    var captionEl = overlay.querySelector('.lightbox__caption');
    var counterEl = overlay.querySelector('.lightbox__counter');
    var prevBtn = overlay.querySelector('.lightbox__nav--prev');
    var nextBtn = overlay.querySelector('.lightbox__nav--next');
    var closeBtn = overlay.querySelector('.lightbox__close');

    var current = -1;
    var lastFocused = null;

    function largestSrc(img) {
      // Prefer the highest-resolution candidate from srcset if present
      if (img.srcset) {
        var best = null;
        img.srcset.split(',').forEach(function (entry) {
          var parts = entry.trim().split(/\s+/);
          var url = parts[0];
          var w = parseInt((parts[1] || '').replace(/w$/, ''), 10) || 0;
          if (!best || w > best.w) best = { url: url, w: w };
        });
        if (best) return best.url;
      }
      return img.currentSrc || img.src;
    }

    function show(index) {
      current = (index + images.length) % images.length;
      var source = images[current];
      imgEl.src = largestSrc(source);
      imgEl.alt = source.alt || '';
      var figure = source.closest('.project-figure');
      var caption = figure && figure.querySelector('.project-figure__caption');
      captionEl.textContent = caption ? caption.textContent : '';
      counterEl.textContent = (current + 1) + ' / ' + images.length;
      var single = images.length < 2;
      prevBtn.hidden = single;
      nextBtn.hidden = single;
      counterEl.hidden = single;
    }

    function open(index) {
      lastFocused = document.activeElement;
      show(index);
      overlay.hidden = false;
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    function close() {
      overlay.hidden = true;
      imgEl.src = '';
      document.body.classList.remove('lightbox-open');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });
    closeBtn.addEventListener('click', close);

    // Close when clicking the backdrop (not the image or controls)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('lightbox__figure')) {
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });

    images.forEach(function (img, i) {
      img.classList.add('lightbox-trigger');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Open image in fullscreen');
      img.addEventListener('click', function () { open(i); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(i);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
