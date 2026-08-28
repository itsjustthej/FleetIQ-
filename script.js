// FleetIQ — Smart Food & Grocery Marketplace interactions

/* Mobile nav toggle */
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primaryNav');
if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    if (open) {
      primaryNav.style.cssText = 'display:flex;flex-direction:column;gap:18px;position:absolute;top:78px;left:0;right:0;background:var(--cream);padding:24px 7%;border-bottom:1px solid var(--line);';
    } else {
      primaryNav.removeAttribute('style');
    }
  });
  primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    primaryNav.removeAttribute('style');
  }));
}

/* Cart counter */
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount += 1;
    if (cartCountEl) {
      cartCountEl.textContent = cartCount;
      cartCountEl.classList.remove('bump');
      void cartCountEl.offsetWidth; // restart animation
      cartCountEl.classList.add('bump');
    }
    const original = btn.textContent;
    btn.textContent = '✓';
    setTimeout(() => { btn.textContent = original; }, 900);
  });
});

/* AI Food Assistant */
const moodData = {
  spicy: {
    heading: "Here's what I found for you 🌶️",
    items: [
      { emoji: '🌶️', name: 'Spicy Chicken Burger', meta: 'Burger House · 25 min' },
      { emoji: '🍜', name: 'Schezwan Noodles', meta: 'Wok This Way · 20 min' },
      { emoji: '🌮', name: 'Mexican Tacos', meta: 'Casa Verde · 22 min' }
    ]
  },
  comfort: {
    heading: "Comfort food, coming right up 🍲",
    items: [
      { emoji: '🍝', name: 'Creamy Alfredo Pasta', meta: 'Napoli Pizza Co. · 30 min' },
      { emoji: '🍛', name: 'Butter Chicken & Rice', meta: 'Spice Route · 28 min' },
      { emoji: '🍕', name: 'Loaded Cheese Pizza', meta: 'Napoli Pizza Co. · 32 min' }
    ]
  },
  healthy: {
    heading: "Keeping it light and fresh 🥗",
    items: [
      { emoji: '🥗', name: 'Quinoa Power Bowl', meta: 'Green Bowl Co. · 18 min' },
      { emoji: '🥙', name: 'Falafel Wrap', meta: 'Levant Street · 18 min' },
      { emoji: '🍱', name: 'Grilled Salmon Bento', meta: 'Sakura Kitchen · 28 min' }
    ]
  },
  quick: {
    heading: "Fast picks, ready in under 20 🏃",
    items: [
      { emoji: '🌯', name: 'Chicken Wrap', meta: 'Green Bowl Co. · 12 min' },
      { emoji: '🍔', name: 'Classic Cheeseburger', meta: 'Burger House · 15 min' },
      { emoji: '🍩', name: 'Glazed Donuts', meta: 'Sugar & Co · 10 min' }
    ]
  }
};

const moodChips = document.querySelectorAll('.mood-chip');
const assistantReply = document.getElementById('assistantReply');

moodChips.forEach(chip => {
  chip.addEventListener('click', () => {
    moodChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    assistantReply.innerHTML = `
      <div class="typing"><i></i><i></i><i></i></div>
    `;

    const mood = moodData[chip.dataset.mood];
    setTimeout(() => {
      assistantReply.innerHTML = `
        <div class="reply-heading">${mood.heading}</div>
        <div class="reply-cards">
          ${mood.items.map(it => `
            <div class="reply-card">
              <span>${it.emoji}</span>
              <div><b>${it.name}</b><small>${it.meta}</small></div>
            </div>
          `).join('')}
        </div>
      `;
    }, 850);
  });
});

/* Live order tracker demo */
const steps = document.querySelectorAll('.t-step');
const trackerFill = document.getElementById('trackerFill');
const tmRider = document.getElementById('tmRider');
const etaLabel = document.getElementById('etaLabel');
const etaMin = document.getElementById('etaMin');

const fillLevels = [10, 32, 55, 78, 100];
const riderPositions = [8, 8, 30, 55, 88];
const etaValues = [22, 18, 12, 6, 0];
let trackerStage = 0;

function renderTracker(stage) {
  steps.forEach((step, i) => {
    step.classList.remove('done', 'current');
    if (i < stage) step.classList.add('done');
    if (i === stage) step.classList.add('current');
  });
  if (trackerFill) trackerFill.style.width = fillLevels[stage] + '%';
  if (tmRider) tmRider.style.left = riderPositions[stage] + '%';
  if (etaMin) etaMin.textContent = etaValues[stage];
  if (etaLabel) {
    etaLabel.textContent = stage >= 4 ? 'Delivered' : `Arriving in ${etaValues[stage]} min`;
  }
}

renderTracker(trackerStage);

const trackerTimer = setInterval(() => {
  trackerStage += 1;
  if (trackerStage > 4) {
    trackerStage = 0;
  }
  renderTracker(trackerStage);
}, 3200);

/* Smooth-scroll active nav state */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('#primaryNav a').forEach(a => a.classList.remove('selected'));
  });
});
