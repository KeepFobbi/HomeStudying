import app from './app'
import mysql from 'mysql2'

async function start() {
  //  mongoose.Promise = global.Promise
  //handleDisconnect()
  try {
    //await mongoose.connect(process.env.MONGO_SERVER, { useNewUrlParser: true, useCreateIndex: true })
   
  } catch (e) {
    console.log('error', 'Database connection error', e)
    process.exit(1)
  }
  console.log('sales service',process.env.NODE_PORT)
  try {
    app.listen(process.env.NODE_PORT || 80)    
  } catch (e) {
    console.log('error', 'Startup error', e)
  }
}

start().then(() => {
  console.log('info', 'Started on ', process.env.NODE_PORT)
})

function handleDisconnect() {
  const connection = mysql.createConnection(DbConnectionData); // Recreate the connection, since
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