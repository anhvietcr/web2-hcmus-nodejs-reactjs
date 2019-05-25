import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "flex",
    margin: 16
  },
})

const CustomTextField = (props) => {
  const {
    classes,
    values,
    setValues,
    label
  } = props

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((values) => ({ ...values, [name]: value }))
  }

  return (
    <TextField
      required
      key={label.id}
      id={`outlined-${label.name}-input`}
      label={label.label}
      className={classes.textField}
      type="text"
      name={label.name}
      margin="normal"
      variant="outlined"
      value={values[label.name]}
      onChange={handleChange}
    />
  )
}

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomTextField)