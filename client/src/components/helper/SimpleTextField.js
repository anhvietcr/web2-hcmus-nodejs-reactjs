import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: "center",
    margin: "15px 0px",
  },
  input: {
    padding: "10px 0px 5px",
    fontSize: 30,
    margin: "0 auto",
  },
  iconButton: {
    padding: 10,
  },
})

const SimpleTextField = (props) => {
  const { classes,
    label,
    handleSearch
    } = props

  return (
    <div className={classes.container} spacing={5}>
      <Input
        placeholder={label}
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
        onKeyPress={handleSearch}
        endAdornment={<InputAdornment position="end">
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
        </InputAdornment>}
      />
    </div>
  )
}

export default withStyles(styles)(SimpleTextField)