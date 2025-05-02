import { useState } from 'react';
import { useStore } from '../../../store/userStore';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form...');

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      setUser({
        id: data.user,
        username: data.username,
      });
    } else {
      console.error('Login failed:', data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-7">
      <h1>Sign In</h1>
      <div>
        <p>Username</p>
        <input
          className="border-2 border-black"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <p>password</p>
        <input
          className="border-2 border-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="border-2 border-black"
        onClick={(e) => handleSubmit(e)}
      >
        Sign In
      </button>
    </div>
  );
}
