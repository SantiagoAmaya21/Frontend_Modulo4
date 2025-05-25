import axios from 'axios';

const API_URL = 'https://moduloadmin-b8e8a8c9apcfcyb3.brazilsouth-01.azurewebsites.net//api/usuarios';


export async function loginUser(correo: string, contraseña: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      correo,
      contraseña
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
}
