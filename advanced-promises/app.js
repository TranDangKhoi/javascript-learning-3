async function fetchDadJokes() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function fetchTodosFromJsonPlaceholder() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  return data;
}
async function fetchTodosFromJsonPlaceholder2() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/2");
  const data = await response.json();
  return data;
}

async function promiseAll() {
  const [todos2, todos1] = await Promise.all([
    fetchTodosFromJsonPlaceholder2(),
    fetchTodosFromJsonPlaceholder(),
  ]);

  return { todos2, todos1 };
}

promiseAll()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
