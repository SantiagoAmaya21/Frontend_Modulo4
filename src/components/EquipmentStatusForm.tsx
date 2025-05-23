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
      if (newStatus === 'DAMAGED' || newStatus === 'MAINTENANCE'){
          await disableEquipment(equipmentId);
      } else {
          await enableEquipment(equipmentId);
      }
      await updateEquipmentStatus({ equipmentId, newStatus });
      setMessage('Estado actualizado');
    } catch (err: any) {
      setMessage(err.response?.data || 'Error al actualizar estado');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl mb-2">Actualizar Estado de Equipo</h2>
      <input
            type= "text"
            placeholder="ID Equipo"
            value={equipmentId}
            onChange={e => setEquipmentId(e.target.value)}
            className="block w-full p-2 border rounded"
      />
      <select
        value={newStatus}
        onChange={e => setNewStatus(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full"
      >
        <option value="" className="text-black">Selecciona un estado</option>
        <option value="GOODSTATUS" className="text-black">GOODSTATUS</option>
          <option value="DAMAGED" className="text-black">DAMAGED</option>
          <option value="MAINTENANCE" className="text-black">MAINTENANCE</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
      <Notification message={message} />
    </form>
  );
}
