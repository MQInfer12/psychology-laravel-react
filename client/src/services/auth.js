import {http} from './htpp'

export const signIn = async (form) => {
  try {
    const response = await fetch(`${http}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: form.email,
        password: form.contrasenia,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (form) => {
  try {
    const response = await fetch(`${http}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        password: form.contrasenia,
        genero: form.genero,
        edad: form.edad,
        id_sede: form.sede,
        id_rol: "1"
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await fetch(`${http}auth/me`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};