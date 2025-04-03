import emailjs from '@emailjs/browser';

// ✅ Import images using Vite-compatible URLs
const bobaImg = new URL('./boba.png', import.meta.url).href;
const bobaHover = new URL('./boba1.png', import.meta.url).href;
const passionImg = new URL('./passion.png', import.meta.url).href;
const passionHover = new URL('./passion1.png', import.meta.url).href;

// 🌟 DOM elements
const backToTopBtn = document.getElementById('backToTop');
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.querySelector('.loading-text');
const orderBtn = document.getElementById('orderNow');
const orderModal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const orderForm = document.querySelector('#orderModal form');
const popup = document.getElementById('pricePopup');
const boba = document.getElementById('bobaMilk');
const passion = document.getElementById('passionTea');

// ✅ Set default image sources
boba.src = bobaImg;
passion.src = passionImg;

// 🧋 Scroll - back to top button
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// 🧋 Loading screen fade out
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => loadingScreen.remove(), 850);
  }, 500);
});

// 🧋 Modal control
orderBtn.addEventListener('click', () => {
  orderModal.classList.add('show');
});
closeModal.addEventListener('click', () => {
  orderModal.classList.remove('show');
});

// 📧 EmailJS init
emailjs.init("REXB9WLJ_LjDtS10W");

// 💌 Form submission
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const drink = document.querySelector('input[name="drink"]:checked')?.value;
  const method = document.querySelector('input[name="method"]:checked')?.value;
  const email = orderForm.email.value;
  const notes = orderForm.notes.value;

  if (!drink || !email) {
    alert("Please select a drink and enter your email 🧋💌");
    return;
  }

  orderModal.classList.remove('show');
  loadingText.textContent = '🧋 Blending your boba...';
  loadingScreen.classList.remove('fade-out');
  loadingScreen.style.display = 'flex';

  emailjs.send("service_8sh255l", "template_3bc9xw3", {
    drink,
    method,
    email,
    notes,
    reply_to: email
  }).then(() => {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        loadingText.textContent = '🧋 Blending your boba...';
        alert("🍹 Order sent! Thank you, Boba Master loves you 💖");
        orderForm.reset();
      }, 1000);
    }, 2000);
  }, (error) => {
    alert("Oops, something went wrong: " + error.text);
  });
});

// 💵 Price popup
boba.addEventListener('mouseenter', () => {
  popup.textContent = '$5 – Boba Milk with chewy pearls! 🧋';
  showPopup(boba);
});
boba.addEventListener('mouseleave', hidePopup);

passion.addEventListener('mouseenter', () => {
  popup.textContent = '$5 – Passionfruit Tea, sweet and fruity! 🍑';
  showPopup(passion);
});
passion.addEventListener('mouseleave', hidePopup);

function showPopup(target) {
  const rect = target.getBoundingClientRect();
  popup.style.top = `${window.scrollY + rect.bottom + 10}px`;
  popup.style.left = `${rect.left + rect.width / 2}px`;
  popup.style.transform = 'translateX(-50%)';
  popup.style.display = 'block';
}

function hidePopup() {
  popup.style.display = 'none';
}

// 🎨 Hover switch image
boba.addEventListener('mouseenter', () => boba.src = bobaHover);
boba.addEventListener('mouseleave', () => boba.src = bobaImg);

passion.addEventListener('mouseenter', () => passion.src = passionHover);
passion.addEventListener('mouseleave', () => passion.src = passionImg);