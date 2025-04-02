
// Loading screen
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.querySelector('.loading-text');

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => loadingScreen.remove(), 500);
  }, 500);
});

// Modal open/close
const orderBtn = document.getElementById('orderNow');
const orderModal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');

orderBtn.addEventListener('click', () => {
  orderModal.classList.add('show');
});
closeModal.addEventListener('click', () => {
  orderModal.classList.remove('show');
});

// EmailJS init
emailjs.init("REXB9WLJ_LjDtS10W");

const orderForm = document.querySelector('#orderModal form');
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const drink = document.querySelector('input[name="drink"]:checked')?.value;
  const email = orderForm.email.value;
  const notes = orderForm.notes.value;
  const method = document.querySelector('input[name="method"]:checked')?.value;


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

// 🧋 Price popup on hover
const popup = document.getElementById('pricePopup');
const boba = document.getElementById('bobaMilk');
const passion = document.getElementById('passionTea');

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

// 🖼️ Hover image switch
boba.addEventListener('mouseenter', () => boba.src = 'boba1.png');
boba.addEventListener('mouseleave', () => boba.src = 'boba.png');

passion.addEventListener('mouseenter', () => passion.src = 'passion1.png');
passion.addEventListener('mouseleave', () => passion.src = 'passion.png');
// ✅ Tap to toggle images (mobile only)
let isBobaToggled = false;
let isPassionToggled = false;
// 🧋 Image sources for toggling
const bobaImg = 'boba.png';
const bobaHover = 'boba1.png';

const passionImg = 'passion.png';
const passionHover = 'passion1.png';
// 🧋 Auto-switch boba images on mobile
if (window.innerWidth <= 768) {
  let bobaToggle = false;
  let passionToggle = false;

  setInterval(() => {
    boba.src = bobaToggle ? 'boba.png' : 'boba1.png';
    passion.src = passionToggle ? 'passion.png' : 'passion1.png';

    bobaToggle = !bobaToggle;
    passionToggle = !passionToggle;
  }, 2000); // change every 3 seconds
}

