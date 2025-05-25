'use client';

import ReturnForm from '@/components/ReturnForm';
import EquipmentStatusForm from '@/components/EquipmentStatusForm';
import Notification from '@/components/Notification';
import UserLoansList from '@/components/UserLoansList';
import EquipmentById from '@/components/EquipmentById';
import withAuth from '@/lib/withAuth'

function generalServicesPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 pb-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ReturnForm />
      <EquipmentStatusForm />
      <Notification />
      <UserLoansList />
      <EquipmentById />
    </main>
  );
}

export default withAuth(generalServicesPage, { allowedRoles: ['GENERALSERVICES'] });