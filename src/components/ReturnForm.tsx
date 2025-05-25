'use client';

import { useState } from 'react';
import { returnLoan } from '@/lib/loan';
import Notification from './Notification';

export default function ReturnForm() {
  const [loanId, setLoanId] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [observations, setObservations] = useState('');
  const [message, setMessage] = useState('');

  const confirmedReturnBy = localStorage.getItem('userId') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Datos enviados a returnLoan:', {
        loanId,
        returnStatus,
        confirmedReturnBy,
        observations
      });
      await returnLoan({ loanId, returnStatus, confirmedReturnBy, observations });
      setMessage('Devolución registrada exitosamente');
    } catch (err: any) {
      const errorData = err.response?.data;

      if (typeof errorData === 'string') {
        setMessage(errorData);
      } else if (errorData?.error) {
        setMessage(errorData.error);
      } else {
        setMessage('Error en la devolución');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow-sm space-y-4"
    >
      <h2 className="text-xl font-bold text-[#990000] mb-2">Registrar Devolución</h2>
      <p className="text-sm text-gray-600 mb-4">Complete la información del préstamo devuelto</p>

      <div>
        <label className="text-sm font-medium text-[#990000]">ID del Préstamo</label>
        <input
          placeholder="Ingrese el ID del préstamo"
          value={loanId}
          onChange={e => setLoanId(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none text-gray-600 placeholder-gray-600"
        />
      </div>

      <div>
        <label htmlFor="returnStatus" className="text-sm font-medium text-[#990000]">
          Estado del equipo devuelto
        </label>
        <select
          id="returnStatus"
          value={returnStatus}
          onChange={e => setReturnStatus(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md text-gray-600"
        >
          <option value="">Selecciona un estado</option>
          <option value="GOODSTATUS">GOODSTATUS</option>
          <option value="DAMAGED">DAMAGED</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-[#990000]">Observaciones</label>
        <textarea
          placeholder="Ingrese observaciones si las hay"
          value={observations}
          onChange={e => setObservations(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none text-gray-600 placeholder-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-md font-semibold transition bg-[#990000] text-white hover:bg-red-600 hover:text-black"
      >
        Registrar Devolución
      </button>

      <Notification message={message} />
    </form>
  );
}
