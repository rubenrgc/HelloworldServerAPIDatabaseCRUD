

1.- Se instalo MongoDB ,Mongoose --save y se agreego al archivo db.js las siguientes linea para que no diera problemas mongoose.set('useFindAndModify', false); mongoose.Promise = global.Promise; ,dotenv --save,
2 es necesario instalar la version enterprise https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/