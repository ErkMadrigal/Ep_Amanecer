
const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const resend = new Resend('re_TaAU68d5_N2n4iZYxY8Yv4ZA81iJtsF6E');



router.get('/send-email', async (req, res) => {
    try {
        const { data, error } = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: ['erick.madfl@gmail.com'],
          subject: 'Hello World',
          html: '<strong>It works!</strong>',
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
