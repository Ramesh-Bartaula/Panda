/* =========================================================
   script.js — Will You Be Love of My Life?
   ========================================================= */

let noCount  = 0;
const MAX_NO = 15;          // No button vanishes after this many clicks
let pendingHideNo = false;  // Hide the No button after popup closes

// ── 15 emotional + sarcastic messages ───────────────────
const noMessages = [
  // 1
  `Seriously?! 😱<br>
   My heart just cracked a little right now.<br>
   Are you even <em>trying</em>?! 💔`,

  // 2
  `Oh WOW. Okay. 😭<br>
   I'll just go cry in the corner with my teddy bear.<br>
   No big deal. It's fine. <em>I'm fine.</em> 🐻`,

  // 3
  `Cool cool cool. 😤<br>
   So I guess my feelings just DON'T MATTER, huh?<br>
   This is fine. Totally. Absolutely fine. 🙃`,

  // 4
  `Did you just... No?! 🐟<br>
   Even my goldfish shows more love than this.<br>
   <em>My goldfish, bro.</em> 💔`,

  // 5
  `Fine. I'll write sad poems about this<br>
   for the next 10 years. 📝💔<br>
   Is that what you WANT? HM? 😩`,

  // 6
  `You know, my mom said you'd be perfect.<br>
   Clearly she was WRONG. 😤<br>
   <em>Thanks for nothing, universe.</em> 🌏💔`,

  // 7
  `Every time you click No,<br>
   somewhere a panda sheds a single tear. 🐼😭<br>
   Are you <em>really</em> okay with that?`,

  // 8
  `I'm not desperate... I'm just...<br>
   okay fine, I'm a <em>little</em> desperate. 🥺<br>
   PLEASE? Just... please?`,

  // 9
  `Scientists have confirmed:<br>
   clicking "No" too many times causes<br>
   irreversible damage to someone's heart. 🏥💔<br>
   Mine specifically.`,

  // 10
  `My WiFi drops less than you drop my feelings. 📶<br>
   And my WiFi is <em>terrible.</em> 😔<br>
   Just saying. OW.`,

  // 11
  `I've practiced "I love you" 47 times in the mirror.<br>
   FORTY. SEVEN. TIMES. 😭<br>
   Don't waste that. Please.`,

  // 12
  `You are REALLY testing the patience<br>
   of someone who built you a whole entire webpage. 💻😤<br>
   Do you know how long this took?!`,

  // 13
  `Okay. This is now officially the most heartbreak<br>
   per minute I have ever experienced. 📊💔<br>
   You should feel bad. Do you feel bad? You should.`,

  // 14
  `I am <em>begging</em> you. 🙏<br>
   Not for me — for the panda. For the goldfish.<br>
   For the 47 mirror rehearsals. FOR THEM. 😭`,

  // 15 — the FINAL no message before button vanishes
  `⚠️ FINAL WARNING ⚠️<br><br>
   My heart is literally on life support right now. 🏥❤️<br>
   This is your <strong>LAST CHANCE</strong>.<br>
   After this... No is gone forever.`,
];

