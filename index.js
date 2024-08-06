// index.js
const express = require('express');
const app = express();
const port = 3000;
const dataRouter = require('./routes/lotes');
const usuariosRouter = require('./routes/usuarios');
const catalogosRouter = require('./routes/catalogos');
const pruebaVidaRouter = require('./routes/pruebaVida');
const cors = require('cors');


app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Usar el enrutador para todas las rutas
app.use('/pruebaVida', pruebaVidaRouter);
app.use('/lotes', dataRouter);
app.use('/usuarios', usuariosRouter);
app.use('/catalogos', catalogosRouter);

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
