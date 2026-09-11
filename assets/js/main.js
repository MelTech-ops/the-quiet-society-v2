// THE QUIET SOCIETY — shared site behavior

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Formspree AJAX submit (Request Concierge + Membership Application forms)
  document.querySelectorAll('form[data-formspree]').forEach(function (form) {
    var success = form.parentElement.querySelector('.form-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.textContent = 'Sending…'; submitBtn.disabled = true; }

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          form.style.display = 'none';
          if (success) success.style.display = 'block';
        } else {
          alert('Something went wrong sending your message. Please email us directly.');
        }
      }).catch(function () {
        alert('Something went wrong sending your message. Please email us directly.');
      }).finally(function () {
        if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
      });
    });
  });

  // Highlight active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
});
