'use client';

import { useState } from 'react';
import { getEquipmentById } from '@/lib/equipment';

export default function EquipmentById() {
  const [equipmentId, setEquipmentId] = useState('');
  const [equipment, setEquipment] = useState<any | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!equipmentId.trim()) {
      setError('Por favor ingrese un ID de equipo');
      return;
    }

    try {
      const data = await getEquipmentById(equipmentId);
      setEquipment(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'Error al obtener el equipo');
      setEquipment(null);
    }
  };

  return (
    <div className="p-4 border rounded space-y-3">
      <h2 className="text-xl mb-2">Equipo por ID</h2>

      <input
        type="text"
        placeholder="ID del Equipo"
        value={equipmentId}
        onChange={(e) => setEquipmentId(e.target.value)}
        className="block w-full p-2 border rounded"
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Buscar
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {equipment && (
        <div
          className={`mt-4 border p-4 rounded shadow-md transition-all duration-500 ${
            equipment.available ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
          }`}
        >
          <p><strong>ID:</strong> {equipment.id}</p>
          <p><strong>Nombre:</strong> {equipment.name}</p>
          <p><strong>Descripción:</strong> {equipment.description}</p>
          <p><strong>Estado:</strong> {equipment.status}</p>
          <p><strong>Observaciones:</strong> {equipment.observations}</p>
          <p className="font-bold">
            <strong>Disponible:</strong>{' '}
            <span className={equipment.available ? 'text-green-700' : 'text-red-700'}>
              {equipment.available ? 'Sí' : 'No'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
