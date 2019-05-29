import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit * 2,
  },
})

const SimpleTextField = (props) => {
  const { classes,
    label
    } = props

  return (
    <div className={classes.container} spacing={3}>
      <Input
        placeholder={label}
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    </div>
  )
}

export default withStyles(styles)(SimpleTextField)