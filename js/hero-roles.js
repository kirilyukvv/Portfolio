// Types the extra roles after "Lead Product Designer" on the home page, one at a time.
(function () {
  'use strict';

  var ROLES = [
    'and analyst',
    'and researcher',
    'and product manager',
    'and psychologist sometimes',
    'and frontend developer',
    'and AI integrator',
    'and visioneer'
  ];

  function init() {
    var target = document.querySelector('.hero-roles__text');
    if (!target) return;

    // With reduced motion, swap whole roles instead of typing them letter by letter.
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      var index = 0;
      target.textContent = ROLES[index];
      setInterval(function () {
        index = (index + 1) % ROLES.length;
        target.textContent = ROLES[index];
      }, 2200);
      return;
    }

    var role = 0;
    var chars = 0;
    var deleting = false;

    function tick() {
      var text = ROLES[role];
      if (!deleting) {
        chars += 1;
        target.textContent = text.slice(0, chars);
        if (chars === text.length) {
          deleting = true;
          var last = role === ROLES.length - 1;
          return setTimeout(tick, last ? 2600 : 1300);
        }
        return setTimeout(tick, 55);
      }
      chars -= 1;
      target.textContent = text.slice(0, chars);
      if (chars === 0) {
        deleting = false;
        role = (role + 1) % ROLES.length;
        return setTimeout(tick, 350);
      }
      return setTimeout(tick, 25);
    }

    setTimeout(tick, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
