import express,{Application} from 'express';
import http from 'http'
import cors from 'cors'
import { NextFunction } from 'express';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import connectDB from './frameworkes/database/connection';
import errorHandlingMiddleware from './frameworkes/webserver/middleware/errorHandlingMiddleware';
import routes from './frameworkes/webserver/routes/routes';
import expressConfig from './frameworkes/webserver/express';
import serverConfig from './frameworkes/webserver/server';
import socketConfig from './frameworkes/websocket/socket';
import AppError from './utils/appError';
import configKeys from './config';

const app:Application = express();

// starting the server 
const server=http.createServer(app);


serverConfig(server).startServer();

// calling express configuration
expressConfig(app);

// const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:["http://localhost:5001", "https://jobsync.online"]
}));

// socket connection
const io = new Server(server, {
    cors: {
      origin: configKeys.ORIGIN_PORT
    }
  });


socketConfig(io);


app.use(bodyParser.json());


// Import and use your routes here



// connecting database
connectDB();





// ...

// routes
routes(app);

// error handling middleware
app.use(errorHandlingMiddleware);

app.all('*', (req, res, next: NextFunction) => {
    next(new AppError('Not found', 404));
});

// ...
