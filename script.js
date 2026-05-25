// ── Page Navigation ──
function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.section-page').forEach(function(page) {
    page.classList.remove('active');
  });

  // Remove active from all nav links
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.classList.remove('active');
  });

  // Show selected page
  var target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');

  // Highlight active nav link
  var navLink = document.getElementById('nav-' + id);
  if (navLink) navLink.classList.add('active');

  // Scroll to top on page switch
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Booking Form ──
function submitForm() {
  var name    = document.getElementById('f-name').value.trim();
  var email   = document.getElementById('f-email').value.trim();
  var guests  = document.getElementById('f-guests').value;
  var message = document.getElementById('f-msg').value.trim();
  var toast   = document.getElementById('toast');

  // Basic validation
  if (!name) {
    showToast('error', 'Please enter your name.');
    return;
  }

  if (!email || !isValidEmail(email)) {
    showToast('error', 'Please enter a valid email address.');
    return;
  }

  // Success — in a real site you'd send data to a server or Formspree here
  showToast('success', '✓ Booking received for ' + guests + '! We\'ll confirm at ' + email + ' shortly.');

  // Clear form
  document.getElementById('f-name').value    = '';
  document.getElementById('f-email').value   = '';
  document.getElementById('f-msg').value     = '';
  document.getElementById('f-guests').selectedIndex = 0;
}

function showToast(type, message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show ' + type;

  // Auto-hide after 5 seconds
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function() {
    toast.classList.remove('show');
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Allow pressing Enter in form inputs to submit ──
document.addEventListener('DOMContentLoaded', function() {
  var inputs = document.querySelectorAll('#page-contact input');
  inputs.forEach(function(input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') submitForm();
    });
  });
});
