import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


const styles = theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
        boxSizing: "border-box",
        margin: "16px 0",
        width: '100%'
    },
    control: {
        padding: theme.spacing.unit * 3
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid #DFE3E8",
        borderRadius: 4,
        boxShadow: "none",
        color: "#12161B",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backgroundColor: "#FFFFFF"
    }
})

const User = (props) => {
    const {classes} = props

    return (
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper className={classes.paper}>
                    show
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={8} xl={8}>
                <Paper className={classes.paper}>
                    edit
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper className={classes.paper}>
                    booked histoty
                </Paper>
            </Grid>
        </Grid>        
    );
}

User.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(User)