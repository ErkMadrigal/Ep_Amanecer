// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Endpoint para obtener todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT nombre, email, celular, id_tipo_Usr FROM usuarios';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
      }
      res.json(results);
    });
});

// Endpoint para agregar un nuevo usuarios
router.post('/', (req, res) => {
    const { nombre, telefono, correo, id_tipo_Usr} = req.body;

    // Validación de campos
    if (!nombre || !telefono || !correo || !id_tipo_Usr) {
        return res.status(400).send('Error: Todos los campos (nombre, telefono, correo, tipo de usuario) son requeridos');
    }

    // Inserta datos en la base de datos
    const query = 'INSERT INTO usuarios (nombre, telefono, correo, id_tipo_Usr) VALUES (?, ?, ?, ?)';
    const values = [nombre, telefono, correo, id_tipo_Usr];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error insertando usuario:', err.stack);
            return res.status(500).send('Error insertando usuario');
        }
        res.send(`usuario recibido e insertado con ID: ${results.insertId}`);
    });
});

// Endpoint para obtener un usuarios por ID
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    const values = [req.params.id];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error obteniendo usuario:', err.stack);
            return res.status(500).send('Error obteniendo usuario');
        }
        if (results.length === 0) {
            return res.status(404).send('usuario no encontrado');
        }
        res.json(results[0]);
    });
});

module.exports = router;
