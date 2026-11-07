// Interactive JavaScript for Manish Kumar Portfolio - Luxury Midnight & Royal Gold

document.addEventListener('DOMContentLoaded', () => {
  initTyping();
  initMobileDrawer();
  initCanvasEffect('luxury-shimmer', '#e5c07b', '#d19a66');
});

// Typing animation for subtitle
function initTyping() {
  const words = [
    'Java Full Stack Developer',
    'DevOps & Docker Specialist',
    'AWS Cloud Architect',
    'Spring Boot Microservices Expert',
    'Appletree Infotech Alumnus'
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  function type() {
    const current = words[wordIdx];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }
  type();
}

// Mobile drawer toggle
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => drawer && drawer.classList.remove('open'));
  });
}

// FAQ accordion toggle
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => {
    if (i !== item) i.classList.remove('active');
  });
  item.classList.toggle('active');
}

// Copy to clipboard helper
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard: ' + text);
  }).catch(() => {
    prompt('Copy this text:', text);
  });
}

// Contact form simulation
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  const service = document.getElementById('form-service').value;
  const status = document.getElementById('form-status');

  status.style.display = 'block';
  status.style.color = '#10b981';
  status.innerHTML = '<i class=\"fa-solid fa-circle-check\"></i> Thank you, ' + name + '! Your request for ' + service + ' has been logged. Redirecting to WhatsApp for instant chat...';

  setTimeout(() => {
    const encoded = encodeURIComponent('Hello Manish, my name is ' + name + ' and I am looking for ' + service + '. Let us discuss!');
    window.open('https://wa.me/918851961088?text=' + encoded, '_blank');
  }, 1800);
}

// Interactive Canvas Visualizations per theme
function initCanvasEffect(mode, color1, color2) {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  if (mode === 'matrix') {
    const chars = 'MANISHKUMARJAVA01018851961088SPRINGBOOTAWSREACTDOCKER';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(4, 9, 5, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color1 || '#00ff66';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(drawMatrix);
    }
    drawMatrix();
  } else if (mode === 'ghost') {
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -Math.random() * 1.2 - 0.3,
      alpha: Math.random() * 0.6 + 0.2
    }));

    function drawGhost() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color1 || '#00ffcc';
        ctx.shadowBlur = 15;
        ctx.shadowColor = color1;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      ctx.globalAlpha = 1.0;
      requestAnimationFrame(drawGhost);
    }
    drawGhost();
  } else if (mode === 'hearts') {
    const hearts = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 14 + 8,
      vy: -Math.random() * 1 - 0.4,
      rot: Math.random() * Math.PI,
      alpha: Math.random() * 0.5 + 0.3
    }));

    function drawHearts() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(h => {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rot);
        ctx.globalAlpha = h.alpha;
        ctx.fillStyle = color1 || '#ff6b9d';
        ctx.font = h.size + 'px serif';
        ctx.fillText('💖', 0, 0);
        ctx.restore();

        h.y += h.vy;
        if (h.y < -20) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawHearts);
    }
    drawHearts();
  } else if (mode === 'bubbles') {
    const bubbles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 18 + 6,
      vy: -Math.random() * 1.2 - 0.5,
      color: Math.random() > 0.5 ? color1 : color2
    }));

    function drawBubbles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = 0.25;
        ctx.fill();
        ctx.strokeStyle = b.color;
        ctx.globalAlpha = 0.6;
        ctx.stroke();

        b.y += b.vy;
        if (b.y + b.r < 0) {
          b.y = canvas.height + b.r;
          b.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawBubbles);
    }
    drawBubbles();
  } else if (mode === 'tricolor') {
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      c: ['#FF9933', '#000080', '#138808'][Math.floor(Math.random() * 3)]
    }));

    function drawTricolor() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      requestAnimationFrame(drawTricolor);
    }
    drawTricolor();
  } else {
    // Default star / ambient particle canvas
    const dots = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.2
    }));

    function drawAmbient() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = color1 || '#38bdf8';
        ctx.globalAlpha = d.alpha;
        ctx.fill();
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
      });
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }
}
