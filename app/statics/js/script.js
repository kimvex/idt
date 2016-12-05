/*
  Este archivo se encargara de agregar todos sockets del lado
  del cliente para la comunicacion bidireccional
*/
'use strict';

import io from 'socket.io-client';
import request from 'superagent';

let ip = document.querySelector('#ip').value;
let socket = io(`ws://${ip}:2000`);

document.querySelector('#juego').addEventListener('submit', (e)=>{

  let nombre = document.querySelector('#nombre').value;

  request
    .post('/')
    .send({nombre: nombre})
    .end((err, res)=>{
      console.log(res.text)
      if(res.text == '=>'){
        window.location = '/juego';
      }
    }); 

  e.preventDefault();

});

