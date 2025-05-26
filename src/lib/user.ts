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

export async function getUserCorreoById(userId: string): Promise<string> {
  try {
    const res = await axios.get(`${API_URL}/correo`, {
      params: { userId }
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Error al obtener el correo del usuario');
  }
}

