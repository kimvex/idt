/*
  Equipo 2
*/

'use strict';

// Obtenemos los modulos
const Socket  = require('./app/socketServer'),
      Server  = require('./app/serverHttp');

// Instanciamos la clase servidor
let app = new Server();
//app.iniciando();
app.listen();

// Levantamos el servidor socket.io
const io = new Socket({server: app.servidor});
io.canales();

