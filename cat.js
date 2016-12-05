/*
  Este archivo es de configuracion para desarrollo
*/

'use strict';

const cat = require('catlistener');

cat.server({
  enviroment:{
    ENV: 'devop',
    SECRET: 'equipo2'
  },
  node: 'supervisor',
  app: 'app'
});

cat.browserify({
  original: ['./app/statics/js/script.js', './app/statics/js/juegos.js'],
  compilado: ['./app/statics/js/escript.js', './app/statics/js/juego.js'],
  common: './app/statics/js/global.js',
  presets: 'es2015'
});
