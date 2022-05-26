import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import GroupIcon from '@material-ui/icons/Group';
import SubjectIcon from '@material-ui/icons/Subject';
import ViewModuleIcon from '@material-ui/icons/ViewModule';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import Table from "./DefaultTable"
import { Button } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const DRAWER_STUDENT = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem key="topicTypes1" button component={Link} to='/eventcalendar'>
          <ListItemIcon><ViewModuleIcon /></ListItemIcon>
          <ListItemText primary={'Розклад уроків'} />
        </ListItem>

        <ListItem key="topicTypes2" button component={Link} to='/topicList'>
          <ListItemIcon><SubjectIcon /></ListItemIcon>
          <ListItemText primary={'Список тем'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  const DRAWER_TEACHER = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem key="monitorList" button component={Link} to='/studentsList'>
          <ListItemIcon><FolderSharedIcon /></ListItemIcon>
          <ListItemText primary={'Список учнів'} />
        </ListItem>
        <Divider key="divider1" />
        <ListItem key="companyList" button component={Link} to='/groupsList'>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary={'Список Класів'} />
        </ListItem>
        <Divider key="divider4" />
        <ListItem key="topicTypes" button component={Link} to='/eventcalendar'>
          <ListItemIcon><ViewModuleIcon /></ListItemIcon>
          <ListItemText primary={'Розклад уроків'} />
        </ListItem>
        <Divider key="divider2" />
        <ListItem key="subjectTypes" button component={Link} to='/subjectList'>
          <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
          <ListItemText primary={'Список предметів'} />
        </ListItem>
        <Divider key="divider3" />
        <ListItem key="topicTypes" button component={Link} to='/topicList'>
          <ListItemIcon><SubjectIcon /></ListItemIcon>
          <ListItemText primary={'Список тем'} />
        </ListItem>
        <ListItem key="topicTypeCreate" button component={Link} to='/createtopic'>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary={'Додати тему'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  const DRAWER_ADMIN = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem key="monitorList" button component={Link} to='/studentsList'>
          <ListItemIcon><FolderSharedIcon /></ListItemIcon>
          <ListItemText primary={'Список учнів'} />
        </ListItem>
        <ListItem key="monitorCreate" button component={Link} to='/createStudent'>
          <ListItemIcon><AddCircleIcon /></ListItemIcon>
          <ListItemText primary={'Додати Учня'} />
        </ListItem>
        <Divider key="divider1" />
        <ListItem key="companyList" button component={Link} to='/groupsList'>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary={'Список Класів'} />
        </ListItem>
        <ListItem key="companyCreate" button component={Link} to='/createGroup'>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary={'Створити клас'} />
        </ListItem>
        <Divider key="divider4" />
        <ListItem key="topicTypes" button component={Link} to='/eventcalendar'>
          <ListItemIcon><ViewModuleIcon /></ListItemIcon>
          <ListItemText primary={'Розклад уроків'} />
        </ListItem>
        <ListItem key="topicTypeCreate" button component={Link} to='/createlesson'>
          <ListItemIcon><AddBoxIcon /></ListItemIcon>
          <ListItemText primary={'Додати урок'} />
        </ListItem>
        <Divider key="divider2" />
        <ListItem key="subjectTypes" button component={Link} to='/subjectList'>
          <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
          <ListItemText primary={'Список предметів'} />
        </ListItem>
        <ListItem key="subkectTypeCreate" button component={Link} to='/createSubject'>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary={'Додати предмет'} />
        </ListItem>
        <Divider key="divider3" />
        <ListItem key="topicTypes" button component={Link} to='/topicList'>
          <ListItemIcon><SubjectIcon /></ListItemIcon>
          <ListItemText primary={'Список тем'} />
        </ListItem>
        <ListItem key="topicTypeCreate" button component={Link} to='/createtopic'>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary={'Додати тему'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  //console.log(props)
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid sm={6} container>
            <Typography variant="h6" noWrap>
              {props.pageTitle ? props.pageTitle : "Помилка"}
            </Typography >
          </Grid>
          <Grid sm={6} container justify="flex-end">
            <Typography style={{
              lineHeight: "1.75",
              padding: "10px"
            }} noWrap>
              {props.userName ? props.userName : "Помилка"}
            </Typography>
            <Button
              onClick={() => {
                localStorage.clear()
                props.reload()
              }}
            >LogOut</Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {props.userRole == 10 ? DRAWER_ADMIN : props.userRole == 20 ? DRAWER_TEACHER : props.userRole == 30 ? DRAWER_STUDENT : ""}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {props.userRole == 10 ? DRAWER_ADMIN : props.userRole == 20 ? DRAWER_TEACHER : DRAWER_STUDENT}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.alert.show ? <Alert onClose={props.hideAlert} variant={props.alert.variant} severity={props.alert.severity}>
          <AlertTitle>{props.alert.alertTitle}</AlertTitle>
          {props.alert.alertText}
        </Alert> : ''}
        <br />
        {props.tableDescription ? <Table tableDescription={props.tableDescription} /> : ''}
        {props.MainContent ? <props.MainContent locationState={props.locationState} /> : ''}

      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;