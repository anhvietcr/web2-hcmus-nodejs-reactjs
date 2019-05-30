import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    minWidth: 120,
  },
})

const SimpleSelect = (props) => {
  const {
    classes,
    label,
    values,
    defaultValue,
    setValues,
    dataCombobox,
    handleChange
  } = props

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl} spacing={3}>
        <InputLabel htmlFor="select-simple">{label.label}</InputLabel>
        <Select
          value={defaultValue}
          onChange={handleChange}
          name={label.name_id}
          inputProps={{
            id: 'select-simple',
          }}
        >
        {dataCombobox.map((cbx) => {
          return (
            <MenuItem 
              value={cbx.id} 
              key={cbx.id}
              >{cbx.name}
            </MenuItem>
          )
        })}
        </Select>
      </FormControl>
    </form>
  )
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleSelect)