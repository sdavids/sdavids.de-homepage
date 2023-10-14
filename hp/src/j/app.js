document.addEventListener('DOMContentLoaded', () => {
  const a = document.getElementById('sd_contact');
  a.href = atob(a.dataset.h);
});
