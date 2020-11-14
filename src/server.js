const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { contactRouter } = require('./contact/contact.router');
require('dotenv').config({path:path.join(__dirname,'../.env')})


exports.CrudServer = class {
    constructor() {
        this.app = null;
    }

    start() {
        this.initServer();
        // this.initDatabase();
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