# todo

Simple todo-app, add todos with the New todo box, to change important status of todo double click the item.

https://todo.kanindev.se/


Using axios package to fetch todods from backend, setting todos to the useState hook todods.

```JavaScript
const [todos, setTodos] = useState()

const getTodos = () => {
  axios
  .get(`${baseURL}`)
  .then(async response => {
    const todos = await response.data
    setTodos(todos)
    console.log(todos)
  })
}
```
