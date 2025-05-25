'use client';

import AddEquipmentForm from '@/components/AddEquipmentForm';
import withAuth from '@/lib/withAuth';

function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 pb-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AddEquipmentForm />
    </main>
  );
}

export default withAuth(AdminPage, { allowedRoles: ['ADMIN'] });
