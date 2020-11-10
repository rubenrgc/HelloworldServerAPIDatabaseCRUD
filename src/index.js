const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get('/',(req,res)=>res.send('Hello ruben!!!'));


app.listen(port, () =>
console.log(`Server running at http://localhost:${port}`)
);


/*
en este ejemplo, primero requeriremos la dependencia de exprpess
y crearemos un objeto de la app, usando el modulo inportado de express.
Despues usaremoslos objetos app el metodo get para instruir a nuestra 
aplicadcion para enviar una respuesta de helloworld cuando un usuario acceda
a el root URL (/). despues instruiremos nuestra plicacion  para correr
en el puerto 4000.
*/