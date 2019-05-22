import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    helper: {
        color: 'red',
        fontSize: '12px',
        margin: "15px",
        marginTop: "-10px"
    },
});

const Requirement = (props) => {
    const { classes, message } = props

    return (
        <Typography 
            variant="caption" 
            gutterBottom 
            align="left"
            className={classes.helper}>{message}
        </Typography>
    )
}

Requirement.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Requirement)