const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});

app.get('/', (req, res) => {
  res.send('Servidor WebRTC listo ✅');
});

io.on('connection', (socket) => {
  console.log('🟢 Conectado:', socket.id);
  socket.on('offer', data => socket.broadcast.emit('offer', data));
  socket.on('answer', data => socket.broadcast.emit('answer', data));
  socket.on('candidate', data => socket.broadcast.emit('candidate', data));
  socket.on('disconnect', () => console.log('🔴 Desconectado:', socket.id));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT);
});