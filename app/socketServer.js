/*
  Equipo 2
*/

'use strict';

// Obtener modulos
const io      = require('socket.io'),
      emiter  = require('events').EventEmitter.prototype._maxListeners = 0,
      cards   = require('./website/models/cartas');

class Sockets {

  constructor(config){

    this.config = config || {};
    this.io = io.listen(this.config.server);
    this.jugadores = [];
    this.gamer1 = [];
    this.gamer2 = [];
    console.log('Servidor socket.io se esta ejecutando');

  }

  generacion(g1, g2){

    while( g2.length < 8){
      let mazo = ['cartasNegras','cartasRojas','cartasCorazon','cartasPicos'];
      let carta = Math.floor(Math.random() * 3);
      let cartaElecta = Math.floor(Math.random() * 13);
      console.log(carta + ' ', cartaElecta + ' ')
      let i = `${cards[mazo[carta]][cartaElecta]}`;
      let existe = g1.find(x => x == i);
      let verificar = g2.find(x => x == i);
      if(existe == undefined && verificar == undefined){
        g2.push(i);
      }
    }
  }

  cartas(jugador,cartas){

    this.jugador = jugador;
    this.carta = cartas;
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

      socket.on('jugar', (data)=>{

        this.gamer1 = [];
        this.gamer2 = [];

        let gamerOne = this.generacion(this.gamer1, this.gamer2);
        let gamertwo = this.generacion(this.gamer2, this.gamer1);

        this.io.emit('cartas', {
          gamer1: { name:this.jugadores[0],cartas:this.gamer1 },
          gamer2: { name: this.jugadores[1],cartas: this.gamer2}
        });

      });

    });

  }

}      

module.exports = Sockets;
