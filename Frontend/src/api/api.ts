export const Register = async (username: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Login successful:', data);
    localStorage.setItem('token', JSON.stringify(data.token));
    return {
      id: data.id,
      username: data.username,
    };
  } else {
    console.error('Login failed:', data.message);
  }
};

export const Login = async (username: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const data = await response.json();

  const tasks = await fetch(`http://localhost:3000/api/${data.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const tasksData = await tasks.json();
  if (tasks.ok) {
    console.log('Tasks fetched successfully:', tasksData);
  }

  if (response.ok) {
    console.log('Login successful:', data);
    localStorage.setItem('token', JSON.stringify(data.token));
    return {
      id: data.id,
      username: data.username,
      tasks: tasksData,
    };
  } else {
    console.error('Login failed:', data.message);
  }
};

export const CreateTask = async (title: string, userId: string) => {
  const response = await fetch('http://localhost:3000/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, userId }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Task created successfully:', data);
    return {
      id: data.id,
      title: data.title,
      done: data.done,
    };
  } else {
    console.error('Task creation failed:', data.message);
  }
};

export const UpdateTask = async (id: number, userId: number) => {
  const response = await fetch(`http://localhost:3000/api/${id}/done`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, userId }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Task updated successfully:', data);
    return data;
  } else {
    console.error('Task update failed:', data.message);
  }
};

export const VerifyToken = async (token: string) => {
  const response = await fetch('http://localhost:3000/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Token verified successfully:', data);
    return {
      id: data.id,
      username: data.username,
      tasks: data.tasks,
    };
  } else {
    console.error('Token verification failed:', data.message);
  }
};
