'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/user';

export default function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = await loginUser(correo, contraseña);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', correo);
      // Decodificar token para redireccionar según el rol
      const [, payloadBase64] = token.split('.');
      const decodedPayload = JSON.parse(atob(payloadBase64));
      console.log('Decoded JWT payload:', decodedPayload);
      const rol = decodedPayload.role;

      if (rol === 'ADMIN') {
        router.push('/sportLoans/adminPage');
      } else if (rol === 'GENERALSERVICES') {
        router.push('/sportLoans/generalServicesPage');
      } else if (rol === 'STUDENT' || rol === 'TEACHER'){
        router.push('/sportLoans/userPage');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
