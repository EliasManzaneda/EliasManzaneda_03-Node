var moment = require('moment');
var http = require('http');
var url = require('url');
var fs = require('fs');

function iniciar(enrutar, request){
	function arrancarServidor(peticion, respuesta){
		console.log("Se ha conectado un cliente a las "  + moment().format() + "\n");
		var ruta = url.parse(peticion.url).pathname;
		
		
		enrutar(ruta, request, respuesta);
		
		var archivo_accesos = fs.createWriteStream("accesos.txt", {"flags":"a"});
		archivo_accesos.write("\n" + ruta + " - " + moment().format() + "\n");
		
		//respuesta.writeHead(200,{"Content-Type":"text/html"});
		//respuesta.write("<h1>Bienvenido, Servidor Web de Node.js</h1>");
		//respuesta.end();
	}
	http.createServer(arrancarServidor).listen(8080);
	console.log("Servidor web iniciado." + "\n");
}
exports.iniciar = iniciar;