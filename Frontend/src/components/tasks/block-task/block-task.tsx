import { UpdateTask } from '@/api/api';
import { useTaskStore } from '@/store/taskStore';

export default function BlockTask({ title, id, done, userId }) {
  const setTasks = useTaskStore((state) => state.setTasks);

  const updateTask = async () => {
    const tasks = await UpdateTask(id, userId);
    if (tasks) {
      setTasks(tasks);
    }
  };

  return (
    console.log(id),
    (
      <div
        id={id}
        className="border-2 border-black p-4 m-2 rounded-lg shadow-md flex gap-5 items-center justify-between w-3xs"
      >
        <h1>{title}</h1>
        <button className="cursor-pointer" onClick={() => updateTask()}>
          {!done ? 'Done' : 'Not Done'}
        </button>
      </div>
    )
  );
}
