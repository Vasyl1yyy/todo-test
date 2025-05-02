import { useState } from 'react';
import { useStore } from '../../../store/userStore';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form...');

    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();
    setUser({
      id: data.user,
      username: data.username,
    });
    if (response.ok) {
      console.log('Registration successful:', data);
    } else {
      console.error('Registration failed:', data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-7">
      <h1>sign up</h1>
      <div>
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
        <div>
          <p>password</p>
          <input
            className="border-2 border-black"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className="border-2 border-black cursor-pointer"
          onClick={(e) => handleSubmit(e)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
