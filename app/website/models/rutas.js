/*
  Equipo 2
*/

'use strict';

// Importando modulos
const ipServer = require('ip');

class Ruteos {

  constructor(config){

    this.app = config.app || {};
    this.permiso = config.log;

  }

  gets(){

    this.app.get('/', this.permiso.dentro, (sol, res, next)=>{

      console.log(sol.session);

      let ip = ipServer.address();

      res.render('index', {ip: ip});

    });

    this.app.get('/juego', this.permiso.permitido, (sol, res, next)=>{
      let ip = ipServer.address();
      res.render('juego', {ip:ip});

    });

    this.app.get('/cerrar', this.permiso.cerrar,(sol, res, next)=>{
      res.redirect('/');
    });
  }

  posts(){

    this.app.post('/', (sol, res, next)=>{

      let hour = 3600000;

      sol.session.name = sol.body.nombre;
      sol.session.cookie.expires = new Date(Date.now() + hour);
      console.log(res.send('=>'));
    });

  }

}

module.exports = Ruteos;
