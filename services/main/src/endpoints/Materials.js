import express from 'express'

import response from '../helpers/response'



function Materials(pool) {
  const endPointsArr = []

  const CreateMaterial = express.Router()
  CreateMaterial.post('/api/creatematerial', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('INSERT INTO `trainingmaterials` (`topicId`, `content`) VALUES (?,?)', [
          req.body.topicId,
          req.body.content,
        ], (err, results, fields) => {
          if (err) {
            res.status(400).send({
              message: err
            });
          }
          res.send(results)
          connection.destroy();
        })
      });
    } catch (e) {
      console.log('CreateMaterial e', e)
      next(e)
    }
  })
  endPointsArr.push(CreateMaterial);

  const UpdateMaterial = express.Router()
  UpdateMaterial.post('/api/updatematerial', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('UPDATE `trainingmaterials` SET `content` = ? WHERE `id` = ?', [
          req.body.content,
          req.body.id,
        ], (err, results, fields) => {
          if (err) {
            res.status(400).send({
              message: err
            });
          }
          res.send(results)
          connection.destroy();
        })
      });
    } catch (e) {
      console.log('UpdateMaterial e', e)
      next(e)
    }
  })
  endPointsArr.push(UpdateMaterial);


  const GetMaterials = express.Router()
  GetMaterials.get('/api/getmaterial', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('SELECT tm.*, tp.`title`, tp.`description`, sb.`name` as `subjectName` FROM `trainingmaterials` as tm INNER JOIN `topics` as tp ON tm.`topicId` = tp.id INNER JOIN `subjects` as sb ON sb.`id` = tp.`subjectId` WHERE tm.`topicId` = ?',
          [
            req.query.topicId
          ], (err, results, fields) => {
            if (err) {
              res.status(400).send({
                message: err
              });
            }
            res.send(results)
            connection.destroy();
          })
      });
    } catch (e) {
      console.log('SubjectsList e', e)
      next(e)
    }
  })
  endPointsArr.push(GetMaterials);

  //---------------------------HomeWorks---------------------------

  const CreateHomework = express.Router()
  CreateHomework.post('/api/createhomework', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('INSERT INTO `homework` (`userId`, `lessonId`, `content`) VALUES (?,?,?)', [
          req.body.userId,
          req.body.lessonId,
          req.body.content
        ], (err, results, fields) => {
          if (err) {
            res.status(400).send({
              message: err
            });
          }
          res.send(results)
          connection.destroy();
        })
      });
    } catch (e) {
      console.log('CreateHomework e', e)
      next(e)
    }
  })
  endPointsArr.push(CreateHomework);

  const UpdateHomework = express.Router()
  UpdateHomework.post('/api/updatehomework', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {
        let queryString = 'UPDATE `homework` SET '
        let queryParams = []
        let paramsNum = 0
        if(req.body.content) {
          if(paramsNum > 0) {
            queryString += ','
          }
          queryString += ' `content` = ?'
          queryParams.push(req.body.content)
          paramsNum++;
        }
        if(req.body.mark) {
          if(paramsNum > 0) {
            queryString += ','
          }
          queryString += ' `mark` = ?'
          queryParams.push(req.body.mark)
          paramsNum++;
        }
        queryString += 'WHERE `id` = ?'
        queryParams.push(req.body.id)
        connection.query(queryString, queryParams, (err, results, fields) => {
          if (err) {
            res.status(400).send({
              message: err
            });
          }
          res.send(results)
          connection.destroy();
        })
      });
    } catch (e) {
      console.log('UpdateHomework e', e)
      next(e)
    }
  })
  endPointsArr.push(UpdateHomework);


  const GetHomeworkList = express.Router()
  GetHomeworkList.post('/api/gethomeworklist', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {
        let queryString = 'SELECT hw.*, us.`surname`, us.`name`, us.`fathername`, us.`login` FROM `homework` as hw INNER JOIN `users` as us ON hw.`userId` = us.`id`'
        let queryParams = []
        if(req.body.lessonId) {
          queryString += ' WHERE hw.`lessonId` = ?'
          queryParams.push(req.body.lessonId)
        }
        connection.query(queryString,
          queryParams
          , (err, results, fields) => {
            if (err) {
              res.status(400).send({
                message: err
              });
            }
            res.send(results)
            connection.destroy();
          })
      });
    } catch (e) {
      console.log('GetHomeworkList e', e)
      next(e)
    }
  })
  endPointsArr.push(GetHomeworkList);
  
  const GetHomework = express.Router()
  GetHomework.post('/api/gethomework', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {
        let queryString = 'SELECT hw.*, us.`surname`, us.`name`, us.`fathername`, us.`login` FROM `homework` as hw INNER JOIN `users` as us ON hw.`userId` = us.`id` '
        let queryParams = []
        if(req.body.id) {
          queryString += 'WHERE hw.`id` = ?'
          queryParams.push(req.body.id)
        } else {
          queryString += 'WHERE hw.`userId` = ? AND hw.`lessonId` = ?'
          queryParams.push(req.body.userId)
          queryParams.push(req.body.lessonId)
        }
        connection.query(queryString,queryParams, (err, results, fields) => {
            if (err) {
              res.status(400).send({
                message: err
              });
            }
            res.send(results)
            connection.destroy();
          })
      });
    } catch (e) {
      console.log('GetHomework e', e)
      next(e)
    }
  })
  endPointsArr.push(GetHomework);
  //------------------------------
  //---------------------------HomeTask---------------------------

  const UpdateHomeTask = express.Router()
  UpdateHomeTask.post('/api/updatehometask', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('UPDATE `lessons` SET `homeTask` = ? WHERE `id` = ?', [
          req.body.homeTask,
          req.body.id,
        ], (err, results, fields) => {
          if (err) {
            res.status(400).send({
              message: err
            });
          }
          res.send(results)
          connection.destroy();
        })
      });
    } catch (e) {
      console.log('UpdateHomeTask e', e)
      next(e)
    }
  })
  endPointsArr.push(UpdateHomeTask);

  return endPointsArr
}

export default Materials