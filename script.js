// FleetIQ — Smart Food & Grocery Marketplace interactions

/* Mobile nav toggle (desktop hamburger, sub-1000px) */
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primaryNav');
if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    if (open) {
      primaryNav.style.cssText = 'display:flex;flex-direction:column;gap:18px;position:absolute;top:78px;left:0;right:0;background:var(--cream);padding:24px 7%;border-bottom:1px solid var(--line);z-index:39;';
    } else {
      primaryNav.removeAttribute('style');
    }
  });
  primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    primaryNav.removeAttribute('style');
  }));
}

/* Cart counter (syncs navbar + mobile tab bar) */
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
const tabCartCountEl = document.getElementById('tabCartCount');

function bumpCartCount() {
  cartCount += 1;
  [cartCountEl, tabCartCountEl].forEach(el => {
    if (!el) return;
    el.textContent = cartCount;
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  });
}

document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    bumpCartCount();
    const original = btn.textContent;
    btn.textContent = '✓';
    setTimeout(() => { btn.textContent = original; }, 900);
  });
});

/* Favourite hearts */
document.querySelectorAll('[data-fav]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.toggle('active');
  });
});

/* Category filtering on Explore Food */
const catButtons = document.querySelectorAll('.cat-pill');
const restaurantCards = document.querySelectorAll('#restaurantGrid .rest-card');

catButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    catButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    restaurantCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

/* Animated stat counters (trigger once visible) */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    counterObserver.unobserve(el);
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

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

setInterval(() => {
  trackerStage += 1;
  if (trackerStage > 4) trackerStage = 0;
  renderTracker(trackerStage);
}, 3200);

/* Mobile bottom tab bar: highlight active section on scroll */
const tabs = document.querySelectorAll('.tab-bar .tab');
const tabTargets = {
  home: document.getElementById('home'),
  explore: document.getElementById('explore'),
  cart: document.getElementById('grocery'),
  favs: document.getElementById('offers'),
  profile: document.getElementById('contact')
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    const key = Object.keys(tabTargets).find(k => tabTargets[k] && tabTargets[k].id === id);
    if (!key) return;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === key));
  });
}, { threshold: 0.5, rootMargin: '-40% 0px -40% 0px' });

Object.values(tabTargets).forEach(el => { if (el) sectionObserver.observe(el); });

/* Smooth-scroll active nav state (desktop) */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('#primaryNav a').forEach(a => a.classList.remove('selected'));
  });
});
