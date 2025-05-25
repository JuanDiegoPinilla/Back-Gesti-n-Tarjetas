// validation.js

// Valida formato MM/AA y que no esté expirado
export function validarFecha(fecha) {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(fecha)) return false;
 
  const [mes, aa] = fecha.split('/');
  const año = 2000 + parseInt(aa, 10);
  const vencimiento = new Date(año, mes, 0); // último día de mes
  return vencimiento >= new Date();
}
// Valida que el cupo total y disponible sean numéricos

// Comprueba duplicados quitando espacios
export function isTarjetaDuplicada(registros, numeroTarjeta) {
  const raw = numeroTarjeta.replace(/\s+/g, '');
  return registros.some(r =>
    r.numeroTarjeta.replace(/\s+/g, '') === raw &&
    r.estado === 'ACTIVO'
  );
}

// Determina franquicia según prefijo
export function determinarFranquicia(numeroTarjeta) {
  const raw = numeroTarjeta.replace(/\D/g, '');
  if (raw.startsWith('4')) return 'VISA';
  if (raw.startsWith('5')) return 'MASTERCARD';
  if (raw.startsWith('3')) return 'AMERICAN EXPRESS';
  return 'OTRA';
}
// Valida que el cupo total sea mayor o igual al disponible