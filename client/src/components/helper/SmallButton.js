import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    button: {
        padding: '10px',
        margin: '10px 0px',
    },
    margin: {
        margin: theme.spacing.unit,
    },
})

const SmallButton = (props) => {
    const {
    classes,
        text,
        handleSubmit,
  } = props

    return (
        <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={handleSubmit}
        >
            {text}
        </Button>
    // <Button
    //   variant="contained"
    //   color="inherit"
    //   fullWidth={true}
    //   className={classes.button}
    //   onClick={handleSubmit}
    // >

    // </Button>
  )
}

SmallButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SmallButton)