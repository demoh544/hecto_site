// Honor 8X Unlock Guide - Main JS

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Highlight active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Progress checklist with localStorage
  const checks = document.querySelectorAll('.check-item input[type="checkbox"]');
  if (checks.length) {
    checks.forEach(cb => {
      const key = 'honor8x_' + cb.dataset.key;
      cb.checked = localStorage.getItem(key) === 'true';
      cb.addEventListener('change', () => {
        localStorage.setItem(key, cb.checked);
        updateProgress();
      });
    });
    updateProgress();
  }

  function updateProgress() {
    const total = checks.length;
    const done = [...checks].filter(c => c.checked).length;
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    if (bar) {
      const pct = total ? Math.round((done / total) * 100) : 0;
      bar.style.width = pct + '%';
      if (text) text.textContent = `${done} / ${total} (${pct}%)`;
    }
  }

  // Contact form (demo with localStorage)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      if (!name || !email || !msg) {
        showFormMsg('Заполните все поля', 'error');
        return;
      }
      const messages = JSON.parse(localStorage.getItem('honor8x_messages') || '[]');
      messages.push({ name, email, msg, date: new Date().toISOString() });
      localStorage.setItem('honor8x_messages', JSON.stringify(messages));
      form.reset();
      showFormMsg('Сообщение сохранено локально (демо). Спасибо!', 'success');
    });
  }

  function showFormMsg(text, type) {
    const el = document.getElementById('form-msg');
    if (!el) return;
    el.textContent = text;
    el.className = 'form-msg show alert-' + (type === 'error' ? 'danger' : 'success');
    setTimeout(() => el.classList.remove('show'), 4000);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});