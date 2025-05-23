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
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-2">Equipos Disponibles</h2>
      <ul>
        {equipments.map(e => (
          <li key={e.id}>
            ID: {e.id}, Nombre: {e.name}, Estado: {e.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
