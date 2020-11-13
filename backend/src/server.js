const express = require('express');
const mongoose = require('mongoose');//banco de dados
const cors = require('cors');//permite acesso do backend
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://root:root@clustersch.ap4vm.mongodb.net/sch_marketlist_db?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3334);