'use client';

import AddEquipmentForm from '@/components/AddEquipmentForm';
import withAuth from '@/lib/withAuth';

function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#990000] text-center">Panel de Administrador</h2>
        <AddEquipmentForm />
        {/* Aquí puedes agregar más componentes administrativos */}
      </div>
    </main>
  );
}

export default withAuth(AdminPage, { allowedRoles: ['ADMIN'] });
