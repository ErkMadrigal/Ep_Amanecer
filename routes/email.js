const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const resend = new Resend('re_TaAU68d5_N2n4iZYxY8Yv4ZA81iJtsF6E');

router.post('/send-email', async (req, res) => {
    const { email, nombreCliente, fecha, numeroLote, productos, subtotal, descuento, total, tiempoEntrega, condicionesPago } = req.body;

    try {
        const datosCotizacion = {
            fecha: '11 de Agosto, 2024',
            nombreCliente: 'Juan Pérez',
            numeroLote: 'A123',
            productos: [
                { nombre: 'Servicio de Construcción', precio: 5000 },
                { nombre: 'Materiales de Construcción', precio: 3000 }
            ],
            subtotal: 8000,
            descuento: 500,
            total: 7500,
            tiempoEntrega: '3 semanas',
            condicionesPago: '50% al inicio, 50% al finalizar'
        };

        // Renderiza la plantilla EJS a HTML
        const htmlContent = await new Promise((resolve, reject) => {
            res.render('cotizacion', datosCotizacion, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        // Envía el correo utilizando Resend
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['erick.madfl@gmail.com'],
            subject: 'Cotización para ' + datosCotizacion.nombreCliente,
            html: htmlContent,
        });

        if (error) {
            return res.status(500).json({ error });
        }

        res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
