import { useState } from 'react';
import { useStore } from '../../../store/userStore';
import { Register } from '../../../api/api';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form...');

    const data = await Register(username, password);

    if (data) {
      setUser({
        id: data.id,
        username: data.username,
      });
    }
    console.log('Registration successful:', data);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-7">
      <h1 className="font-bold">sign up</h1>
      <div>
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
          <p className="ml-3">Password</p>
          <input
            className="border-2 border-black rounded-2xl p-2 m-2 mt-0"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <p className="ml-3">Password</p>
          <input
            className="border-2 border-black rounded-2xl p-2 m-2 mt-0"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className="border-2 border-black cursor-pointer rounded-2xl p-2 m-2 mt-0 hover:bg-black hover:text-white transition"
          onClick={(e) => handleSubmit(e)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
