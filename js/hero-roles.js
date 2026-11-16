// Types the extra roles after "Lead Product Designer" on the home page, one at a time.
(function () {
  'use strict';

  // "~" marks a short pause while typing, as if thinking for a moment. It is not shown.
  var ROLES = [
    'and analyst',
    'and family guy',
    'and researcher',
    'and skateboarder',
    'and musician',
    'and product manager',
    'and gamer',
    'and psychologist~ sometimes',
    'and interior designer',
    'and warm-weather traveler',
    'and frontend developer',
    'and civil engineer',
    'and AI integrator',
    'and nuclear plant designer',
    'and philosopher',
    'and steak & pizza lover',
    'and tech geek',
    'and visioneer'
  ];

  function init() {
    var target = document.querySelector('.hero-roles__text');
    if (!target) return;

    var role = 0;
    var chars = 0;
    var deleting = false;
    var paused = false;

    function tick() {
      var raw = ROLES[role];
      var pauseAt = raw.indexOf('~');
      var text = raw.replace('~', '');
      if (!deleting) {
        if (chars === pauseAt && !paused) {
          paused = true;
          return setTimeout(tick, 800);
        }
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
        paused = false;
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
