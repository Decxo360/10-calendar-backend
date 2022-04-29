const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
require('dotenv').config()

//crear el servidor de express
const app = express();

//bd
dbConection();

//lectura y parseo del body
app.use(express.json());

//Todo: auth // crear, login, renew
//Todo: Crud: Eventos
app.use('/api/auth', require('./routes/auth'));
//Todo: Crud: crear,eliminar,actualizar,obtener
app.use('/api/events', require('./routes/events'));

//Dir publico
app.use(express.static('public'))

app.listen(process.env.PORT,()=>{
    console.log('Servidor en puerto 4000');
});
