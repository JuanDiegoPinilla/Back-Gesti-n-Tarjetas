// main.js
import { CreditCardManager } from './credit-card-manager.js';
import { validarFecha } from './validation.js';
// nuevos cambios a realizar
// 1) Crear una instancia de CreditCardManager
const app = new CreditCardManager();
window.app = app;
// Pasos del script
// 1) Número de tarjeta: bloques de 4 dígitos con espacios
const inputTarjeta = document.getElementById('numeroTarjeta');
inputTarjeta.addEventListener('input', e => {
  let digits = e.target.value.replace(/\D/g, '').slice(0, 16);
  let blocks = digits.match(/.{1,4}/g);
  e.target.value = blocks ? blocks.join(' ') : digits;
});

// 2) Vencimiento: MM/AA automático
const inputVenc = document.getElementById('vencimientoTarjeta');
inputVenc.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = v.slice(0,5);
});

// 3) Identificación: sólo dígitos y máximo 10 caracteres
const inputId = document.getElementById('idCliente');
inputId.addEventListener('input', e => {
  // elimina no-dígitos y corta a 10 caracteres
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
});

// 4) Cupo total y disponible: sólo dígitos, permite borrar correctamente
['cupoTotal', 'cupoDisponible'].forEach(id => {
  const inp = document.getElementById(id);
  inp.addEventListener('input', e => {
    // elimina todo lo que no sea dígito y cero a la izquierda
    let v = e.target.value.replace(/\D/g, '');
    // opcional: quita ceros iniciales (si no los quieres):
    // v = v.replace(/^0+/, '');
    e.target.value = v;
  });
});

// 5) Validación extra al enviar
const form = document.getElementById('formularioRegistro');
form.addEventListener('submit', e => {
  // Fecha
  const venc = document.getElementById('vencimientoTarjeta').value;
  if (!validarFecha(venc)) {
    alert('Fecha de vencimiento inválida o expirada.');
    e.preventDefault();
    return;
  }
  // Cupos no vacíos y numéricos
  const ct = document.getElementById('cupoTotal').value;
  const cd = document.getElementById('cupoDisponible').value;
  if (ct === '' || cd === '') {
    alert('Los cupos no pueden quedar vacíos.');
    e.preventDefault();
    return;
  }
  // Le dejamos a CreditCardManager el resto de la lógica
});

inputVenc.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = v.slice(0,5);
});
