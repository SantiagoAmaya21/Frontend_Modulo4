'use client';

import LoanForm from '@/components/LoanForm';
import ReturnForm from '@/components/ReturnForm';
import EquipmentStatusForm from '@/components/EquipmentStatusForm';
import EquipmentList from '@/components/EquipmentList';
import Notification from '@/components/Notification'
import UserLoansList from '@/components/UserLoansList'
import EquipmentById from '@/components/EquipmentById'
import AddEquipmentForm from '@/components/AddEquipmentForm'


export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Préstamos Deportivos</h1>
      <EquipmentList />
      <LoanForm />
      <ReturnForm />
      <EquipmentStatusForm />
      <Notification />
      <UserLoansList />
      <EquipmentById />
      <AddEquipmentForm />
    </main>
  );
}
