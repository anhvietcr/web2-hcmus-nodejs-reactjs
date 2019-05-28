import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';

import CinemaCpanel from '../../containers/cpanel/Cinema';
import TheaterCpanel from '../../containers/cpanel/Theater';
import MovieCpanel from '../../containers/cpanel/Movie';
import ShowtimeCpanel from '../../containers/cpanel/Showtime';
import IncomeCpanel from './Income';

const drawerWidth = 240;
const styles = theme => ({ 
    root: {
      display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    link: {
        textDecoration: 'none'
    },
    active: {
        borderLeft: "4px solid #0767DB",
        borderRadius: "4px",
        backgroundColor: "#F6F9FD",
    }
});

const getComponentActiveByPath = (path) => {

    switch (path) {
        case '/cpanel/movies':
            return (<MovieCpanel />)
        case '/cpanel/cinemas':
            return (<CinemaCpanel />)
        case '/cpanel/theaters':
            return (<TheaterCpanel />)
        case '/cpanel/showtimes':
            return (<ShowtimeCpanel />)
        default:
            return (<IncomeCpanel />)
    }
}

const getActiveFlagByPath = (path) => {

    let active = {
        at: null,
        text: null
    }

    switch (path) {
        case '/cpanel/movies':
            active.at = [0, 1, 0, 0, 0];
            active.text = "Phim";
            break;
        case '/cpanel/theaters':
            active.at =  [0, 0, 1, 0, 0];
            active.text = "Rạp";
            break;
        case '/cpanel/cinemas':
            active.at = [0, 0, 0, 1, 0];
            active.text = "Cụm Rạp";
            break;
        case '/cpanel/showtimes':
            active.at = [0, 0, 0, 0, 1];
            active.text = "Suất Chiếu";
            break;
        default:
            active.at = [1, 0, 0, 0, 0];
            active.text = "Doanh Thu";
            break;
    }

    return active;
}

const HomeCpanel = (props) => {
    const pathname = props.location.pathname;
    const { classes, theme } = props;
    const [open, handleDrawer] = useState(true);
    const ComponentActive = getComponentActiveByPath(pathname);
    const activeFlag = getActiveFlagByPath(pathname);

    return (
        <React.Fragment>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
            <Toolbar disableGutters={!open}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={() => handleDrawer(true)}
                    className={classNames(classes.menuButton, open && classes.hide)}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                {activeFlag.text}
                </Typography>
            </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => handleDrawer(false)}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <Link to="/cpanel/incomes" className={classes.link}>
                    <ListItem 
                        button key="incomes" 
                        className={activeFlag.at[0] ? classes.active : ''}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Doanh Thu" />
                    </ListItem>
                </Link>
                <Link to="/cpanel/movies" className={classes.link}>
                    <ListItem 
                        button key="movies"
                        className={activeFlag.at[1] ? classes.active : ''}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Phim" />
                    </ListItem>
                </Link>
                <Link to="/cpanel/theaters" className={classes.link}>
                    <ListItem
                        button key="theaters"
                        className={activeFlag.at[2] ? classes.active : ''}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Rạp" />
                    </ListItem>
                </Link>
                <Link to="/cpanel/cinemas" className={classes.link}>
                    <ListItem 
                        button key="cinemas"
                        className={activeFlag.at[3] ? classes.active : ''}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Cụm Rạp" />
                    </ListItem>
                </Link>
                <Link to="/cpanel/showtimes" className={classes.link}>
                    <ListItem 
                        button key="showtimes"
                        className={activeFlag.at[4] ? classes.active : ''}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Suất Chiếu" />
                    </ListItem>
                </Link>
            </List>
            </Drawer>
            
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
            <div className={classes.drawerHeader} />
            
            {ComponentActive}
            
            </main>
        </div>
        </React.Fragment>
    );
}

HomeCpanel.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default withStyles(styles, { withTheme: true })(HomeCpanel);
  