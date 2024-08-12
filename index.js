// index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Importar routers
const dataRouter = require('./routes/lotes');
const usuariosRouter = require('./routes/usuarios');
const catalogosRouter = require('./routes/catalogos');
const pruebaVidaRouter = require('./routes/pruebaVida');
const emailRouter = require('./routes/email');

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de que 'views' sea el directorio correcto

// Middleware para servir archivos estáticos (CSS, imágenes, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Usar los enrutadores para las rutas especificadas
app.use('/pruebaVida', pruebaVidaRouter);
app.use('/email', emailRouter);
app.use('/lotes', dataRouter);
app.use('/usuarios', usuariosRouter);
app.use('/catalogos', catalogosRouter);

// Manejo de errores 404 para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Manejo de errores 500 para problemas del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
