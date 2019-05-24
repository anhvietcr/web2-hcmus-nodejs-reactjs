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
  const { classes, text, values, handleAdd, setAddValue, openDialog, handleOpenDialog} = props

  const handleChange = (e) => {
    const {name, value} = e.target
    setAddValue((values) => ({...values, [name]: value}))
  }

  return (
    <Dialog 
      open={openDialog} 
      onClose={handleOpenDialog} 
      aria-labelledby="custom-dialog"
      maxWidth={'xs'}
      fullWidth={true}
    >
      <DialogTitle id="custom-dialog">{text.ADD_CINEMA}</DialogTitle>
      <Divider />
      <div className={classes.dialogFrom}>
        <TextField
          required
          id="outlined-name-input"
          label="Tên"
          className={classes.textField}
          type="text"
          name="name"
          margin="normal"
          variant="outlined"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-address-input"
          label="Địa chỉ"
          className={classes.textField}
          type="text"
          name="address"
          margin="normal"
          variant="outlined"
          value={values.address}
          onChange={handleChange}
        />
        <Divider />
        <Button
          variant="contained"
          color="inherit"
          fullWidth={true}
          className={classes.button}
          onClick={handleAdd}
        >
          {text.BTN_ADD}
         <NearMe className={classes.rightIcon} />
        </Button>
      </div>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomDialog)