document.addEventListener('DOMContentLoaded', () => {
  const a = document.querySelector('a.em');
  a.href = atob(a.dataset.h);
});
