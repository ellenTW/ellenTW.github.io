/**
 * Home page project rails.
 *
 * Each `.rail-col` holds one `.rail-set` of cards. To loop the slow vertical
 * scroll without a visible jump, the set is duplicated: the track then holds
 * two identical halves, so the CSS animation's `translateY(-50%)` lands exactly
 * on the seam and restarts invisibly.
 *
 * The duplicate is built here rather than written into the HTML so the markup
 * stays the single source of truth for the card list. The `is-looping` class is
 * what starts the animation, so with JS unavailable the rails simply sit still
 * and stay readable.
 *
 * Speed and direction live in styles.css (--rail-duration-a / -b).
 */
(function () {
  'use strict';

  document.querySelectorAll('.rail-col').forEach(function (col) {
    var track = col.querySelector('.rail-track');
    var set = track && track.querySelector('.rail-set');
    if (!set) return;

    var clone = set.cloneNode(true);

    // The clone is a visual repeat, not new content: keep it out of the
    // accessibility tree and out of the tab order.
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a').forEach(function (link) {
      link.setAttribute('tabindex', '-1');
    });

    track.appendChild(clone);
    col.classList.add('is-looping');
  });
})();
