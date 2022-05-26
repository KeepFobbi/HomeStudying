import express from 'express'
import createToken from '../helpers/stringGenerator'

import response from '../helpers/response'



function Users(pool) {
  const endPointsArr = []

  const Login = express.Router()
  Login.post('/api/login',
    async (req, res, next) => {
      try {
        pool.getConnection(function (err, connection) {
          connection.query('SELECT * FROM `users` WHERE login = ? AND password = ?', [req.body.login, req.body.password], (err, userResults, fields) => {
            if (userResults[0]) {
              //-------------------------------------------------
              pool.getConnection(function (err, connection) {
                let token = createToken()
                connection.query('INSERT INTO `sessions` (`userId`, `token`) VALUES (?,?)', [userResults[0].id, token], (err, results, fields) => {
                  if (err) {
                    res.status(400).send({
                      message: err
                    });
                  } else {
                    res.send({result: results, token: token})                    
                  }
                  connection.destroy();
                })
              });
              //------------------------------------------------------------
            } else {
              res.status(400).send({
                message: err
              });
            }
            connection.destroy();
          })
        });
      } catch (e) {
        console.log('Login e', e)
        next(e)
      }
    }
  )
  endPointsArr.push(Login);

  const GetGroups = express.Router()
  GetGroups.get('/api/groupsList',
    async (req, res, next) => {
      try {
        pool.getConnection(function (err, connection) {
          connection.query('SELECT * FROM `groups`', (err, results, fields) => {
            res.send(results)
            connection.destroy();
          })
        });
      } catch (e) {
        console.log('getGroups e', e)
        next(e)
      }
    }
  )
  endPointsArr.push(GetGroups);

  const GetStudents = express.Router()
  GetStudents.get('/api/studentsList',
    async (req, res, next) => {
      try {
        pool.getConnection(function (err, connection) {
          connection.query('SELECT us.*, grl.`groupsId`, gr.`name` as `groupName`, grl.`id` as `relationId` FROM `users` us LEFT JOIN `grouprelations` as grl ON grl.`userId` = us.`id` LEFT JOIN `groups` as gr ON grl.`groupsId` = gr.`id`', (err, results, fields) => {
            res.send(results)
            connection.destroy();
          })
        });
      } catch (e) {
        console.log('GetStudents e', e)
        next(e)
      }
    }
  )
  endPointsArr.push(GetStudents);

  const CreateGroup = express.Router()
  CreateGroup.post('/api/createGroup', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO `groups` (`name`) VALUES (?)', [
          req.body.name
        ], (err, results, fields) => {
          if (err) {
            console.log(err)
          }
          res.send(results)
          connection.destroy();
        })
      });
    } catch (e) {
      console.log('CreateGroup e', e)
      next(e)
    }
  })
  endPointsArr.push(CreateGroup);

  const CreateStudent = express.Router()
  CreateStudent.post('/api/createStudent', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO `users` (`login`, `password`, `role`, `surname`, `name`, `fathername`, `birthday`) VALUES (?,?,?,?,?,?,?)', [
          req.body.login,
          req.body.password,
          req.body.role,
          req.body.surname,
          req.body.name,
          req.body.fathername,
          req.body.birthday
        ], (err, userResult, fields) => {
          if (err) {
            console.log(err)
          } else {
            //-------------------------------------------          
            pool.getConnection(function (err, connection) {

              connection.query('INSERT INTO `grouprelations` (`userId`,`groupsId`) VALUES (?,?)',
                [
                  userResult.insertId,
                  req.body.groupId
                ], (err, results, fields) => {
                  if (err) { console.log(err) } else {
                    res.send({ user: userResult, groupRelations: results })
                  }
                  connection.destroy();
                })
            });
            //*---------------------------------------------
          }

          connection.destroy();
        })
      });
    } catch (e) {
      console.log('CreateStudent e', e)
      next(e)
    }
  })
  endPointsArr.push(CreateStudent);

  const CheckToken = express.Router()
  CheckToken.post('/api/checktoken', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('SELECT ss.*, us.`name`, us.`surname`, us.`fathername`, us.`role`,gl.`groupsId` FROM `sessions` as ss INNER JOIN `users` AS us ON ss.`userId` = us.`id` LEFT JOIN `grouprelations` as gl ON us.`id` = gl.`userId` WHERE ss.`token` = ?', [
          req.body.token
        ], (err, results, fields) => {
          if (err || (!results[0])) {
            res.status(400).send({
              message: err
           });
           } else {
            res.send(results)
           }
          connection.destroy();
        })
      });
    } catch (e) {
      console.log('CheckToken e', e)
      next(e)
    }
  })
  endPointsArr.push(CheckToken);

  //--------------EDIT---------------//
  const EditUser = express.Router()
  EditUser.post('/api/editUser',
    async (req, res, next) => {
      try {
        pool.getConnection(function (err, connection) {
          connection.query('UPDATE `users` SET `login` = ?,`password` = ?,`role` = ?, `name` = ?, `surname` = ?, `fathername` = ?, `birthday` = ? WHERE `id` = ?',[
            req.body.login,
            req.body.password,
            req.body.role,
            req.body.name,
            req.body.surname,
            req.body.fathername,
            req.body.birthday,
            req.body.id,
          ], (err, results, fields) => {
            if(err) {console.log(err)}
            else {
              pool.getConnection(function (err, connection) {
                if(req.body.relationId){
                  connection.query('UPDATE `grouprelations` SET `groupsId` = ? WHERE `id` = ?',
                  [
                    req.body.groupsId,
                    req.body.relationId
                  ], (err, results, fields) => {
                    if (err) { console.log(err) } else {
                      res.send(results)
                    }
                    connection.destroy();
                  })
                } else {
                  connection.query('INSERT INTO `grouprelations` (`userId`,`groupsId`) VALUES (?,?)',
                  [
                    req.body.id,
                    req.body.groupsId
                  ], (err, results, fields) => {
                    if (err) { console.log(err) } else {
                      res.send(results)
                    }
                    connection.destroy();
                  })
                }                
              });
            }
            connection.destroy();
          })
        });
      } catch (e) {
        console.log('EditUser e', e)
        next(e)
      }
    }
  )
  endPointsArr.push(EditUser);

  return endPointsArr
}

export default Users