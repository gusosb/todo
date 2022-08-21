const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())


app.use(cors())

const { PORT } = require('./util/config')
const { Todo } = require('./models')


app.get('/api/todos', async (request, response) => {

    const data = await Todo.findAll()

    if (data) {
        response.json(data)
    } else {
        response.json(404).end()
    }
})

app.get('/api/todos/:id', async (request, response) => {
    const id = Number(request.params.id)

    const data = await Todo.findByPk(id)

    if (data) {
        response.json(data)
    } else {
        response.json(404).end()
    }
})

app.delete('/api/todos/:id', async (request, response) => {
    const id = Number(request.params.id)
    await Todo.destroy({
        where: {
          id
        },
        force: true
    })
  
    response.status(204).end()
})

app.post('/api/todos', async (request, response) => {

    console.log(request.body)

     const body = request.body
     if (body === undefined) {
         return response.status(400).json({ error: 'content missing' })
     }
     const newTodo = await Todo.create({ description: body.desc })
    response.json(newTodo)
})

app.patch('/api/todos', async (request, response) => {

      const body = request.body
      if (body === undefined) {
          return response.status(400).json({ error: 'content missing' })
      }
      const update = await Todo.upsert({
         id: request.body.id,
         isImportant: !request.body.isImportant,
         description: request.body.description,
      })
     response.json(update[0])
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})