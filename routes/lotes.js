// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../db');


// Endpoint POST para recibir datos de los lotes
router.get('/', (req, res) => {
    const query = 'SELECT nombre, email, celular, id_tipo_Usr FROM lotes';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
      }
      res.json(results);
    });
});

// Endpoint para obtener Lotes por IDs
router.get('/rango/:startId/:endId', (req, res) => {
    const query = 'SELECT l.id_lote, l.num_lote, l.ancho, l.largo, l.excedente, mce.valor_text estatus, mcp.valor_numero precio, mcd.valor_numero descuento FROM lotes l LEFT JOIN multicatalogo mce on mce.id = l.id_estatus LEFT JOIN multicatalogo mcp on mcp.id = l.id_precio LEFT JOIN multicatalogo mcd on mcd.id = l.id_descuento WHERE id BETWEEN ? AND ?';
    const values = [req.params.startId, req.params.endId];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error obteniendo lotes:', err.stack);
            return res.status(500).send('Error obteniendo lotes');
        }
        if (results.length === 0) {
            return res.status(404).send('Lotes no encontrados');
        }
        res.json(results);
    });
});

// Endpoint para obtener un lotes por ID
router.get('/:id', (req, res) => {
    const query = 'SELECT l.id_lote, l.num_lote, l.ancho, l.largo, l.excedente, mce.valor_text estatus, l.id_estatus, mcp.valor_numero precio, mcd.valor_numero descuento FROM lotes l LEFT JOIN multicatalogo mce on mce.id = l.id_estatus LEFT JOIN multicatalogo mcp on mcp.id = l.id_precio LEFT JOIN multicatalogo mcd on mcd.id = l.id_descuento WHERE num_lote = ?';
    const values = [req.params.id];
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error obteniendo lotes:', err.stack);
            return res.status(500).send('Error obteniendo lotes');
        }
        if (results.length === 0) {
            return res.status(404).send('lotes no encontrado');
        }
        res.json(results[0]);
    });
});

module.exports = router;
