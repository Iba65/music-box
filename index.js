const express = require('express')
const app = express()
//const interpretes = require('./data/interpretes.json');
const cors = require('cors')
const ArtistData = require('./functions/serviceInterpretes.js');
const SongstData = require('./functions/serviceCanciones.js');

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

app.get('/', (request, response) => {
  response.send(`<h1>Servocio Http Fichero Interpretes.json</h1>`)
})      

//=============================================
//==  funciones ficheor interprete
//============================================

ArtistData.allArtist(app);
ArtistData.newArtist(app);
ArtistData.viewArtist(app);
ArtistData.delArtist(app);
ArtistData.imgArtist(app);

//=============================================
//==  funciones ficheor canciones
//============================================

SongstData.allSongs(app);
SongstData.allSongsArtist(app);
SongstData.albumArtist(app);
//

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
