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
    this.jugadores = [];
    console.log('Servidor socket.io se esta ejecutando');

  }

  // Metodo para levantar los canales
  canales(){

    // Creamos el canal que instanciara
    this.io.on('connection', (socket)=>{

      socket.on('creando', (data)=>{
        
        let s = this.jugadores.find( x => x == data);

        s == undefined ? this.jugadores.push(data) : '';

        console.log(this.jugadores);
        this.io.emit('nuevoUsuario', this.jugadores);

      });

      socket.on('cerrando', (data)=>{
        let eliminado = this.jugadores.indexOf(data);
        this.jugadores.splice(eliminado, 1);
        console.log(this.jugadores);
        this.io.emit('eliminarUsuario', data);
      });

    });

  }

}      

module.exports = Sockets;
