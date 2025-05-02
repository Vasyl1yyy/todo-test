import BlockTask from './block-task/block-task';

export default function Tasks() {
  return (
    <div>
      <h1>Tasks</h1>
      <div>
        <p>create task</p>
        <div>
          <input type="text" />
          <button>create</button>
        </div>
      </div>
      <div>
        <BlockTask title="Task 1" id={1} done={false} />
      </div>
    </div>
  );
}
