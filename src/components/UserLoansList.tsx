'use client';

import { useEffect, useState } from 'react';
import { listLoansByUser } from '@/lib/loan';

export default function UserLoansList() {
  const [loans, setLoans] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No hay token de autenticación');
          return;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
          setError('Token inválido');
          return;
        }

        const payloadBase64 = parts[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const userId = decodedPayload.id;

        const data = await listLoansByUser(userId);
        setLoans(data);
        setError('');
      } catch (err: any) {
        setError(err.response?.data || 'Error al obtener los préstamos');
        setLoans([]);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="p-4 border rounded space-y-3">
      <h2 className="text-xl mb-2">Tus Préstamos</h2>

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
