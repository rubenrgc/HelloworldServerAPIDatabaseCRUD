

1.- Se instalo MongoDB ,Mongoose --save y se agreego al archivo db.js las siguientes linea para que no diera problemas mongoose.set('useFindAndModify', false); mongoose.Promise = global.Promise; ,dotenv --save,
2.- es necesario instalar la version enterprise https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/


3.-se instalo + graphql-iso-date@3.6.1
se creo la carpeta ..util/gravatar y se inserto el siguiente codigo 
/* Take in an email and generate a Gravatar url */
/* https://gravatar.com/site/implement/ */
const md5 = require('md5');

const gravatar = email => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};

module.exports = gravatar;

4.- se instalo npm install md5
5.- Consultas en Graph QL
Para Crear un Usuario que nos de un jasonwebtoken para validar que estamos en sesion  Es necesario ejecutar el dsiguente codigo
En playground GraphQL Insertamos el Siguiente codigo Para crear ael usuario en dado caso de que ya exista arroja un error de servidor


usaremos los resolver se Mutation
para hacer un 

----------------------Create User--------------------------------

mutation {
 signUp(
 username: "Ruben_Gonzalez",
 email: "rubenrgc@gmail.com",
 password: "ruben1234ruben"
       )
   }

Nos dara la siguiente respuesta si no hay ningun problema, esto quiere decir que nustro usuario ha sido creado exitosamente y nos da un token.

Respuesta de GraphQl Playground.

{
  "data": {
    "signUp": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDgyMjkyOWJmNWY1MjUyMjBmNDc1ZCIsImlhdCI6MTYwODAwMDE0Nn0.aaALkbFyFujoE5gLiPlbXNBbG4gzqs8IHOlu4tNB2JA"
  }
}

------------------------Iniciar Sesion----------------------------

mutation {
 signIn(
 username: "Ruben_Gonzalez",
 email: "rubenrgc@gmail.com",
 password: "ruben1234ruben"
       )
   }

Respuesta de GraphQl Playground
nos responde con un token para validar que el usuario ha iniciado sesion
este tokken sera la autorizacion http header para validar usuario
{
  "data": {
    "signIn": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDgyMjkyOWJmNWY1MjUyMjBmNDc1ZCIsImlhdCI6MTYwODAwMDE5Nn0.4QUxGHRAkFaV-tROdvRLB-rX_vTjeX3PHSKX26mSFRg"
  }
}






--------------------------------Consulta Notas--------------------
query {
  notes {
  id
  }
}


----------------- Creacion de notas ------------------------------
se agreega el token a http headers

{
"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDgyMjkyOWJmNWY1MjUyMjBmNDc1ZCIsImlhdCI6MTYwODAwMDE5Nn0.4QUxGHRAkFaV-tROdvRLB-rX_vTjeX3PHSKX26mSFRg"
} 

con nuestra autorizacion de usuario  anadida, asignaremos una nueva nota con el sigueiente codigo esto creara la nota y asignara un identificador para la nota

mutation {
newNote(content: "Hello! This is a user-created note") {
id
content
}
}

la respuesta de GrapQl sera la siguiente 
{
  "data": {
    "newNote": {
      "id": "5fd823e29bf5f525220f475e",
      "content": "Hello! This is a user-created note"
    }
  }
}

------------------Consultas de Usuarios-------------------------


podremos hacer tres tipos de consultas 

User, Users y me 

para consultar un solo usuario aplicaremos la siguiente consulta sin la autorizacion del webtoken no es necesario

query {
   user(username:"Ruben_Gonzalez") {
   username
    email
   id
   }
}


GrapQl respondera con el usuario y su esquema con la informacion del mismo


  "data": {
    "user": {
      "username": "Ruben_Gonzalez",
      "email": "rubenrgc@gmail.com",
      "id": "5fd822929bf5f525220f475d"
    }
  }
}


Tambien haremos una consulta de USERS que nos dara la lista completa de usuarios con la siguiente consulta esto es sin nuestro webtoken


query {
  users {
  username
  email
  id
}
}

