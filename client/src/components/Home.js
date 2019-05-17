import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Navbar from './head/Navbar';
  
const styles = (theme) => ({ 
    root: {
        backgroundColor: 'red'
    },
})

const Home = (props) => {
    const { actions, classes } = props;

    return (
        <React.Fragment>
            <Navbar />

            <div className={classes.root} onClick={() => {
                actions.Datve("data ve");
            }}>Connect API
            </div>
        </React.Fragment>
    ) 
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home)