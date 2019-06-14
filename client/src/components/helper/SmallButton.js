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
        number_column,
        theater_name,
        theater_id,
        movie_name,
        movie_opening_day
  } = props

    return (
        <Button
            movie_opening_day={movie_opening_day || ""}
            movie_name={movie_name || ""}
            theater_name={theater_name || ""}
            theater_id={theater_id || 0}
            price={price || 0}
            number_column={number_column || 0}
            number_row={number_row || 0}
            id={id}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={handleSubmit}
            href={'/ticket/'+id}
        >
            {text}
        </Button>
  )
}

SmallButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SmallButton)