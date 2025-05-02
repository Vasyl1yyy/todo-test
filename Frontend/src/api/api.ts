import { useStore } from '../store/userStore';

export const Register = (name: string, password: string) => {
  const setUser = useStore((state) => state.setUser);

  const register = async () => {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    setUser({
      id: data.user,
      username: data.name,
    });
    return data;
  };

  return { register };
};
