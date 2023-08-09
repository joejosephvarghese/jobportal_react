import express,{Application} from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import connectDB from './frameworkes/database/connection';
import expressConfig from './frameworkes/webserver/express';
import serverConfig from './frameworkes/webserver/server';
import http from 'http'
const app:Application = express();
expressConfig(app)
// const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


// Import and use your routes here



// connecting database
connectDB()

// starting the server 
const server=http.createServer(app)
serverConfig(server).startServer();

// catch 404 and forwarding to error handler

