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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow-sm space-y-4"
    >
      <h2 className="text-xl font-bold text-[#990000]">Actualizar Estado de Equipo</h2>

      <input
        type="text"
        placeholder="ID del equipo"
        value={equipmentId}
        onChange={(e) => setEquipmentId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-black"
      >
        <option value="">Selecciona un estado</option>
        <option value="GOODSTATUS">GOODSTATUS</option>
        <option value="DAMAGED">DAMAGED</option>
        <option value="MAINTENANCE">MAINTENANCE</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
      >
        Actualizar
      </button>

      {message && <Notification message={message} />}
    </form>
  );
}
