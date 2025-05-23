'use client';

import { useState, useEffect } from 'react';
import { createLoan } from '@/lib/loan';
import Notification from './Notification';
import { getAvailableEquipment } from '@/lib/equipment';

export default function LoanForm() {
  const [form, setForm] = useState({
    equipmentId: '',
    loanDateTime: '',
    returnDueDateTime: '',
  });
  const [message, setMessage] = useState('');
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    // Obtener la lista de equipos disponibles al cargar el componente
    const fetchEquipment = async () => {
      try {
        const equipment = await getAvailableEquipment();
        setEquipmentList(equipment);
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    };

    fetchEquipment();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loanDurationHours =
        (new Date(form.returnDueDateTime).getTime() - new Date(form.loanDateTime).getTime()) /
        (1000 * 60 * 60);

      const loanData = {
        ...form,
        userId: localStorage.getItem('userId') || '',
        loanDurationHours,
      };

      await createLoan(loanData);
      setMessage('Préstamo creado exitosamente');
    } catch (err: any) {
      setMessage(err.response?.data || 'Error al crear el préstamo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl mb-2">Registrar Préstamo</h2>

      <label htmlFor="equipment">Equipo:</label>
      <select
        id="equipment"
        value={form.equipmentId}
        onChange={(e) => setForm({ ...form, equipmentId: e.target.value })}
        required
        className="block w-full p-2 border rounded mb-2"
      >
        <option value="">Seleccione un equipo</option>
        {equipmentList.map((eq: any) => (
          <option key={eq.id} value={eq.id}>
            {eq.name} (ID: {eq.id})
          </option>
        ))}
      </select>

      <label htmlFor="loanDateTime">Fecha y hora de préstamo:</label>
      <input
        type="datetime-local"
        id="loanDateTime"
        value={form.loanDateTime}
        onChange={(e) => setForm({ ...form, loanDateTime: e.target.value })}
        required
        className="block w-full p-2 border rounded mb-2"
      />

      <label htmlFor="returnDueDateTime">Fecha y hora de devolución:</label>
      <input
        type="datetime-local"
        id="returnDueDateTime"
        value={form.returnDueDateTime}
        onChange={(e) => setForm({ ...form, returnDueDateTime: e.target.value })}
        required
        className="block w-full p-2 border rounded mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Enviar
      </button>

      <Notification message={message} />
    </form>
  );
}
