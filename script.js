// FleetIQ demo interactions
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('selected'));
  });
});

// Small live timestamp for the dashboard demo.
const dateEl = document.querySelector('.dash-header small');
if (dateEl) {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString('en-IN', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
}
