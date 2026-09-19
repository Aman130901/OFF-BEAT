(function () {
  /* Mobile menu */
  var menuBtn = document.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.textContent = open ? 'Close' : 'Menu';
    });
  }

  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  /* Home: beat sequencer */
  var track = document.getElementById('track');
  if (track) {
    var N = 16, STEP = 250, off = 6, cur = 0, steps = [];
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var setOff = function (i) {
      off = i;
      steps.forEach(function (s, k) {
        s.classList.toggle('off', k === off);
        s.setAttribute('aria-pressed', k === off ? 'true' : 'false');
      });
    };
    var flash = function (el, ms) {
      el.classList.add('on');
      setTimeout(function () { el.classList.remove('on'); }, ms);
    };

    for (var i = 0; i < N; i++) {
      (function (i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'step';
        b.setAttribute('aria-label', 'Step ' + (i + 1));
        b.addEventListener('click', function () { setOff(i); });
        track.appendChild(b);
        steps.push(b);
      })(i);
    }
    setOff(off);

    if (!reduce) {
      setInterval(function () {
        if (document.hidden) return;
        var el = steps[cur];
        if (cur === off) {
          setTimeout(function () { flash(el, 170); }, STEP / 2);
        } else {
          flash(el, 170);
        }
        cur = (cur + 1) % N;
      }, STEP);
    }
  }

  /* Home: quick pitch band -> contact page with email prefilled */
  var start = document.getElementById('start');
  if (start) {
    var qEmail = document.getElementById('email');
    var qMsg = document.getElementById('msg');
    start.addEventListener('click', function () {
      var v = (qEmail.value || '').trim();
      if (!EMAIL_RE.test(v)) {
        qMsg.textContent = 'Enter a valid email so we can reply.';
        qEmail.focus();
        return;
      }
      window.location.href = 'contact.html?email=' + encodeURIComponent(v);
    });
  }

  /* Contact: form validation + concept-only confirmation */
  var form = document.getElementById('pitch-form');
  if (form) {
    var fName = document.getElementById('f-name');
    var fEmail = document.getElementById('f-email');
    var fIdea = document.getElementById('f-idea');
    var formMsg = document.getElementById('form-msg');

    var params = new URLSearchParams(window.location.search);
    var pre = params.get('email');
    if (pre) fEmail.value = pre;

    var setErr = function (input, text) {
      var slot = document.getElementById(input.id + '-err');
      slot.textContent = text;
      if (text) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
      return !text;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formMsg.textContent = '';
      var okName = setErr(fName, fName.value.trim() ? '' : 'Enter your name.');
      var okEmail = setErr(fEmail, EMAIL_RE.test(fEmail.value.trim()) ? '' : 'Enter a valid email so we can reply.');
      var okIdea = setErr(fIdea, fIdea.value.trim().length >= 20 ? '' : 'Describe your idea in at least 20 characters.');
      if (!(okName && okEmail && okIdea)) {
        (!okName ? fName : !okEmail ? fEmail : fIdea).focus();
        return;
      }
      formMsg.textContent = 'Sent. This is a concept page, so nothing was actually submitted.';
      form.reset();
    });
  }
})();
