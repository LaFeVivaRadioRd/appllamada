// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*", // Permite conexiones desde cualquier origen (incluyendo tu app Android)
    methods: ["GET", "POST"]
  }
});

// Ruta de prueba (opcional)
app.get('/', (req, res) => {
  res.send('Servidor WebRTC listo ✅');
});

// Manejo de conexiones WebRTC
io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado:', socket.id);

  // Reenvía ofertas, respuestas y candidatos ICE a todos los demás
  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });

  socket.on('candidate', (data) => {
    socket.broadcast.emit('candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Usuario desconectado:', socket.id);
  });
});

// Escucha en el puerto asignado por Render (o 3000 en local)
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});