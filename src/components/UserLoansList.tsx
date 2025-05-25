'use client';

import { useEffect, useState } from 'react';
import { listLoansByUser } from '@/lib/loan';
import { getEquipmentById } from '@/lib/equipment';

type Loan = {
  id: string;
  equipmentId: string;
  returned: boolean;
};

type EnrichedLoan = Loan & { equipmentName: string };

export default function UserLoansList() {
  const [loans, setLoans] = useState<EnrichedLoan[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No hay token de autenticación');
          return;
        }
        const [, payloadBase64] = token.split('.');
        const { id: userId } = JSON.parse(atob(payloadBase64));

        const loanList: Loan[] = await listLoansByUser(userId);

        const enriched: EnrichedLoan[] = await Promise.all(
          loanList.map(async (loan) => {
            try {
              const equipment = await getEquipmentById(loan.equipmentId);
              return { ...loan, equipmentName: equipment.name };
            } catch {
              return { ...loan, equipmentName: loan.equipmentId }; // fallback
            }
          })
        );

        setLoans(enriched);
        setError('');
      } catch (err: any) {
        setError(err.response?.data || 'Error al obtener los préstamos');
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="p-4 border rounded space-y-3">
      <h2 className="text-xl mb-2">Tus Préstamos</h2>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4 space-y-2">
        {loans.length > 0 ? (
          loans.map((e) => (
            <li key={e.id} className="border p-2 rounded">
              <strong>ID préstamo:</strong> {e.id} <br />
              <strong>Equipo:</strong> {e.equipmentName} <br />
              <strong>Devuelto:</strong> {e.returned ? 'Sí' : 'No'}
            </li>
          ))
        ) : (
          !loading && <p>No hay préstamos para este usuario.</p>
        )}
      </ul>
    </div>
  );
}
