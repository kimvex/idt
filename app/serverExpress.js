/*
  Equipo 2
*/

'use strict';

// Obtenemos modulos
const express   = require('express'),
      helmet    = require('helmet'),
      parser    = require('body-parser'),
      nunjuscks = require('nunjucks'),
      cors      = require('cors'),
      session   = require('express-session'),
      path      = require('path'),
      Rutas     = require('./website/rutas'),
      statics   = require('./middlewares/statics'),
      Permisos  = require('./middlewares/permiso');

class ServerExpress {

  constructor(config){

    this.config = config || {};

    this.app = express();
    this.app.use(parser.json());
    this.app.use(parser.urlencoded({extended: true}));
    this.app.use(helmet());
    this.app.use(statics);
    this.app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true
    }));
    this.app.use(cors());
    this.app.set('view engine', 'html');

    nunjuscks.configure(path.join(__dirname, '/website/views'), {
      autoscape: true,
      express: this.app,
      noCache: process.env.ENV = 'dev' ? true : false,
      watch: false
    });

    let rutas = new Rutas({app:this.app, log: Permisos});

  }

}

module.exports = ServerExpress;
