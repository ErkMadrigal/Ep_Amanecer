// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 



router.get('/', (req, res) => {
    const { tipo_catalogo } = req.query;

    // Validación de campos
    if (!tipo_catalogo) {
        return res.status(400).send('Error: tipo_catalogo es requerido');
    }

    // Consulta a la base de datos
    const query = 'SELECT mc.id, valor_text, valor_numero FROM multicatalogo mc LEFT JOIN tipo_catalogo tc ON tc.id = mc.id_tipo_catalogo WHERE tc.tipo_catalogo LIKE ?';
    const values = [`%${tipo_catalogo}%`];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error consultando la base de datos:', err.stack);
            return res.status(500).send('Error consultando la base de datos');
        }
        res.json(results);
    });
});


module.exports = router;
