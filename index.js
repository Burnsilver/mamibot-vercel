
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_TOKEN = '8113673369:AAH9nSwEn_FcNhCYP-DpBuyv21t3tczbjtY';
const CHAT_ID = '7151273748';

app.get('/', (req, res) => {
  res.send('🟢 Mamibot backend activo en Vercel');
});

app.post('/enviar', async (req, res) => {
  const pedido = req.body.pedido;
  console.log("📥 Pedido recibido:", pedido);

  try {
    const telegramResponse = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `🛎️ Nuevo pedido:

${pedido}`
    });

    res.status(200).json({
      message: "Mensaje enviado correctamente",
      telegram_response: telegramResponse.data
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al enviar mensaje a Telegram",
      details: error.message
    });
  }
});

module.exports = app;
