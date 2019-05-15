import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({ 
    root: {
        backgroundColor: 'red'
    }
})

const Home = (props) => {
    const { actions, classes } = props;

    return (
        <div className={classes.root} onClick={() => {
            actions.Datve("data ve");
        }}>Connect API
        </div>
    ) 
 }

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)