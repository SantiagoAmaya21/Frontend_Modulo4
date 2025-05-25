'use client';

import ReturnForm from '@/components/ReturnForm';
import EquipmentStatusForm from '@/components/EquipmentStatusForm';
import Notification from '@/components/Notification';
import UserLoansList from '@/components/UserLoansList';
import EquipmentById from '@/components/EquipmentById';
import withAuth from '@/lib/withAuth'

function generalServicesPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Préstamos Deportivos</h1>
      <ReturnForm />
      <EquipmentStatusForm />
      <Notification />
      <UserLoansList />
      <EquipmentById />
    </main>
  );
}

export default withAuth(generalServicesPage, { allowedRoles: ['GENERALSERVICES'] });