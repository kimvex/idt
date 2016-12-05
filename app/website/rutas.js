/*
  Equipo 2
*/

'use strict';

// Importamos los modulos
const rutas = require('./models/rutas');

class Rutas{

  constructor(config){

    this.config = config || {};
    
    let ruteo = new rutas(this.config);
    ruteo.gets();
    ruteo.posts();
  }

}

module.exports = Rutas;
