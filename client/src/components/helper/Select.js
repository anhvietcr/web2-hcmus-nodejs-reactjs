import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

const CustomSelect = (props) => {
  const {
    classes,
    values,
    setValues,
    label,
    dataCombobox
  } = props

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((values) => ({ ...values, [name]: value }));
  }

  return (
    <FormControl variant="outlined" key={label.id} className={classes.formControl}>
      <InputLabel htmlFor={`outlined-${label.name}-input`}>
        {label.label}
      </InputLabel>
      <Select
        autoWidth={true}
        value={values[label.name_id] || 0}
        onChange={handleChange}
        input={<OutlinedInput labelWidth={10} name={label.name_id} id={`outlined-${label.name}-input`} />}
      >
        {dataCombobox.map((cbx) => {
          return (
            <MenuItem value={cbx.id} key={cbx.id}>
              {cbx.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomSelect)