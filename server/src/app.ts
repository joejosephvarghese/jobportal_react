import express,{Application} from 'express';
import http from 'http'
import cors from 'cors'
import { NextFunction } from 'express';

import bodyParser from 'body-parser';
import connectDB from './frameworkes/database/connection';
import errorHandlingMiddleware from './frameworkes/webserver/middleware/errorHandlingMiddleware';
import routes from './frameworkes/webserver/routes/routes';
import expressConfig from './frameworkes/webserver/express';
import serverConfig from './frameworkes/webserver/server';

import AppError from './utils/appError';


const app:Application = express();

// starting the server 
const server=http.createServer(app);


serverConfig(server).startServer();

// calling express configuration
expressConfig(app);

// const PORT = process.env.PORT || 5000;

app.use(cors());
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
