const canciones = require('../data/musica.json');

const obtenNevaDisco = (dato) => {
    const newdata = dato.map(dat => {
      const nwd = {
        anyo: dat.anyo,
        titulo: dat.disco,
        imgdisco: dat.portada
      }
      return nwd
    })
    return newdata;
  }

const allSongs = (app) => {
  app.get('/api/canciones', (request, response) => {
    //transformacion del json para enviar objeto.
    const newCanciones = canciones.map(element => {
        const nwe = {
          idInterprete: element.idInterprete,
          nombreInterprete: element.nombreInterprete,
          discografia: obtenNevaDisco(element.discografia)
        }
        return nwe;
    })
    response.json(newCanciones);
  });
}

const allSongsArtist = (app) => {
  app.get('/api/canciones/:id', (request, response) => {
    const id = request.params.id
    const songsArtist = canciones.find(interprete => interprete.idInterprete === id)
    //
    if (undefined !== songsArtist) {
      const newCanciones = {
          idInterprete: songsArtist.idInterprete,
          nombreInterprete: songsArtist.nombreInterprete,
          discografia: obtenNevaDisco(songsArtist.discografia)
        }
      response.json(newCanciones);
    } else {
      response.status(404).statusText('El Artista no existe.').end()
    } 
  });
}
const albumArtist = (app) => {
  app.get('/api/canciones/:id/:album', (request, response) => {
    const id = request.params.id
    const albumname = request.params.album
    const artist = canciones.find(interprete => interprete.idInterprete === id);
    if (undefined !== artist) {
      const discografia = artist.discografia;
      const songsAlbum = discografia.find(album => album.disco === albumname)
      if (undefined !== songsAlbum) {
        response.json(songsAlbum);
      } else {
        response.status(502).statusText('El Album no tiene canciones o no existe.').end()
      }
    } else {
      response.status(501).statusText('El Artista no existe.').end()
    } 
  });   
}
/*const viewArtist = (app) => {
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
}*/

module.exports = {allSongs, allSongsArtist, albumArtist}