la respuesta es la siguiente::
  "data": {
    "users": [
      {
        "username": "BeeBoop",
        "email": "robot@example.com",
        "id": "5fc1f32bdf842a510949d2d0"
      },
      {
        "username": "Beeoop",
        "email": "robot@eample.com",
        "id": "5fc31dab0a1f3116595c320a"
      },
      {
        "username": "Wero",
        "email": "wero@example.com",
        "id": "5fc4996cbdd55417fa8f32f6"
      },
      {
        "username": "BeeBoo",
        "email": "robot@examle.com",
        "id": "5fd07405927c101e7cd5f53f"
      },
      {
        "username": "adam",
        "email": "adam@example.com",
        "id": "5fd082d4e8eb8521163962ae"
      },
      {
        "username": "ruben",
        "email": "rubenrgc@hotmail.com",
        "id": "5fd3200e9039d224620d252d"
      },
      {
        "username": "Ruben_Gonzalez",
        "email": "rubenrgc@gmail.com",
        "id": "5fd822929bf5f525220f475d"
      }
    ]
  }
}



ahora para hacer la consulta de un usuario que actualmente ha iniciado sesion debera tener el webtoken para que lo podamos visualizar con la siguiente consulta


{
"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzFmMzJiZGY4NDJhNTEwOTQ5ZDJkMCIsImlhdCI6MTYwNzk4NTE2OX0.7Ku5edw-WFmF0QtklsArTMXd0YLvz16IaUWvrNuiCuM"
}

query {
   me {
   username
   email
   id
  }
}

La respuesta de GrapQl Sera la siguiente que nos dara el usuario  al que esta ligado el token web
con su esquema y su informacion contenida en la base de datos de mongodb
{
  "data": {
    "me": {
      "username": "BeeBoop",
      "email": "robot@example.com",
      "id": "5fc1f32bdf842a510949d2d0"
    }
  }
}





----------------------------Toggling Note Favorites----------------
----------------------------Alternar favoritos de notas------------

Para hacer una nueva nota con favorite count lo hacemos de la siguiente manera 

mutation {
newNote(content: "Check check it out!") {
content
favoriteCount
id
}
}


{
"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzFmMzJiZGY4NDJhNTEwOTQ5ZDJkMCIsImlhdCI6MTYwNzk4NTE2OX0.7Ku5edw-WFmF0QtklsArTMXd0YLvz16IaUWvrNuiCuM"
}

despues de hacer nuestra nota se pone el contador en cero para el like 
{
  "data": {
    "newNote": {
      "content": "Check check it out!",
      "favoriteCount": 0,
      "id": "5fd846a914351c2f474addde"
    }
  }
}
una vez que se hace la siguiente mutacion debera agreegarse el id de la nota que estara ligada con el usuario con su respectiva sesion 

mutation {
toggleFavorite(id: "606aa7511210603eb81f8001") {
favoriteCount
}
}
despues de esto el contador se pondra en uno para hacernos saber que ya esta marcada como nota favorita o como que ya dimos un like 
que al momento de ejecutar este mismo codigo se volvera a poner en cero el contador
{
  "data": {
    "toggleFavorite": {
      "favoriteCount": 1
    }
  }
}


--------------------------Nested Queries-------------------------
--------------------------Consultas Anidadas---------------------


query {
note(id: "606aa7511210603eb81f8001") {
id
content
# the information about the author note
author {
username
id
}
}
}

Esta es una consulta anidada que se hizo aplicando el id de la nota y nos devuelve lo siguiente asi sabemos que autor lo hizo y el id

{
  "data": {
    "note": {
      "id": "5fd8499d14351c2f474adde0",
      "content": "Check check it out!",
      "author": {
        "username": "BeeBoop",
        "id": "5fc1f32bdf842a510949d2d0"
      }
    }
  }
}

tambien lo podemos consultar por id favorito

mutation {
toggleFavorite(id: "606aa7511210603eb81f8001") {
favoriteCount
favoritedBy {
username
}
}
}


------------------push para github-------------------------

primero hacer link de la aplicacion hacia github
git  add .


para hacerle saber quien somos a github
git config --global user.email "email"
git config --global user.user "usuario"

para hacer el commit
git commit -m "mensaje que quieras poner"

para hacer elpush
git push

y revisar en github que este el proyecto



--------------------Instalacion de heroku ----------------------

sudo snap install --classic heroku
 
 se revisa si esta instalado correctamente
 con el comando heroku --version
 arroja lo siguiente
 ›   Warning: Our terms of service have changed: 
 ›   https://dashboard.heroku.com/terms-of-service
heroku/7.49.0 linux-x64 node-v12.16.2

iniciamos sesion en heroku terminal con el sigueinte comando

 heroku login