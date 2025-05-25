// ui.js
export function showAlert(message, type) {
  const alertEl = document.getElementById('alert') || _crearElementoAlert();
  alertEl.textContent = message;
  alertEl.className = `alert alert-${type}`;
  alertEl.style.display = 'block';

  setTimeout(() => {
    alertEl.style.opacity = '0';
    setTimeout(() => {
      alertEl.style.display = 'none';
      alertEl.style.opacity = '1';
    }, 300);
  }, 2700);
}

//creamos mensajes de alerta
function _crearElementoAlert() {
  const alertEl = document.createElement('div');
  alertEl.id = 'alert';
  alertEl.className = 'alert';
  document.body.prepend(alertEl);
  return alertEl;
}
