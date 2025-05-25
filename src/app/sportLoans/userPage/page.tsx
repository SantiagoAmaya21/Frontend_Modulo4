'use client';

import LoanForm from '@/components/LoanForm';
import EquipmentList from '@/components/EquipmentList';
import Notification from '@/components/Notification';
import UserLoansList from '@/components/UserLoansList';
import NotificationSystem from '@/components/NotificationSystem'
import withAuth from '@/lib/withAuth';

function UserPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 pb-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <EquipmentList />
      <LoanForm />
      <Notification />
      <UserLoansList />
      <NotificationSystem />
    </main>
  );
}

export default withAuth(UserPage, { allowedRoles: ['STUDENT', 'TEACHER'] });