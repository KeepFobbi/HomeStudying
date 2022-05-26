import GroupsList from '../modules/User/container/GroupsList'
import CreateGroup from '../modules/User/container/CreateGroup'
import StudentsList from '../modules/User/container/StudentList'
import CreateStudent from '../modules/User/container/CreateStudent'
import CreateSubject from '../modules/Lesons/container/CreateSubject';
import SubjectsList from '../modules/Lesons/container/SubjectsList';
import CreateTopics from '../modules/Lesons/container/CreateTopics';
import TopicsList from '../modules/Lesons/container/TopicsList';
import EventCalendar from '../modules/Lesons/container/EventCalendar';
import CreateLesson from '../modules/Lesons/container/CreateLessons';
import EditTrainingMaterials from '../modules/Materials/container/EditTrainingMaterials';
import ShowTrainingMaterials from '../modules/Materials/container/ShowTrainingsMaterials';
import ShowHomework from '../modules/Materials/container/ShowHomework';
import EditHomework from '../modules/Materials/container/EditHomework';
import LessonData from '../modules/Lesons/container/LessonData'
import EditLesson from '../modules/Lesons/container/Editlesson'
import EditUser from '../modules/User/container/EditUser'

export default [
  {
    path: '/groupsList',
    MainContent: GroupsList,
    title: 'Список класів',
    id: '',
  },
  {
    path: '/createGroup',
    MainContent: CreateGroup,
    title: 'Створення класу',
    id: '',
  },
  {
    path: '/studentsList',
    MainContent: StudentsList,
    title: 'Список користувачів',
    id: '',
  },
  {
    path: '/createStudent',
    MainContent: CreateStudent,
    title: 'Створення користувача',
    id: '',
  },
  {
    path: '/createSubject',
    MainContent: CreateSubject,
    title: 'Створення предмета',
    id: '',
  },
  {
    path: '/subjectList',
    MainContent: SubjectsList,
    title: 'Список предметів',
    id: '',
  },
  {
    path: '/createtopic',
    MainContent: CreateTopics,
    title: 'Створення теми уроку',
    id: '',
  },
  {
    path: '/topicList',
    MainContent: TopicsList,
    title: 'Список тем',
    id: '',
  },
  {
    path: '/eventcalendar',
    MainContent: EventCalendar,
    title: 'Розклад уроків',
    id: '',
  },
  {
    path: '/createlesson',
    MainContent: CreateLesson,
    title: 'Створення уроку',
    id: '',
  },
  {
    path: '/updatematerials',
    MainContent: EditTrainingMaterials,
    title: 'Навчальні матеріали',
    id: '',
  },
  {
    path: '/material',
    MainContent: ShowTrainingMaterials,
    title: 'Навчальні матеріали',
    id: '',
  },
  {
    path: '/lessondata',
    MainContent: LessonData,
    title: 'Урок',
    id: '',
  },
  {
    path: '/updatehomework',
    MainContent: EditHomework,
    title: 'Домашня робота',
    id: '',
  },
  {
    path: '/homework',
    MainContent: ShowHomework,
    title: 'Домашня робота',
    id: '',
  },
  {
    path: '/editlesson',
    MainContent: EditLesson,
    title: 'Домашня робота',
    id: '',
  },
  {
    path: '/editUser',
    MainContent: EditUser,
    title: 'Змінити данні користувача',
    id: '',
  }
]            