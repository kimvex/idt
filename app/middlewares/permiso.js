/*
  Equipo 2
*/

'use strict';

module.exports = {

  permitido: (sol, res, next) =>{

    if(sol.session.name){

      next();

    }else{

      res.redirect('/');

    }

  },
  dentro: (sol, res, next)=>{
    if(sol.session.name){
      res.redirect('/juego');
    }else{
      next();
    }
  },
  cerrar: (sol, res, next)=>{
    if(sol.session.name){
      sol.session.destroy();
      next();
    }else{
      res.redirect('/juego');
    }
  } 

};
