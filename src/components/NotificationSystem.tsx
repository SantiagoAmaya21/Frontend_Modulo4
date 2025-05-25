'use client';

import { useEffect, useState } from 'react';
import { getUserNotifications } from '@/lib/loan';

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const [, payloadBase64] = token.split('.');
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const userId = decodedPayload.id;

        const data = await getUserNotifications(userId);
        setNotifications(data);
        setError('');
      } catch (err: any) {
        setError('No se pudieron cargar las notificaciones');
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4 border rounded bg-yellow-50">
      <h2 className="text-lg font-semibold mb-2">Notificaciones</h2>

      {error && <p className="text-red-500">{error}</p>}

      {notifications.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {notifications.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hay notificaciones en este momento.</p>
      )}
    </div>
  );
}
