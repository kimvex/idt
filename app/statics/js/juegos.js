/*
  Equipo 2
*/
'use strict';

// Importtamos la libreria de sockets
import socket from 'socket.io-client';
import cartas from './cartas';

let ip = document.querySelector('#ip').value;
let io = socket(`http://${ip}:2000`);
let gamer = document.querySelector('#jugadores');
let jugadores = [];
let mazo = ['cartasNegras','cartasRojas','cartasCorazon','cartasPicos'];
let imagen = document.querySelector('#imagen');
let carta = Math.floor(Math.random() * 10 / 3);
let cartaElecta = Math.floor(Math.random() * 150 / 13);
console.log(cartaElecta);
let i = `${cartas[mazo[carta]][cartaElecta]}`;
switch(carta){
	case 0:
		imagen.src = `cartas/${i}.png`;
	break;
	case 1:
		imagen.src = `cartas/${i}.png`;
	break;
	case 2:
		imagen.src = `cartas/${i}.png`;
	break;
	case 3:
		imagen.src = `cartas/${i}.png`;
	break;
}
console.log(mazo[carta]);
// Emitimos eñ nombre del usuario
io.emit('creando', localStorage.getItem('nombre'));

// Escuchamos a los nuevos jugadores
io.on('nuevoUsuario', (data)=>{

	// Itereamos el aarya de usuarios
	data.map((jugador)=>{
		
		// Buscamos que los jugadores existan
		let r = jugadores.find(x => x == jugador);

		// En caso de existir los agregamos al array 
		r == undefined ? jugadores.push(jugador) : '';
		console.log(jugadores);

		gamer.innerHTML = jugadores;
		document.querySelector('#primerJugador').innerHTML = jugadores[0] == undefined ? '' : jugadores[0];
		document.querySelector('#segundoJugador').innerHTML = jugadores[1] == undefined ? '' : jugadores[1];

	});
});

io.on('eliminarUsuario', (data)=>{

	// Buscamos que los jugadores existan
	let e = jugadores.indexOf(data);

	jugadores.splice(e,1);

	gamer.innerHTML = jugadores;
	document.querySelector('#primerJugador').innerHTML = jugadores[0] == undefined ? '' : jugadores[0];
	document.querySelector('#segundoJugador').innerHTML = jugadores[1] == undefined ? '' : jugadores[1];

});

document.querySelector('#comenzar').addEventListener('click', ()=>{
	io.emit('jugar', 'comenzar');
});

io.on('cartas', (data)=>{
	document.querySelector('#cartasG1').innerHTML = '';
	document.querySelector('#cartasG2').innerHTML = '';
	data.gamer1.cartas.map(x => {
		let img = document.createElement('img');
		img.src = data.gamer1.name == localStorage.getItem('nombre') ? `cartas/${x}.png` : `img/Iconndnjenc.png`;
		img.width = 50;
		img.height = 50;
		document.querySelector('#cartasG1').appendChild(img);
	});

	data.gamer2.cartas.map(x => {
		let img = document.createElement('img');
		img.src = data.gamer2.name == localStorage.getItem('nombre') ? `cartas/${x}.png` : `img/Iconndnjenc.png`;
		img.width = 50;
		img.height = 50;
		document.querySelector('#cartasG2').appendChild(img);
	})
});

document.querySelector('#cerrar').addEventListener('click', ()=>{
	io.emit('cerrando', localStorage.getItem('nombre'));
	setTimeout(()=>{
		window.location = '/cerrar';
	}, 500);
});