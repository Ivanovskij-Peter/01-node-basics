const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { contactRouter } = require('./contact/contact.router.js');
require('dotenv').config({path:path.join(__dirname,'../.env')})


const CrudServer = class {
    constructor() {
        this.app = null;
    }

    start() {
        this.initServer();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
        this.startListening();
    };
    initServer() {
        this.app = express();
    }
    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'))
        this.app.use(cors());
    }
    initRoutes() {
        this.app.use('/contacts', contactRouter);
    }
    
    initErrorHandling() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            return res.status(statusCode).send(err.message);
        })
    }
    startListening() {
        const { PORT } = process.env;
        this.app.listen(PORT, () => {
            console.log('Server started listening on port :', PORT);
        })
    };

};
new CrudServer().start();