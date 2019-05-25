import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import NearMe from '@material-ui/icons/NearMe'

const styles = theme => ({
  button: {
    padding: '10px',
    margin: '10px 0px',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

const CustomButtonIcon = (props) => {
  const {
    classes,
    text,
    handleSubmit,
  } = props

  return (
    <Button
      variant="contained"
      color="inherit"
      fullWidth={true}
      className={classes.button}
      onClick={handleSubmit}
    >
      {text}
      <NearMe className={classes.rightIcon} />
    </Button>
  )
}

CustomButtonIcon.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomButtonIcon)