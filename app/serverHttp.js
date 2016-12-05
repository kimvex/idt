/*
  Equipo 2
*/

'use strict';

// Obtenemos los modulos
const http    = require('http'),
      Express = require('./serverExpress');

class ServidorHttp{

  constructor(config){

    this.config = config || {};

    this.server = new Express();

    this.servidor = http.createServer(this.server.app);

  }

}

module.exports = ServidorHttp;
