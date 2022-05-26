//------------------------------Prod-------------------
const productionConfig = {
  DB: {
    connectionLimit: 10,
    host: "localhost",
    user: "slavik",
    database: "stud",
    password: "Slavko228"
  },
  corsOrigin: ['http://localhost:3000','http://coder','http://31.131.19.63:3000','http://31.131.19.63']
}
//------------------------------Dev---------------------
const developmentConfig = {
  DB: {
    connectionLimit: 10,
    host: "localhost",
    user: "root",//"slavik",
    database: "stud",
    password: ""//"Slavko228"
  },
  corsOrigin: ['http://localhost:3000','http://coder','http://31.131.19.63:3000','http://31.131.19.63']
}
export productionConfig
export developmentConfig
