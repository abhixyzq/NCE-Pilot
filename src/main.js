import './style.css';
import { renderLanding } from './views/landing.js';
import { renderAuth } from './views/auth.js';
import { renderDashboard } from './views/dashboard.js';
import { renderEditor, initTimer } from './views/editor.js';

function router() {
  const app = document.getElementById('app');
  const hash = window.location.hash.replace('#', '') || 'landing';

  window.scrollTo(0, 0);

  if (hash === 'auth') {
    app.innerHTML = renderAuth();
  } else if (hash === 'dashboard') {
    app.innerHTML = renderDashboard();
  } else if (hash === 'editor') {
    app.innerHTML = renderEditor();
    initTimer();
  } else {
    app.innerHTML = renderLanding();
  }
}

// Initial routing
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
