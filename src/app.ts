import 'reflect-metadata'
import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

config()

import userRouter from './app/users/routers/user';
import Container from 'typedi';
import { UserService } from './app/users/services/user';
import { UserController } from './app/users/controllers/user';
import Knex from "knex";
import { Model } from 'objection';
import knexConfig from './core/db/knexfile';
import authRouter from './app/users/routers/auth';

const knex = Knex(knexConfig)
Model.knex(knex);

export default knex;


const app = express();


declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

Container.set('UserService', UserService);
Container.set('UserController', UserController);


app.use(bodyParser.json());
app.use(authRouter);
app.use(userRouter);

app.listen(3000, ()=>{
  console.log('app is running on 3000');
})