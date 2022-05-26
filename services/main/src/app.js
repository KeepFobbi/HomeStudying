import express from 'express'
import bodyParser from 'body-parser'

import response from './helpers/response'

import mysql from 'mysql2'
import Users from './endpoints/Users'
import Lesons from './endpoints/Lesons'
import Materials from './endpoints/Materials'
import cors from 'cors'

//import BalanceRouter from './endpoints/balance'
//import SubscriptionsRouter from './endpoints/subscriptions'
//import OrdersRouter from './endpoints/orders'
//import ProductsRouter from './endpoints/products'
//import ServicesRouter from './endpoints/service'

console.log(process.env.npm_config_deploymentPoint)
if(process.env.npm_config_deploymentPoint === 'production') {
  var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    database: "stud",
    password: "root"
  });
} else {
  var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",//"slavik",
    database: "stud",
    password: "root"//"Slavko228"
  });
}

  const addEndpoints = (app) => {
    app.get('/', (req, res) => { res.send('ok1231') })
    
    app.use(Users(pool))
    app.use(Lesons(pool))
    app.use(Materials(pool))
  }

  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json({ limit: '2mb' }))

  app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
  }))

  addEndpoints(app)

  app.use('*', function (req, res) {
    response.error(res, 'UnknownPath', 404)
  })

  app.use((err, req, res, next) => {
    console.log('t', req.url)
    if (res.headersSent) {
      return next()
    }
    console.log('err', err)
    response.error(res, 'InternalError', 500, err)
  })

export default app
