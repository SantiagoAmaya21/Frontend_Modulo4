'use client';

import { useState } from 'react';
import { returnLoan } from '@/lib/loan';
import Notification from './Notification';

export default function ReturnForm() {
  const [loanId, setLoanId] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [observations, setObservations] = useState('');
  const [message, setMessage] = useState('');

  // Obtenemos el id del funcionario que confirma la devolución
  const confirmedReturnBy = localStorage.getItem('userId') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await returnLoan({ loanId, returnStatus, confirmedReturnBy, observations });
      setMessage('Devolución registrada exitosamente');
    } catch (err: any) {
      setMessage(err.response?.data || 'Error en la devolución');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-3">
      <h2 className="text-xl mb-2">Registrar Devolución</h2>

      <input
        placeholder="ID Préstamo"
        value={loanId}
        onChange={e => setLoanId(e.target.value)}
        required
        className="block w-full p-2 border rounded"
      />

      <label htmlFor="returnStatus">Estado del equipo devuelto:</label>
      <select
        id="returnStatus"
        value={returnStatus}
        onChange={e => setReturnStatus(e.target.value)}
        required
        className="block w-full p-2 border rounded"
      >
        <option value="" className="text-black">Selecciona un estado</option>
        <option value="GOODSTATUS" className="text-black">GOODSTATUS</option>
        <option value="DAMAGED" className="text-black">DAMAGED</option>
      </select>

      <textarea
        placeholder="Observaciones"
        value={observations}
        onChange={e => setObservations(e.target.value)}
        className="block w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Registrar
      </button>

      <Notification message={message} />
    </form>
  );
}
