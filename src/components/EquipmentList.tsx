'use client';

import { useEffect, useState } from 'react';
import { getAvailableEquipment } from '@/lib/equipment';

export default function EquipmentList() {
  const [equipments, setEquipments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAvailableEquipment();
      setEquipments(data);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-[#990000] mb-2">Equipos Disponibles</h2>

      {equipments.length === 0 ? (
        <p className="text-sm text-gray-600">No hay equipos disponibles en este momento.</p>
      ) : (
        <ul className="space-y-3">
          {equipments.map((e) => (
            <li
              key={e.id}
              className="p-3 border border-gray-200 rounded-md shadow-sm bg-gray-50 text-sm text-gray-700"
            >
              <p><strong>ID:</strong> {e.id}</p>
              <p><strong>Nombre:</strong> {e.name}</p>
              <p><strong>Estado:</strong> {e.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
