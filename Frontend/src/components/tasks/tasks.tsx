import { useTaskStore } from '@/store/taskStore';
import BlockTask from './block-task/block-task';
import { useState } from 'react';
import { CreateTask } from '@/api/api';
import { useStore } from '@/store/userStore';

export default function Tasks() {
  const [text, setText] = useState('');
  const tasks = useTaskStore((state) => state.tasks);
  const userId = useStore((state) => state.user?.id);

  const createTask = async () => {
    const task = await CreateTask(text, userId as number);
    if (tasks && task) {
      tasks.push(task);
    }
    setText('');
  };

  console.log('tasks', tasks);

  const taskList = () => {
    const sortedTasks = tasks.sort((a, b) => Number(a.done) - Number(b.done));

    console.log('taskList', tasks);

    const taskList = sortedTasks.map((task) => (
      <BlockTask
        id={task.id}
        title={task.title}
        done={task.done}
        userId={userId}
      />
    ));
    return taskList;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="font-bold">Tasks</h1>
      <div>
        <div>
          <input
            type="text"
            className="border-2 border-black rounded-2xl p-2 m-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="border-2 border-black rounded-2xl p-2 m-2"
            onClick={() => createTask()}
          >
            create
          </button>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center ">
          {taskList()}
        </div>
      </div>
    </div>
  );
}
