# todo

Simple todo-app, add todos with the New todo box, to change important status of todo double click the item.

https://todo.kanindev.se/


Using axios package to fetch todods from backend, setting todos to the useState hook todos.

/frontend/src/App.js

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

When double clicking List item 

/frontend/src/App.js

```JavaScript
<ListItemText
  primary={e.description}
  sx={{ color: e.isImportant && 'red' }}
  onDoubleClick={() => changeImportant(e)}
   secondary={e.isImportant && 'important!'}
/>
```
