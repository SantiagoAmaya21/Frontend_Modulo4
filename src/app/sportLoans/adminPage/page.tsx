'use client';

import AddEquipmentForm from '@/components/AddEquipmentForm';
import withAuth from '@/lib/withAuth';

function AdminPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Préstamos Deportivos</h1>
      <AddEquipmentForm />
    </main>
  );
}

export default withAuth(AdminPage, { allowedRoles: ['ADMIN'] });
