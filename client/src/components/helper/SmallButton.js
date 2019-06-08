import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
})

const SmallButton = (props) => {
    const {
        classes,
        text,
        handleSubmit,
        id,
        price,
        number_row,
        number_column
  } = props

    return (
        <Button
            price={price || 0}
            number_column={number_column || 0}
            number_row={number_row || 0}
            id={id}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={handleSubmit}
            // href={'/ticket/'+id}
        >
            {text}
        </Button>
  )
}

SmallButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SmallButton)