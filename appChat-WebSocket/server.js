var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.app_port || 8080;
var ip = process.env.app_host || '127.0.0.1';

app.use(express.static(__dirname + '/views'));


var messages = [
  {
    'id': 1,
    'text': 'Ingrese Nombre, Mensaje y Enviar :)',
    'autor': 'DanySan'
  }
];


var cont = 0;
app.get('/hello', (req, res) => {
  res.status(200).send("Hola Mundo! " + cont);
  cont++;
});

var rst = 0;
app.get('/reset', (req, res) => {
  res.status(200).send("reset! " + rst);
  messages = [
  	{
		'id': 1,
		'text': 'Ingrese Nombre, Mensaje y Enviar :)',
		'autor': 'DanySan'
   	}
  ];

  io.sockets.emit('messages', messages);
  rst++;
});

io.on('connection', socket => {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages',messages);

  socket.on('new-message', data => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

server.listen(port, err => {
  if(err) return console.log('error en listen server:' + err);
  console.log(`Servidor escuchando en nodechat2.cloudno.de [ip:port] ${ip}:${port}`);
});
