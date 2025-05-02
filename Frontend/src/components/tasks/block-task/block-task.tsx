export default function BlockTask({ title, id, done }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{id}</p>
      <p>{done ? 'Done' : 'Not Done'}</p>
    </div>
  );
}
