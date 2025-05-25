// storage.js
export class StorageManager {
  static getRegistros() {
    return JSON.parse(localStorage.getItem('registros')) || [];
  }

  static saveRegistros(registros) {
    localStorage.setItem('registros', JSON.stringify(registros));
  }
}
