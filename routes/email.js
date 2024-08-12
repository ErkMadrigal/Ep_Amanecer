const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const resend = new Resend('re_TaAU68d5_N2n4iZYxY8Yv4ZA81iJtsF6E');

router.post('/send-email', async (req, res) => {
    const { lote, nombreCliente, lxa, mLote, exedente, areaTotal, apartado, precioM, planCompra, mesualidades, totalMensualidades, Enganche, totalPagos, planPagos, PrecioLista, descuento, PrecioTotal, escritura, correo } = req.body;

    try {
        const datosCotizacion = {
            lote: lote,
            nombreCliente: nombreCliente,
            
            lxa: lxa,
            mLote: mLote,
            exedente: exedente,
            areaTotal: areaTotal,

            apartado: apartado,
            precioM: precioM,

            planCompra: planCompra,
            mesualidades: mesualidades,
            totalMensualidades: totalMensualidades,

            Enganche: Enganche,
            totalPagos: totalPagos,

            planPagos: planPagos,

            PrecioLista: PrecioLista,
            descuento: descuento,
            PrecioTotal: PrecioTotal,
            escritura: escritura,
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
            to: [correo],
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