// ── Ghibli backgrounds (official studio releases) ───────
// Initial background + one per No click (16 total)
const backgrounds = [
  // 0 — default: soft pink Spirited Away sky
  { url: 'https://www.ghibli.jp/gallery/chihiro001.jpg',
    gradient: 'linear-gradient(135deg, #f9a8d4 0%, #fce7f3 100%)' },

  // No 1 — Howl's Moving Castle meadow (hopeful but sad)
  { url: 'https://www.ghibli.jp/gallery/howl001.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },

  // No 2 — Princess Mononoke forest (deep, moody)
  { url: 'https://www.ghibli.jp/gallery/mononoke001.jpg',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },

  // No 3 — Totoro rain stop (lonely)
  { url: 'https://www.ghibli.jp/gallery/totoro001.jpg',
    gradient: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)' },

  // No 4 — Kiki's Delivery Service evening sky
  { url: 'https://www.ghibli.jp/gallery/kiki001.jpg',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },

  // No 5 — Nausicaä wasteland (desolate)
  { url: 'https://www.ghibli.jp/gallery/nausicaa001.jpg',
    gradient: 'linear-gradient(135deg, #544a7d 0%, #ffd452 100%)' },

  // No 6 — Castle in the Sky clouds (lonely heights)
  { url: 'https://www.ghibli.jp/gallery/castle001.jpg',
    gradient: 'linear-gradient(135deg, #2980b9 0%, #6dd5fa 50%, #ffffff 100%)' },

  // No 7 — Spirited Away 2 (deeper sadness)
  { url: 'https://www.ghibli.jp/gallery/chihiro002.jpg',
    gradient: 'linear-gradient(135deg, #1d2671 0%, #c33764 100%)' },

  // No 8 — Howl's 2 (dramatic dusk)
  { url: 'https://www.ghibli.jp/gallery/howl002.jpg',
    gradient: 'linear-gradient(135deg, #200122 0%, #6f0000 100%)' },

  // No 9 — Mononoke 2 (dark night forest)
  { url: 'https://www.ghibli.jp/gallery/mononoke002.jpg',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },

  // No 10 — Totoro 2 (stormy sky)
  { url: 'https://www.ghibli.jp/gallery/totoro002.jpg',
    gradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)' },

  // No 11 — Spirited Away 3 (dim, heavy)
  { url: 'https://www.ghibli.jp/gallery/chihiro003.jpg',
    gradient: 'linear-gradient(135deg, #3c1053 0%, #ad5389 100%)' },

  // No 12 — Howl's 3 (almost pitch dark)
  { url: 'https://www.ghibli.jp/gallery/howl003.jpg',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },

  // No 13 — Mononoke 3 (pitch dark forest)
  { url: 'https://www.ghibli.jp/gallery/mononoke003.jpg',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },

  // No 14 — Spirited Away 4 (most desolate)
  { url: 'https://www.ghibli.jp/gallery/chihiro004.jpg',
    gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' },

  // No 15 — Howl's darkest hour
  { url: 'https://www.ghibli.jp/gallery/howl004.jpg',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #6f0000 100%)' },
];

// ── Set body background (image with gradient fallback) ───
function setBackground(index) {
  const bg = backgrounds[Math.min(index, backgrounds.length - 1)];
  const img = new Image();

  img.onload = () => {
    document.body.style.transition = 'background 0.8s ease';
    document.body.style.background =
      `url('${bg.url}') center / cover no-repeat`;
  };
  img.onerror = () => {
    document.body.style.transition = 'background 1s ease';
    document.body.style.background = bg.gradient;
  };
  img.src = bg.url;
}

// ── Handle No click ───────────────────────────────────────
function handleNoClick() {
  if (noCount >= MAX_NO) return;

  const msgIndex = noCount;   // 0–14
  noCount++;

  // Change background
  setBackground(noCount);     // backgrounds[1] … backgrounds[15]

  // Show the popup
  const msgEl = document.getElementById('popup-message');
  msgEl.innerHTML = noMessages[msgIndex];
  document.getElementById('popup-overlay').classList.remove('hidden');

  // After the last No, mark that we need to hide the button on close
  if (noCount >= MAX_NO) {
    pendingHideNo = true;
  }
}

// ── Close popup ───────────────────────────────────────────
function closePopup() {
  document.getElementById('popup-overlay').classList.add('hidden');

  if (pendingHideNo) {
    pendingHideNo = false;
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
      noBtn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      noBtn.style.opacity    = '0';
      noBtn.style.transform  = 'scale(0.5) translateY(20px)';
      setTimeout(() => {
        noBtn.style.display = 'none';
        document.getElementById('only-yes-banner').classList.remove('hidden');
        document.getElementById('hint-text').textContent =
          'There is only one option left now... 💕';
      }, 650);
    }
  }
}

// ── Handle Yes click ─────────────────────────────────────
function handleYesClick() {
  window.location.href = 'yes.html';
}

// ── Music autoplay (play immediately, unmuted) ────────────
window.addEventListener('load', () => {
  const music   = document.getElementById('bg-music');
  music.volume  = 0.7;
  music.muted   = false;

  const tryPlay = () => {
    music.play().catch(() => {
      // Autoplay policy blocked it — wait for first user interaction
      const unlock = () => {
        music.play();
        document.removeEventListener('click',      unlock);
        document.removeEventListener('touchstart', unlock);
        document.removeEventListener('keydown',    unlock);
      };
      document.addEventListener('click',      unlock, { once: true });
      document.addEventListener('touchstart', unlock, { once: true });
      document.addEventListener('keydown',    unlock, { once: true });
    });
  };

  tryPlay();
});

// ── Music toggle ─────────────────────────────────────────
function toggleMusic() {
  const music = document.getElementById('bg-music');
  const btn   = document.getElementById('music-toggle');
  if (music.paused) {
    music.play();
    btn.textContent = '🔊';
  } else {
    music.pause();
    btn.textContent = '🔇';
  }
}

// ── Floating hearts animation ─────────────────────────────
(function createHearts() {
  const container = document.getElementById('hearts-bg');
  const emojis    = ['❤️','💕','💗','💖','💓','🌸','✨','🌹','💝','🫶'];

  setInterval(() => {
    const el            = document.createElement('span');
    el.className        = 'heart-particle';
    el.textContent      = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left       = Math.random() * 100 + 'vw';
    el.style.fontSize   = (14 + Math.random() * 18) + 'px';
    const dur           = 5 + Math.random() * 6;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay    = Math.random() * 2 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 2) * 1000);
  }, 650);
})();

// ── Set the initial (default) background ─────────────────
setBackground(0);
