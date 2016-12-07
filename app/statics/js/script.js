/*
  Este archivo se encargara de agregar todos sockets del lado
  del cliente para la comunicacion bidireccional
*/
'use strict';

import io from 'socket.io-client';
import axios from 'axios';

let ip = document.querySelector('#ip').value;
let socket = io(`http://${ip}:2000`);

document.querySelector('#ingresa').addEventListener('click', (e)=>{
  let nombre = document.querySelector('#nombre').value;
  console.log(nombre);

  axios.post('/', {
    data: {nombre: nombre}
  })
  .then((data)=>{
      console.log(data);
    if(data.accs = '=>'){
      localStorage.setItem('nombre',data.data.name);
      document.location = '/juego';
    }
  });

  e.preventDefault();

});

