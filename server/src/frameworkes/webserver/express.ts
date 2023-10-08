import express, {Application} from 'express';
import morgan from 'morgan'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const expressConfig = (app: Application) =>{
    app.use(cookieParser());
    app.use(morgan('dev'));
    app.use(cors({
        origin:["http://localhost:5001"],
        credentials:true,
    }));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
   

};

export default expressConfig;