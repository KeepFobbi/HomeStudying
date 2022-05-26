const Response = require('./helpers/responce.js')

const express = require('express')
const mysql = require("mysql2");
const cors = require("cors")
const app = express()
const port = 3002

console.log(Response)

const DbConnectionData = {
  host: "localhost",
  user: "root",
  database: "agro",
  password: ""
}

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))

app.get('/api/getcompanies', (req, res) => {
  const connection = mysql.createConnection(DbConnectionData);
  
  connection.query('SELECT * FROM `companies`', (err,results,fields) => {
    res.send(results)
    return
  })
})

function handleDisconnect() {
  connection = mysql.createConnection(DbConnectionData); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

app.get('/api/createmonitor', (req, res) => {
  connection.query('SELECT * FROM `companies`', (err,results,fields) => {
    res.send(results)
    return
  })
})

app.get('/api/monitorsList', (req, res) => {
  connection.query('SELECT * FROM `monitor`', (err,results,fields) => {
    res.send(results)
    return
  })
})

app.get('/api/monitorsList', (req, res) => {
  connection.query('SELECT * FROM `monitor`', (err,results,fields) => {
    res.send(results)
    return
  })
})

app.post('/api/createmonitor',async (req, res, next) => {
  try {
    console.log(req.body)
    response.ok(res, "mon", 201)
  } catch (e) {
    console.log('CreateProducts e', e)
    next(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})