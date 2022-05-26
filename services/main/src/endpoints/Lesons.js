import express from 'express'

import response from '../helpers/response'



function Lesons(pool) {
  const endPointsArr = []

  const CreateSubject = express.Router()
  CreateSubject.post('/api/createsubject', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('INSERT INTO `subjects` (`name`) VALUES (?)', [
          req.body.name
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
      console.log('CreateSubject e', e)
      next(e)
    }
  })
  endPointsArr.push(CreateSubject);

  const SubjectsList = express.Router()
  SubjectsList.get('/api/subjectList', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('SELECT * FROM `subjects`', (err, results, fields) => {
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
  endPointsArr.push(SubjectsList);

  //------------------------------TOPICS-------------------------------//

  const CreateTopic = express.Router()
  CreateTopic.post('/api/createtopic', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('INSERT INTO `topics` (`description`, `title`, `subjectId`) VALUES (?,?,?)', [
          req.body.description,
          req.body.title,
          req.body.subjectId
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
      console.log('CreateTopic e', e)
      next(e)
    }
  })
  endPointsArr.push(CreateTopic);

  const TopicsList = express.Router()
  TopicsList.get('/api/topicList', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {  
        //-----------------------------------------------      
        let proces = (err, results, fields) => {
          if (err) {
            res.status(400).send({
              message: err
           });
           }
          res.send(results)
          connection.destroy();
        }
        let queryString = 'SELECT tp.*, sb.`name` AS \'subjectName\' FROM `topics` AS tp INNER JOIN `subjects` AS sb ON tp.`subjectId` = sb.`id`';
        //-----------------------------------------------------------
        if(req.query.subjectId){
          connection.query(queryString + " WHERE sb.id = ?",[
            req.query.subjectId
          ], proces)
        } else {          
          connection.query(queryString, proces)
        }
      });
    } catch (e) {
      console.log('TopicsList e', e)
      next(e)
    }
  })
  endPointsArr.push(TopicsList);

  //------------------------------LESSONS-------------------------------//

  const CreateLesson = express.Router()
  CreateLesson.post('/api/createlesson', async (req, res, next) => {
    try {
      pool.getConnection(function (err, connection) {

        connection.query('INSERT INTO `lessons` (`lessonDescription`, `dateStart`, `userId`, `topicId`, `groupId`) VALUES (?,?,?,?,?)', [
          req.body.	lessonDescription,
          req.body.dateStart,
          req.body.userId,
          req.body.topicId,
          req.body.groupId
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
      console.log('CreateLesson e', e)
      next(e)
    }
  })
  endPointsArr.push(CreateLesson);

  const EventCalendar = express.Router()
  EventCalendar.post('/api/eventcalendar', async (req, res, next) => {
    try {  
        pool.getConnection(function (err, connection) {
          let queryString = 'SELECT ls.*, tp.subjectId, tp.title AS `topicName`, gr.name AS `groupName`, ur.name AS `userName`, ur.surname AS `userSurname`, ur.fathername AS `userFathername` FROM `lessons` AS ls INNER JOIN `topics` AS tp ON ls.topicId = tp.id INNER JOIN `groups` AS gr ON ls.groupId = gr.id INNER JOIN `users` AS ur ON ls.`userId` = ur.`id`'
          let qeryParams = []
          if(req.body.groupId) {
            queryString += " WHERE ls.`groupId` = ?"
            qeryParams.push(req.body.groupId)
          }
          connection.query(queryString, qeryParams, (err, results, fields) => {
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
      console.log('EventCalendar e', e)
      next(e)
    }
  })
  endPointsArr.push(EventCalendar);

  const EditLesson = express.Router()
  EditLesson.post('/api/editlesson',
    async (req, res, next) => {
      try {
        pool.getConnection(function (err, connection) {
          connection.query('UPDATE `lessons` SET `lessonDescription` = ?,`dateStart` = ?,`userId` = ?, `topicId` = ?, `groupId` = ?, `roomLink` = ? WHERE `id` = ?',[
            req.body.lessonDescription,
            req.body.dateStart,
            req.body.userId,
            req.body.topicId,
            req.body.groupId,
            req.body.roomLink,
            req.body.id,
          ], (err, results, fields) => {
            if(err) {console.log(err)}
            res.send(results)
            connection.destroy();
          })
        });
      } catch (e) {
        console.log('EditLesson e', e)
        next(e)
      }
    }
  )
  endPointsArr.push(EditLesson);

  return endPointsArr
}


export default Lesons