'use client';

import { useState } from 'react';
import { updateEquipmentStatus, disableEquipment, enableEquipment } from '@/lib/equipment';
import Notification from './Notification';

export default function EquipmentStatusForm() {
  const [equipmentId, setEquipmentId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (newStatus === 'DAMAGED' || newStatus === 'MAINTENANCE') {
        await disableEquipment(equipmentId);
      } else {
        await enableEquipment(equipmentId);
      }
      await updateEquipmentStatus({ equipmentId, newStatus });
      setMessage('Estado actualizado correctamente');
    } catch (err: any) {
      setMessage(err.response?.data || 'Error al actualizar estado');
    }
  };

  const isDisabled = !equipmentId || !newStatus;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow-sm space-y-4"
    >
      <h2 className="text-xl font-bold text-[#990000] mb-2">Actualizar Estado de Equipo</h2>
      <p className="text-sm text-gray-600 mb-6">Ingrese el ID del equipo y seleccione el nuevo estado</p>

      <div>
        <label className="text-sm font-medium text-[#990000]">ID del equipo</label>
        <input
          type="text"
          placeholder="ID del equipo"
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none text-gray-600 placeholder-gray-600"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[#990000]">Nuevo estado</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md text-gray-600 outline-none"
          required
        >
          <option value="">Selecciona un estado</option>
          <option value="GOODSTATUS">GOODSTATUS</option>
          <option value="DAMAGED">DAMAGED</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className={`w-full py-2 rounded-md font-semibold transition ${
          isDisabled
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-[#990000] text-white hover:bg-red-600 hover:text-black'
        }`}
      >
        Actualizar
      </button>

      {message && <Notification message={message} />}
    </form>
  );
}
