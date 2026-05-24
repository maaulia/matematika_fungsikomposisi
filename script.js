/* ══════════════════════════════════════════
   MatIka — Fungsi Komposisi
   script.js
══════════════════════════════════════════ */

/* ── 1. ANIMATED CANVAS BACKGROUND ── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  const COLORS = ['#D4607A', '#A38893', '#8B445C', '#E8A0AF', '#735453'];

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: randomBetween(0, W),
        y: randomBetween(0, H),
        r: randomBetween(1.5, 4.5),
        dx: randomBetween(-0.3, 0.3),
        dy: randomBetween(-0.25, 0.25),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: randomBetween(0.15, 0.45),
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  draw();
})();


/* ── 2. SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();


/* ── 3. MATERI ACCORDION ── */
(function () {
  document.querySelectorAll('.materi-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.materi-card');
      const isOpen = card.classList.contains('open');

      // tutup semua dulu
      document.querySelectorAll('.materi-card.open').forEach(c => c.classList.remove('open'));

      // buka yang diklik (kecuali sudah terbuka)
      if (!isOpen) card.classList.add('open');
    });
  });
})();


/* ── 4. QUIZ ── */
(function () {
  const quizData = [
    {
      q: 'Jika f(x) = 2x + 1 dan g(x) = x², maka (f ∘ g)(3) adalah...',
      opts: ['18', '19', '20', '21'],
      ans: 1,
      explain: 'g(3) = 9, lalu f(9) = 2(9)+1 = 19 ✓'
    },
    {
      q: 'Jika f(x) = x + 3 dan g(x) = 2x − 1, maka (g ∘ f)(x) adalah...',
      opts: ['2x + 5', '2x + 3', '2x − 5', '2x + 7'],
      ans: 0,
      explain: 'g(f(x)) = g(x+3) = 2(x+3)−1 = 2x+5 ✓'
    },
    {
      q: 'Manakah sifat yang TIDAK dimiliki fungsi komposisi?',
      opts: ['Asosiatif', 'Komutatif', 'Memiliki elemen identitas', 'Hasil berupa fungsi baru'],
      ans: 1,
      explain: 'Fungsi komposisi TIDAK komutatif: (f∘g)(x) ≠ (g∘f)(x) ✓'
    },
    {
      q: 'Jika f(x) = x² dan g(x) = x + 2, maka (f ∘ g)(0) adalah...',
      opts: ['2', '4', '0', '6'],
      ans: 1,
      explain: 'g(0) = 2, lalu f(2) = 4 ✓'
    },
    {
      q: 'Jika (f ∘ g)(x) = 4x² + 1 dan g(x) = 2x, maka f(x) adalah...',
      opts: ['x² + 1', '2x² + 1', '4x + 1', 'x + 1'],
      ans: 0,
      explain: 'Misalkan t = 2x → x = t/2, maka f(t) = 4(t/2)²+1 = t²+1 ✓'
    },
    {
      q: 'Domain dari (f ∘ g)(x) = √(x − 5) adalah...',
      opts: ['x ≥ 5', 'x > 5', 'x ≤ 5', 'semua bilangan real'],
      ans: 0,
      explain: 'Agar akar terdefinisi, x − 5 ≥ 0, jadi x ≥ 5 ✓'
    },
    {
      q: 'Jika f(x) = 3x dan g(x) = x + 4, maka (f ∘ g)(2) adalah...',
      opts: ['10', '16', '18', '14'],
      ans: 2,
      explain: 'g(2) = 6, lalu f(6) = 3(6) = 18 ✓'
    },
    {
      q: 'Fungsi identitas I(x) = x berlaku bahwa (f ∘ I)(x) = ...',
      opts: ['I(x)', 'f(x)', 'x + f(x)', '0'],
      ans: 1,
      explain: '(f ∘ I)(x) = f(I(x)) = f(x) ✓'
    },
    {
      q: 'Jika f(x) = 2x − 1 dan g(x) = x + 3, dan (f ∘ g)(a) = 11, maka a adalah...',
      opts: ['2', '3', '4', '5'],
      ans: 1,
      explain: 'f(g(a)) = 2(a+3)−1 = 2a+5 = 11 → 2a = 6 → a = 3 ✓'
    },
    {
      q: 'Jika f(x) = x² + 2 dan g(x) = 3x, maka (f ∘ g)(2) adalah...',
      opts: ['38', '36', '40', '34'],
      ans: 0,
      explain: 'g(2) = 6, lalu f(6) = 36+2 = 38 ✓'
    },
  ];

  const slides     = document.querySelectorAll('.quiz-slide');
  const scoreBox   = document.querySelector('.quiz-score');
  const progressFill = document.querySelector('.quiz-progress-fill');
  const scoreNum   = document.querySelector('.score-num');
  const scoreSub   = document.querySelector('.score-sub');
  const restartBtn = document.querySelector('.quiz-restart');

  let current = 0, score = 0;

  function loadSlide(idx) {
    const slide = slides[idx];
    const data  = quizData[idx];

    slide.querySelector('.quiz-num').textContent  = `Soal ${idx + 1} dari ${quizData.length}`;
    slide.querySelector('.quiz-question').textContent = data.q;

    const btns = slide.querySelectorAll('.options button');
    btns.forEach((btn, i) => {
      btn.textContent = data.opts[i];
      btn.className   = '';
      btn.disabled    = false;
      btn.onclick     = () => answer(slide, btns, i, data, idx);
    });

    const fb   = slide.querySelector('.quiz-feedback');
    fb.textContent = '';
    fb.className   = 'quiz-feedback';

    const next = slide.querySelector('.quiz-next');
    next.textContent = idx < quizData.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil 🏆';
    next.classList.remove('show');
    next.onclick = () => goNext(idx);

    progressFill.style.width = `${(idx / quizData.length) * 100}%`;
    slide.classList.add('active');
  }

  function answer(slide, btns, chosen, data, idx) {
    btns.forEach(b => b.disabled = true);
    const isCorrect = chosen === data.ans;
    btns[chosen].classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) btns[data.ans].classList.add('correct');

    const fb = slide.querySelector('.quiz-feedback');
    fb.textContent = isCorrect ? '✓ Benar! ' + data.explain : '✗ Kurang tepat. ' + data.explain;
    fb.className   = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');

    if (isCorrect) score++;
    slide.querySelector('.quiz-next').classList.add('show');
  }

  function goNext(idx) {
    slides[idx].classList.remove('active');
    current = idx + 1;

    if (current < quizData.length) {
      loadSlide(current);
    } else {
      showScore();
    }
  }

  function showScore() {
    progressFill.style.width = '100%';
    scoreBox.classList.add('active');

    scoreNum.textContent = `${score} / ${quizData.length}`;

    const pct = (score / quizData.length) * 100;
    let msg, emoji;
    if (pct === 100) { emoji = '🏆'; msg = 'Sempurna! Kamu benar-benar menguasai fungsi komposisi!'; }
    else if (pct >= 80) { emoji = '🎉'; msg = 'Bagus sekali! Tinggal sedikit lagi sempurna.'; }
    else if (pct >= 60) { emoji = '👍'; msg = 'Cukup baik! Coba ulangi materi yang kurang dipahami.'; }
    else if (pct >= 40) { emoji = '📖'; msg = 'Perlu belajar lebih lagi. Yuk ulangi dari awal!'; }
    else { emoji = '💪'; msg = 'Jangan menyerah! Baca materi dulu lalu coba lagi.'; }

    document.querySelector('.score-emoji').textContent = emoji;
    scoreSub.textContent = msg;
  }

  function init() {
    score = 0; current = 0;
    slides.forEach(s => s.classList.remove('active'));
    scoreBox.classList.remove('active');
    progressFill.style.width = '0%';
    loadSlide(0);
  }

  restartBtn.addEventListener('click', () => {
    scoreBox.classList.remove('active');
    init();
  });

  // mulai
  init();
})();