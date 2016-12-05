/*
  Equipo 2
*/

'use strict';

// Obtener modulos
const io      = require('socket.io'),
      emiter  = require('events').EventEmitter.prototype._maxListeners = 0;

class Sockets {

  constructor(config){

    this.config = config || {};
    this.io = io.listen(this.config.server);
    console.log('Servidor socket.io se esta ejecutando');

  }

  // Metodo para levantar los canales
  canales(){

    // Creamos el canal que instanciara
    this.io.on('connection', (socket)=>{

      socket.on('creando', (data)=>{

        console.log(data);

      });

    });

  }

}      

module.exports = Sockets;
