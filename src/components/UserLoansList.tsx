'use client';

import { useState } from 'react';
import { listLoansByUser } from '@/lib/loan';

export default function UserLoansList() {
  const [userId, setUserId] = useState('');
  const [loans, setLoans] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError('Por favor ingrese un ID de usuario');
      return;
    }

    try {
      const data = await listLoansByUser(userId);
      setLoans(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'Error al obtener los préstamos');
      setLoans([]);
    }
  };

  return (
    <div className="p-4 border rounded space-y-3">
      <h2 className="text-xl mb-2">Préstamos del Usuario</h2>

      <input
        type="text"
        placeholder="ID del usuario"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="block w-full p-2 border rounded"
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Buscar
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4 space-y-2">
        {loans.length > 0 ? (
          loans.map((e) => (
            <li key={e.id} className="border p-2 rounded">
              <strong>ID:</strong> {e.id} <br />
              <strong>Equipo:</strong> {e.equipmentId} <br />
              <strong>Devuelto:</strong> {e.returned ? 'Sí' : 'No'}
            </li>
          ))
        ) : (
          <p>No hay préstamos para este usuario.</p>
        )}
      </ul>
    </div>
  );
}
