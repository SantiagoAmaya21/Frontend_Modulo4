'use client';

import Image from "next/image";
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter();

    /* const [role, setRole] = useState<string | null>(null);

      useEffect(() => {
        // Obtener rol desde localStorage
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
      }, []);

      const goToLoanScreen = () => {
        if (role === "ADMIN") {
          router.push("/sportLoans/adminPage");
        } else if (role === "GENERALSERVICES") {
          router.push("/sportLoans/generalServicesPage");
        } else if (role === "USER") {
          router.push("/sportLoans/userPage");
        } else {
          alert("Rol no reconocido o no estás logueado");
        }
      };

    */




    const goToLoanScreen = () => {
      router.push('/sportLoans/userPage');
    };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <LoginForm />;

          <button
            onClick={goToLoanScreen}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Ir a Gestión de Préstamos
          </button>
      </main>
    </div>
  );
}
