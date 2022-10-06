
const interpretes = require('./../data/interpretes.json');

const allArtist = (app) => {
  app.get('/api/interpretes', (request, response) => {
    response.json(interpretes)
  });
}

const viewArtist = (app) => {
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
}

const newArtist = (app) => {
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
}

const delArtist = (app) => {
  app.delete('/api/interpretes/:id', (request, response) => {
    const id = (request.params.id)
    interpretes = interpretes.filter(interprete => interprete.id !== id)  
    response.status(204).end()
  })
}
const imgArtist = (app) => {
  app.get('/api/interpreteImg/:id', (request, response) => {
    const id = request.params.id
    const interprete = interpretes.find(interprete => interprete.id === id)
    //
    if (undefined !== interprete) {
      console.log(interprete.imageng);
      response.json(interprete.imageng);
    } else {
      response.status(404).end()
    }
  })    
}

module.exports = {allArtist, viewArtist, newArtist, delArtist, imgArtist}