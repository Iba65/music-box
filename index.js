const express = require('express')
const app = express()
const interpretes = require('./data/interpretes.json');
const cors = require('cors')

app.use(cors())

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger);

app.post('/api/interpretes', (request, response) => {
  const body = request.body

  if (!body.nombre) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const interprete = {
    id: "5",
    tipo: "Grupo",
    nombre: "Mecano",
    imageng: "Mecano/images/MecanoFoto.jpg",
    estilo: "Pop",
    periodo: "1980-Presente",
    informacion: {
      Fotos: ["images/Concierto.jpg"],
      Origen: "España",
      Generos: ["Pop rock", "Pop"],
      Actividad: ["1980-2000" ],
      OficialWeb: "www.mecano.com",
      Miembros: ["Nacho Cano", "Ana Torroja", "Jose lUis Cano"],
      Descripcion: [
        "Tocan mu bien"
      ]
    },
    urlwiki: "https://es.wikipedia.org/wiki/Mecano"
  }

  interpretes = interpretes.concat(interprete)

  response.json(interprete)
})


app.get('/', (request, response) => {
  response.send(`<h1>Hola Mundo!</h1>`)
})

app.get('/api/interpretes', (request, response) => {
  response.json(interpretes)
})

app.get('/api/interpretes/:id', (request, response) => {
  const id = request.params.id
  const interprete = interpretes.find(interprete => interprete.id === id)
  //
  if (undefined !== interprete) {
    response.json(interprete)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/interpretes/:id', (request, response) => {
  const id = (request.params.id)
  interpretes = interpretes.filter(interprete => interprete.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
