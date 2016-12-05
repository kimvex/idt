/*
  Equipo 2
*/

'use strict';

// Obtenemos los modulos
const cluster = require('cluster'),
      sticky  = require('socketio-sticky-session'),
      Socket  = require('./app/socketServer'),
      Server  = require('./app/serverHttp');

let server = sticky(()=>{

  // Instanciamos la clase servidor
  let app = new Server();
  //app.iniciando();

  // Levantamos el servidor socket.io
  const io = new Socket({server: app.servidor});
  io.canales();
  return app.servidor;
});

server.listen(2000, ()=> console.log('Servidor Ejecutandose'));
