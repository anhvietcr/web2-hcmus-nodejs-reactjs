import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import NearMe from '@material-ui/icons/NearMe'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "flex",
    margin: 16
  },
  button: {
    padding: '10px',
    margin: '10px 0px',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  dialogFrom: {
    width: '100%',
    padding: '10px',
  }
})

const CustomDialog = (props) => {
  const { classes, textTitle, textAction, values, handleSubmit, setValues, openDialog, handleOpenDialog, labels } = props

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((values) => ({ ...values, [name]: value }))
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleOpenDialog}
      aria-labelledby="custom-dialog"
      maxWidth={'xs'}
      fullWidth={true}
    >
      <DialogTitle id="custom-dialog">{textTitle}</DialogTitle>
      <Divider />
      <div className={classes.dialogFrom}>
        {labels.map((label) => {
          if (label.name != 'actions') {
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
        })}
        <Divider />
        <Button
          variant="contained"
          color="inherit"
          fullWidth={true}
          className={classes.button}
          onClick={handleSubmit}
        >
          {textAction}
          <NearMe className={classes.rightIcon} />
        </Button>
      </div>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomDialog)