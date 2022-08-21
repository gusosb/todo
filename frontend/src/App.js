import { useEffect, useState } from "react"
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import baseURL from './baseURL'

const App = () => {

  const [todos, setTodos] = useState()
  const [desc, setDesc] = useState()

  const getTodos = () => {
    axios
    .get(`${baseURL}`)
    .then(async response => {
      const todos = await response.data
      setTodos(todos)
      console.log(todos)
    })
  }

  useEffect(() => {
    
    if (!todos) {
      getTodos()
    }
    

  }, [])

  const deleteTodo = async (e) => {
    await axios
    .delete(`${baseURL}${e.id}`)
    .then(async response => {
      console.log(response)
    })
    getTodos()
  }

  const addTodo = async () => {
    if (desc) {
      await axios
      .post(`${baseURL}`, { desc })
      .then(async response => {
        console.log(response)
      })
      getTodos()
      setDesc('')
    }
  }

  const changeImportant = async (e) => {
    await axios
    .patch(`${baseURL}`, e)
    .then(async response => {
      console.log(response)
    })
    getTodos()
  }
  
  return (
    <>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 6,
          }}
        >
          
          <Typography component="h1" variant="h5">
            Todos
          </Typography>


          <List sx={{ mt: 2 }}>
            {todos?.sort((a, b) => a.id - b.id).map(e => (
              <>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(e)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  {/* <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar> */}

                  <ListItemText
                    primary={e.description}
                    sx={{ color: e.isImportant && 'red' }}
                    onDoubleClick={() => changeImportant(e)}
                     secondary={e.isImportant && 'important!'}
                  />
          </ListItem>
              </>
            ))}
          </List>


          <br />
          <br />
          <br />

          <TextField value={desc} onChange={({target}) => setDesc(target.value)} sx={{ maxWidth: 200 }} id="outlined-basic" label="New Todo" variant="outlined" />
          <br />
          <br />
          
          <Button onClick={addTodo} variant="contained">
          Submit
          </Button>
          <br />
          <br />
          <br />



          
        </Box>
      </Container>

    </>
  )
}

export default App