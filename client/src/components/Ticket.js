import React, {useState} from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
        backgroundColor: 'red'
    }
})

const Book = (props) => {
    const { classes , match } = props

    return (
        <p className={classes.root}>{match.params.id}</p>
    )
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Book)