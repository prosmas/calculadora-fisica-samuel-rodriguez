// ============================================================
//  MAGNITUDES FÍSICAS — script.js
//  Samuel David Rodriguez Rodriguez
// ============================================================

/* ---- Cursor personalizado ---- */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let mouseX = -100, mouseY = -100;
let trailX = -100, trailY = -100;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();

/* ---- Canvas de fondo (partículas conectadas) ---- */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;
  const COUNT   = 55;
  const MAXDIST = 150;
  const COLOR   = '26, 26, 42';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.5 + 0.5,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, 0.5)`;
      ctx.fill();
    });
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAXDIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${COLOR}, ${(1 - d / MAXDIST) * 0.25})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  initParticles();
  draw();
  window.addEventListener('resize', () => { resize(); initParticles(); });
})();

/* ---- Scroll reveal para secciones ---- */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.calc-section').forEach(s => observer.observe(s));
})();

/* ---- Nav lateral activo según scroll ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('.calc-section');
  const links    = document.querySelectorAll('.side-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.5) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

/* ---- Enter dispara cálculo ---- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.calc-section').forEach(sec => {
    const inputs = sec.querySelectorAll('input');
    const btn    = sec.querySelector('.btn-run');
    inputs.forEach(inp => {
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
    });
  });
});

/* ============================================================
   UTILIDADES DE VALIDACIÓN
   ============================================================ */
function getVal(id, nombre, resId, noZero = false, soloPositivo = false) {
  const el  = document.getElementById(id);
  const raw = el.value.trim();

  if (raw === '') {
    mostrar(resId, `El campo "${nombre}" no puede estar vacío.`, true);
    el.focus();
    return null;
  }

  const n = parseFloat(raw);
  if (isNaN(n)) {
    mostrar(resId, `"${nombre}" debe ser un número válido.`, true);
    return null;
  }
  if (noZero && n === 0) {
    mostrar(resId, `"${nombre}" no puede ser cero — produciría una división por cero.`, true);
    return null;
  }
  if (soloPositivo && n < 0) {
    mostrar(resId, `"${nombre}" debe ser un valor positivo (${n} no es válido).`, true);
    return null;
  }
  return n;
}

function mostrar(id, texto, esError = false) {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.className = 'result-zone ' + (esError ? 'error' : 'success');
}

function fmt(n) {
  if (Math.abs(n) < 1e-4 || Math.abs(n) >= 1e7)
    return n.toExponential(4);
  return parseFloat(n.toFixed(5)).toString();
}

/* ============================================================
   01  VELOCIDAD   v = d / t
   ============================================================ */
function calcVelocidad() {
  const RES = 'res-velocidad';
  const d   = getVal('vel-d', 'distancia d', RES);
  if (d === null) return;
  const t = getVal('vel-t', 'tiempo t', RES, true);
  if (t === null) return;

  mostrar(RES, `Velocidad  v = ${fmt(d / t)} m/s`);
}

/* ============================================================
   02  ACELERACIÓN   a = Δv / Δt
   ============================================================ */
function calcAceleracion() {
  const RES = 'res-aceleracion';
  const dv  = getVal('acel-dv', 'cambio de velocidad Δv', RES);
  if (dv === null) return;
  const dt = getVal('acel-dt', 'intervalo de tiempo Δt', RES, true);
  if (dt === null) return;

  mostrar(RES, `Aceleración  a = ${fmt(dv / dt)} m/s²`);
}

/* ============================================================
   03  FUERZA   F = m · a
   ============================================================ */
function calcFuerza() {
  const RES = 'res-fuerza';
  const m   = getVal('fza-m', 'masa m', RES, false, true);
  if (m === null) return;
  const a = getVal('fza-a', 'aceleración a', RES);
  if (a === null) return;

  mostrar(RES, `Fuerza  F = ${fmt(m * a)} N`);
}

/* ============================================================
   04  TRABAJO   W = F · d · cos(θ)
   ============================================================ */
function calcTrabajo() {
  const RES   = 'res-trabajo';
  const F     = getVal('trab-f',     'fuerza F',      RES); if (F     === null) return;
  const d     = getVal('trab-d',     'distancia d',   RES); if (d     === null) return;
  const theta = getVal('trab-theta', 'ángulo θ',      RES); if (theta === null) return;

  if (theta < 0 || theta > 360) {
    mostrar(RES, `El ángulo θ debe estar entre 0° y 360° (ingresaste ${theta}°).`, true);
    return;
  }
  mostrar(RES, `Trabajo  W = ${fmt(F * d * Math.cos(theta * Math.PI / 180))} J`);
}

/* ============================================================
   05  ENERGÍA CINÉTICA   K = ½ · m · v²
   ============================================================ */
function calcEnergiaCinetica() {
  const RES = 'res-ec';
  const m   = getVal('ec-m', 'masa m',       RES, false, true); if (m === null) return;
  const v   = getVal('ec-v', 'velocidad v',  RES);              if (v === null) return;

  mostrar(RES, `Energía cinética  K = ${fmt(0.5 * m * v * v)} J`);
}

/* ============================================================
   06  ENERGÍA POTENCIAL   U = m · g · h
   ============================================================ */
function calcEnergiaPotencial() {
  const RES = 'res-ep';
  const m   = getVal('ep-m', 'masa m',     RES, false, true); if (m === null) return;
  const g   = getVal('ep-g', 'gravedad g', RES, true);        if (g === null) return;
  const h   = getVal('ep-h', 'altura h',   RES);              if (h === null) return;

  mostrar(RES, `Energía potencial  U = ${fmt(m * g * h)} J`);
}

/* ============================================================
   07  DENSIDAD   ρ = m / V
   ============================================================ */
function calcDensidad() {
  const RES = 'res-densidad';
  const m   = getVal('den-m', 'masa m',     RES, false, true); if (m === null) return;
  const V   = getVal('den-v', 'volumen V',  RES, true,  true); if (V === null) return;

  mostrar(RES, `Densidad  ρ = ${fmt(m / V)} kg/m³`);
}

/* ============================================================
   08  PRESIÓN   P = F / A
   ============================================================ */
function calcPresion() {
  const RES = 'res-presion';
  const F   = getVal('pre-f', 'fuerza F', RES);              if (F === null) return;
  const A   = getVal('pre-a', 'área A',   RES, true, true);  if (A === null) return;

  mostrar(RES, `Presión  P = ${fmt(F / A)} Pa`);
}

/* ============================================================
   09  CARGA ELÉCTRICA   q = I · t
   ============================================================ */
function calcCarga() {
  const RES = 'res-carga';
  const I   = getVal('car-i', 'corriente I', RES, false, true); if (I === null) return;
  const t   = getVal('car-t', 'tiempo t',    RES, false, true); if (t === null) return;

  mostrar(RES, `Carga eléctrica  q = ${fmt(I * t)} C`);
}

/* ============================================================
   10  LEY DE OHM   V = I · R
   ============================================================ */
function calcOhm() {
  const RES = 'res-ohm';
  const I   = getVal('ohm-i', 'corriente I',   RES, false, true); if (I === null) return;
  const R   = getVal('ohm-r', 'resistencia R', RES, false, true); if (R === null) return;

  mostrar(RES, `Tensión  V = ${fmt(I * R)} V`);
}
