'use client';

import { useState } from 'react';
import { addEquipment } from '@/lib/equipment';

export default function AddEquipmentForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [observations, setObservations] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      setError('Nombre y descripción son obligatorios');
      return;
    }

    try {
      await addEquipment({ name, description, observations });
      setSuccess(true);
      setError('');
      setName('');
      setDescription('');
      setObservations('');
    } catch (err: any) {
      setError(err.response?.data || 'Error al agregar el equipo');
      setSuccess(false);
    }
  };

  return (
    <div className="p-4 border rounded space-y-3">
      <h2 className="text-xl mb-2">Agregar Nuevo Equipo</h2>

      <input
        type="text"
        placeholder="Nombre del equipo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Observaciones"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Registrar Equipo
      </button>

      {success && <p className="text-green-600">¡Equipo registrado exitosamente!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
