// utils.js
export function formatMoney(amount) {
  return new Intl.NumberFormat('es-CO').format(amount);
}

export function formatTarjeta(numero) {
  return numero.replace(/(\d{4})/g, '$1 ').trim();
}
// formatea el cupo de forma correcta
export function formatCupoUtilizado(total, disponible) {
  const utilizado = total - disponible;
  const style = utilizado < 0 ? 'color: #e74c3c;' : '';
  return `<span style="${style}">$${formatMoney(Math.abs(utilizado))}</span>`;
}
