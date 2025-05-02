import { useState } from 'react';
import { useStore } from '../../../store/userStore';
import { Login } from '@/api/api';
import { useTaskStore } from '@/store/taskStore';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);
  const setTasks = useTaskStore((state) => state.setTasks);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form...');

    const data = await Login(username, password);
    if (data) {
      setUser({
        id: data.id,
        username: data.username,
      });
      setTasks(data.tasks);
      console.log('Tasks:', data.tasks);
    }
    console.log('Login successful:', data);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-7">
      <h1 className="font-bold">Sign In</h1>
      <div>
        <p className="ml-3">Username</p>
        <input
          className="border-2 border-black rounded-2xl p-2 m-2 mt-0"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <p className="ml-3">password</p>
        <input
          className="border-2 border-black rounded-2xl p-2 m-2 mt-0"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="border-2 border-black cursor-pointer rounded-2xl p-2 m-2 mt-0 hover:bg-black hover:text-white transition"
        onClick={(e) => handleSubmit(e)}
      >
        Sign In
      </button>
    </div>
  );
}
