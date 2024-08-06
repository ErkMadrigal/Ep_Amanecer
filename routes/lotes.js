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
    const query = 'SELECT l.id_lote, l.num_lote, l.ancho, l.largo, l.svg, l.id_estatus, l.excedente, mce.valor_text estatus, mcp.valor_numero precio, mcd.valor_numero descuento, (l.ancho * l.largo) AS area, ((l.ancho * l.largo) + l.excedente) AS areaTotal  FROM lotes l LEFT JOIN multicatalogo mce on mce.id = l.id_estatus LEFT JOIN multicatalogo mcp on mcp.id = l.id_precio LEFT JOIN multicatalogo mcd on mcd.id = l.id_descuento WHERE l.num_lote BETWEEN ? AND ?';
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
    const query = 'SELECT l.id_lote, l.num_lote, l.ancho, l.largo, l.excedente, mce.valor_text estatus, mcp.valor_numero precio, mcd.valor_numero descuento, l.id_estatus, (l.ancho * l.largo) AS area, ((l.ancho * l.largo) + l.excedente) AS areaTotal, (((l.ancho * l.largo )+ l.excedente) * mcp.valor_numero) AS precioTotal FROM lotes l LEFT JOIN multicatalogo mce on mce.id = l.id_estatus LEFT JOIN multicatalogo mcp on mcp.id = l.id_precio LEFT JOIN multicatalogo mcd on mcd.id = l.id_descuento WHERE num_lote = ?';
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


// Endpoint para actualizar campos
router.put('/actualizar-lote/:num_lote', async (req, res) => {
    const { num_lote } = req.params;
    const { id_estatus, fecha_contrato, id_usuario } = req.body;
  
    try {
      // Verifica si el contrato existe
      const [rows] = await promisePool.query('SELECT * FROM contratos WHERE num_lote = ?', [num_lote]);
      if (rows.length === 0) {
        return res.status(404).json({ mensaje: 'Contrato no encontrado' });
      }
  
      // Actualiza el contrato
      await promisePool.query(
        'UPDATE lotes SET id_estatus = ?, fecha_contrato = ?, id_usuario = ? WHERE num_lote = ?',
        [id_estatus, fecha_contrato, id_usuario, num_lote]
      );
  
      res.json({ mensaje: 'Contrato actualizado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el contrato', error });
    }
  });

//   curl -X PUT http://localhost:3000/lotes/actualizar-lote/106  -H "Content-Type: application/json"  -d '{"id_estatus": "nuevo_estatus", "fecha_contrato": "2024-08-05", "id_usuario": "nuevo_id_usuario"}'

module.exports = router;
