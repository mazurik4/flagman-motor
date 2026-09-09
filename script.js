  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('open');
    mobileNav.classList.remove('open');
  }));

  document.getElementById('leadForm').addEventListener('submit', function(e){
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Дякуємо! Ми на зв\'язку';
    btn.disabled = true;
  });
