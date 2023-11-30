import 'dotenv/config.js';
import  Express from 'express';
import indexRouter from './router/indexRouter.js';
import cors from 'cors';
import notFoundHandler from './middlewares/notFoundHandler.js'
import errorHandler from './middlewares/errorHandler.js';
import './Config/Database.js'


const server = Express();

server.use(cors())
server.use(Express.json());
server.use('/api', indexRouter);

server.use(notFoundHandler);
server.use(errorHandler);


server.listen(process.env['PORT'], ()=> { console.log('Corriendo en el server' + process.env['PORT'])})