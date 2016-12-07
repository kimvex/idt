require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({2:[function(require,module,exports){
/*
  Equipo 2
*/
'use strict';

// Importtamos la libreria de sockets

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _cartas = require('./cartas');

var _cartas2 = _interopRequireDefault(_cartas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ip = document.querySelector('#ip').value;
var io = (0, _socket2.default)('http://' + ip + ':2000');
var gamer = document.querySelector('#jugadores');
var jugadores = [];
var mazo = ['cartasNegras', 'cartasRojas', 'cartasCorazon', 'cartasPicos'];
var imagen = document.querySelector('#imagen');
var carta = Math.floor(Math.random() * 10 / 3);
var cartaElecta = Math.floor(Math.random() * 150 / 13);
console.log(cartaElecta);
var i = '' + _cartas2.default[mazo[carta]][cartaElecta];
switch (carta) {
	case 0:
		imagen.src = 'cartas/' + i + '.png';
		break;
	case 1:
		imagen.src = 'cartas/' + i + '.png';
		break;
	case 2:
		imagen.src = 'cartas/' + i + '.png';
		break;
	case 3:
		imagen.src = 'cartas/' + i + '.png';
		break;
}
console.log(mazo[carta]);
// Emitimos eñ nombre del usuario
io.emit('creando', localStorage.getItem('nombre'));

// Escuchamos a los nuevos jugadores
io.on('nuevoUsuario', function (data) {

	// Itereamos el aarya de usuarios
	data.map(function (jugador) {

		// Buscamos que los jugadores existan
		var r = jugadores.find(function (x) {
			return x == jugador;
		});

		// En caso de existir los agregamos al array 
		r == undefined ? jugadores.push(jugador) : '';
		console.log(jugadores);

		gamer.innerHTML = jugadores;
		document.querySelector('#primerJugador').innerHTML = jugadores[0] == undefined ? '' : jugadores[0];
		document.querySelector('#segundoJugador').innerHTML = jugadores[1] == undefined ? '' : jugadores[1];
	});
});

io.on('eliminarUsuario', function (data) {

	// Buscamos que los jugadores existan
	var e = jugadores.indexOf(data);

	jugadores.splice(e, 1);

	gamer.innerHTML = jugadores;
	document.querySelector('#primerJugador').innerHTML = jugadores[0] == undefined ? '' : jugadores[0];
	document.querySelector('#segundoJugador').innerHTML = jugadores[1] == undefined ? '' : jugadores[1];
});

document.querySelector('#comenzar').addEventListener('click', function () {
	io.emit('jugar', 'comenzar');
});

io.on('cartas', function (data) {
	document.querySelector('#cartasG1').innerHTML = '';
	document.querySelector('#cartasG2').innerHTML = '';
	data.gamer1.cartas.map(function (x) {
		var img = document.createElement('img');
		img.src = data.gamer1.name == localStorage.getItem('nombre') ? 'cartas/' + x + '.png' : 'img/Iconndnjenc.png';
		img.width = 50;
		img.height = 50;
		document.querySelector('#cartasG1').appendChild(img);
	});

	data.gamer2.cartas.map(function (x) {
		var img = document.createElement('img');
		img.src = data.gamer2.name == localStorage.getItem('nombre') ? 'cartas/' + x + '.png' : 'img/Iconndnjenc.png';
		img.width = 50;
		img.height = 50;
		document.querySelector('#cartasG2').appendChild(img);
	});
});

document.querySelector('#cerrar').addEventListener('click', function () {
	io.emit('cerrando', localStorage.getItem('nombre'));
	setTimeout(function () {
		window.location = '/cerrar';
	}, 500);
});

},{"./cartas":1,"socket.io-client":66}],1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	cartasNegras: ['mn1', 'mn2', 'mn3', 'mn4', 'mn5', 'mn6', 'mn7', 'mn8', 'mn9', 'mn10', 'mn11', 'mn12', 'mn13'],
	cartasRojas: ['mr1', 'mr2', 'mr3', 'mr4', 'mr5', 'mr6', 'mr7', 'mr8', 'mr9', 'mr10', 'mr11', 'mr12', 'mr13', 'mr14'],
	cartasCorazon: ['mc1', 'mc2', 'mc3', 'mc4', 'mc5', 'mc6', 'mc7', 'mc8', 'mc9', 'mc10', 'mc11', 'mc12', 'mc13', 'mc14', 'mc15', 'mc16', 'mc17'],
	cartasPicos: ['mp1', 'mp2', 'mp3', 'mp4', 'mp5', 'mp6', 'mp7', 'mp8', 'mp9', 'mp10', 'mp11', 'mp12', 'mp13']
};

},{}]},{},[2]);
