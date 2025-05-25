// credit-card-manager.js
import { StorageManager } from './storage.js';
import { validarFecha, isTarjetaDuplicada, determinarFranquicia } from './validation.js';
import { formatMoney, formatTarjeta, formatCupoUtilizado } from './utils.js';
import { showAlert } from './ui.js';

export class CreditCardManager {
  constructor() {
    this.registros = StorageManager.getRegistros();
    this.form = document.getElementById('formularioRegistro');
    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.tableBody = document.getElementById('tablaRegistros').querySelector('tbody');
    this.showRecordsBtn = document.getElementById('showRecords');
    this.recordsTable = document.getElementById('tablaRegistros');
    this.toggleInactivosCheckbox = document.getElementById('mostrarInactivos');

    this.editingIndex = null;

    this._initEventListeners();
    this._renderTable();
  }

  _initEventListeners() {
    this.form.addEventListener('submit', e => this._handleSubmit(e));
    this.showRecordsBtn.addEventListener('click', () => this._toggleTable());
    if (this.toggleInactivosCheckbox) {
      this.toggleInactivosCheckbox.addEventListener('change', () => this._renderTable());
    }
  }

  _toggleTable() {
    this.recordsTable.classList.toggle('oculto');
    this.showRecordsBtn.innerHTML = this.recordsTable.classList.contains('oculto')
      ? '<i class="fas fa-table"></i> Mostrar registros'
      : '<i class="fas fa-times"></i> Ocultar registros';
  }

  _handleSubmit(e) {
    e.preventDefault();

    const data = {
      clienteId:      document.getElementById('idCliente').value,
      nombre:         document.getElementById('nombreCliente').value,
      email:          document.getElementById('correoCliente').value,
      numeroTarjeta:  document.getElementById('numeroTarjeta').value,
      fechaVencimiento: document.getElementById('vencimientoTarjeta').value,
      cupoTotal:      parseFloat(document.getElementById('cupoTotal').value),
      cupoDisponible: parseFloat(document.getElementById('cupoDisponible').value),
      estado:         'ACTIVO',
      fechaRegistro:  new Date().toISOString()
    };

    if (!validarFecha(data.fechaVencimiento)) {
      showAlert('Formato de fecha inválido o expirado', 'error');
      return;
    }
    if (data.cupoDisponible > data.cupoTotal) {
      showAlert('Cupo disponible no puede superar el total', 'error');
      return;
    }

    if (this.editingIndex === null && isTarjetaDuplicada(this.registros, data.numeroTarjeta)) {
      showAlert('El número de tarjeta ya existe', 'error');
      return;
    }

    data.franquicia = determinarFranquicia(data.numeroTarjeta);
    data.cupoUtilizado = data.cupoTotal - data.cupoDisponible;

    if (this.editingIndex !== null) {
      this.registros[this.editingIndex] = {
        ...this.registros[this.editingIndex],
        ...data
      };
      showAlert('Registro actualizado', 'success');
      this.submitBtn.textContent = 'Guardar registro';
      this.editingIndex = null;
    } else {
      this.registros.unshift(data);
      showAlert('Registro guardado', 'success');
    }

    StorageManager.saveRegistros(this.registros);
    this._renderTable();
    this.form.reset();
  }

  _renderTable() {
    this.tableBody.innerHTML = '';

    const mostrarInactivos = this.toggleInactivosCheckbox?.checked ?? false;

    this.registros.forEach((reg, idx) => {
      if (!mostrarInactivos && reg.estado === 'INACTIVO') return;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${reg.clienteId}</td>
        <td>${reg.nombre}</td>
        <td>${reg.email}</td>
        <td>${formatTarjeta(reg.numeroTarjeta)}</td>
        <td>${reg.fechaVencimiento}</td>
        <td>${reg.franquicia}</td>
        <td>$${formatMoney(reg.cupoTotal)}</td>
        <td>$${formatMoney(reg.cupoDisponible)}</td>
        <td>${formatCupoUtilizado(reg.cupoTotal, reg.cupoDisponible)}</td>
        <td>
          <span class="status-badge ${reg.estado === 'ACTIVO' ? 'status-active' : 'status-inactive'}">
            ${reg.estado}
          </span>
        </td>
        <td class="actions">
          <button class="edit-btn" data-idx="${idx}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete-btn" data-idx="${idx}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      this.tableBody.appendChild(tr);
    });

    this.tableBody.querySelectorAll('.edit-btn')
      .forEach(btn => {
        const i = parseInt(btn.dataset.idx, 10);
        if (!isNaN(i)) {
          btn.addEventListener('click', () => this.editarRegistro(i));
        }
      });

    this.tableBody.querySelectorAll('.delete-btn')
      .forEach(btn => {
        const i = parseInt(btn.dataset.idx, 10);
        if (!isNaN(i)) {
          btn.addEventListener('click', () => this.eliminarRegistro(i));
        }
      });
  }

  editarRegistro(index) {
    const reg = this.registros[index];
    if (!reg) return;

    document.getElementById('idCliente').value          = reg.clienteId;
    document.getElementById('nombreCliente').value      = reg.nombre;
    document.getElementById('correoCliente').value      = reg.email;
    document.getElementById('numeroTarjeta').value      = formatTarjeta(reg.numeroTarjeta);
    document.getElementById('vencimientoTarjeta').value = reg.fechaVencimiento;
    document.getElementById('cupoTotal').value          = reg.cupoTotal;
    document.getElementById('cupoDisponible').value     = reg.cupoDisponible;

    this.editingIndex = index;
    this.submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar';
    this.recordsTable.classList.add('oculto');
    this.showRecordsBtn.innerHTML = '<i class="fas fa-table"></i> Mostrar registros';
  }
 // Cambiamos al modo edición
  eliminarRegistro(index) {
    const reg = this.registros[index];
    if (!reg) {
      showAlert('Registro no encontrado', 'error');
      return;
    }


    // Marcamos como inactivo
    
    this.registros[index].estado = 'INACTIVO';
    StorageManager.saveRegistros(this.registros);
    showAlert('Registro eliminado', 'success');
    this._renderTable();

    const confirmado = window.confirm(`¿Estás seguro que deseas eliminar la tarjeta de ${reg.nombre}?`);

    if (confirmado) {
      this.registros[index].estado = 'INACTIVO';
      this.registros[index].fechaEliminacion = new Date().toISOString();
      StorageManager.saveRegistros(this.registros);
      showAlert('Registro marcado como eliminado', 'success');
      this._renderTable();
    } else {
      showAlert('Eliminación cancelada', 'info');
    }

  }
}
