document.addEventListener('DOMContentLoaded', () => {
  const a = document.getElementById('sd_email');
  a.href = atob(a.dataset.h);
});
