export const test = async () => {
  const response = await fetch('http://localhost:3000/api/test');
  const data = await response.json();
  return data.message;
};
