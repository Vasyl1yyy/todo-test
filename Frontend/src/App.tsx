import { useEffect, useState } from 'react';
import SignIn from './components/sign/sign-in/sign-in';
import SignUp from './components/sign/sign-up/sign-up';
import { useStore } from './store/userStore';
import { useTaskStore } from './store/taskStore';
import Tasks from './components/tasks/tasks';
import { VerifyToken } from './api/api';

export default function App() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setTasks = useTaskStore((state) => state.setTasks);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const data = await VerifyToken(JSON.parse(token));
      if (data) {
        setUser({
          id: data.id,
          username: data.username,
        });
        setTasks(data.tasks);
      } else {
        localStorage.removeItem('token');
      }
    };
    fetchData();
  }, []);

  const Pages = () => {
    if (user === null) {
      if (!isSignUp) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <SignUp />{' '}
            <button
              className="border-2 border-black cursor-pointer rounded-2xl p-2 m-2 mt-0 hover:bg-black hover:text-white transition"
              onClick={() => setIsSignUp(true)}
            >
              sign up
            </button>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <SignIn />{' '}
            <button
              className="border-2 border-black cursor-pointer rounded-2xl p-2 m-2 mt-0 hover:bg-black hover:text-white transition"
              onClick={() => setIsSignUp(false)}
            >
              sign up
            </button>
          </div>
        );
      }
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <Tasks />
        </div>
      );
    }
  };

  return <div>{Pages()}</div>;
}
