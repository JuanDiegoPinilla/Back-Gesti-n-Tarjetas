// ui.js
let alertTimeout;

export function showAlert(message, type) {
  const alertEl = document.getElementById('alert') || _crearElementoAlert();

  // Cancelar cualquier timeout anterior
  clearTimeout(alertTimeout);

  alertEl.textContent = message;
  alertEl.className = `alert alert-${type}`;
  alertEl.style.display = 'block';
  alertEl.style.opacity = '1';
  alertEl.style.transform = 'translateY(0)';

  alertTimeout = setTimeout(() => {
    alertEl.style.opacity = '0';
    alertEl.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      alertEl.style.display = 'none';
      alertEl.style.opacity = '1';
      alertEl.style.transform = 'translateY(0)';
    }, 300);
  }, 2700);
}

function _crearElementoAlert() {
  const alertEl = document.createElement('div');
  alertEl.id = 'alert';
  alertEl.className = 'alert';
  alertEl.setAttribute('role', 'alert');
  alertEl.style.position = 'fixed';
  alertEl.style.top = '20px';
  alertEl.style.left = '50%';
  alertEl.style.transform = 'translateX(-50%)';
  alertEl.style.padding = '10px 20px';
  alertEl.style.borderRadius = '5px';
  alertEl.style.zIndex = '1000';
  alertEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  alertEl.style.display = 'none';
  document.body.prepend(alertEl);
  return alertEl;
}
