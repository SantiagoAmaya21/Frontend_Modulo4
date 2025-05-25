'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-[#990000] text-white px-4 py-2 rounded hover:bg-red-600 hover:text-black transition"
    >
      Cerrar sesión
    </button>
  );
}
