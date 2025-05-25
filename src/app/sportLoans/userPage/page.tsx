'use client';

import LoanForm from '@/components/LoanForm';
import EquipmentList from '@/components/EquipmentList';
import Notification from '@/components/Notification';
import UserLoansList from '@/components/UserLoansList';
import NotificationSystem from '@/components/NotificationSystem'
import withAuth from '@/lib/withAuth';

function UserPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Préstamos Deportivos</h1>
      <EquipmentList />
      <LoanForm />
      <Notification />
      <UserLoansList />
      <NotificationSystem />
    </main>
  );
}

export default withAuth(UserPage, { allowedRoles: ['STUDENT', 'TEACHER'] });