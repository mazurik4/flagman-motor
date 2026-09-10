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

  function showFieldError(input, errorEl, msg){
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
    input.classList.add('input-error');
  }
  function hideFieldError(input, errorEl){
    errorEl.classList.remove('visible');
    input.classList.remove('input-error');
  }

  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('name-error');
  nameInput.addEventListener('input', function(){
    const sanitized = this.value.replace(/[^A-Za-zА-ЯЁІЇЄҐа-яёіїєґ'\s-]/g, '');
    if(sanitized !== this.value){
      showFieldError(this, nameError, "Ім'я може містити лише літери");
    } else {
      hideFieldError(this, nameError);
    }
    this.value = sanitized;
  });

  const phoneInput = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  phoneInput.addEventListener('focus', function(){
    if(!this.value){ this.value = '+380 '; }
  });
  phoneInput.addEventListener('input', function(){
    const hasLetters = /[^\d+\s]/.test(this.value);
    let digits = this.value.replace(/\D/g, '');
    if(digits.startsWith('380')){ digits = digits.slice(3); }
    const tooLong = digits.length > 9;
    digits = digits.slice(0, 9);

    if(hasLetters){
      showFieldError(this, phoneError, 'Телефон може містити лише цифри');
    } else if(tooLong){
      showFieldError(this, phoneError, 'Не більше 9 цифр після +380');
    } else {
      hideFieldError(this, phoneError);
    }

    let formatted = '+380';
    if(digits.length){
      formatted += ' ' + digits.slice(0,2);
      if(digits.length > 2) formatted += ' ' + digits.slice(2,5);
      if(digits.length > 5) formatted += ' ' + digits.slice(5,7);
      if(digits.length > 7) formatted += ' ' + digits.slice(7,9);
    } else {
      formatted += ' ';
    }
    this.value = formatted;
  });
  phoneInput.addEventListener('blur', function(){
    if(this.value.trim() === '+380'){ this.value = ''; }
    hideFieldError(this, phoneError);
  });

  function countLetters(str){
    return (str.match(/[A-Za-zА-ЯЁІЇЄҐа-яёіїєґ]/g) || []).length;
  }

  document.getElementById('leadForm').addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    if(countLetters(nameInput.value) < 2){
      showFieldError(nameInput, nameError, "Введіть ім'я — мінімум 2 літери");
      valid = false;
    }

    let phoneDigits = phoneInput.value.replace(/\D/g, '');
    if(phoneDigits.startsWith('380')){ phoneDigits = phoneDigits.slice(3); }
    if(phoneDigits.length < 9){
      showFieldError(phoneInput, phoneError, 'Введіть повний номер — 9 цифр після +380');
      valid = false;
    }

    if(!valid) return;

    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Дякуємо! Ми на зв\'язку';
    btn.disabled = true;
  });
