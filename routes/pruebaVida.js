
const express = require('express');
const router = express.Router();
const db = require('../db'); 



router.get('/', (req, res) => {
    const startTime = Date.now(); 

    const query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'amanecer'";

    db.query(query, (err, results) => {
        const endTime = Date.now();
        const executionTime = endTime - startTime;

        if (err) {
            console.error('Error consultando la base de datos:', err.stack);
            return res.status(500).json({ message: 'Error consultando la base de datos', error: err.stack, timestamp: new Date().toISOString(), executionTime: `${executionTime}ms` });
        }

        const response = {
            message: results.length > 0 ? 'Conexión exitosa a la DB' : 'Error al conectar a la DB',
            timestamp: new Date().toISOString(), 
            data: results.length > 0 ? 'Exito' : 'Error',
        };

        res.json(response);
    });
});

module.exports = router;
