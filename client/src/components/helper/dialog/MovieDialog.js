import React from 'react'
import PropTypes from 'prop-types'
import CustomTextField from '../TextField'
import CustomButtonIcon from '../ButtonIcon'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const styles = theme => ({
  dialogFrom: {
    width: '100%',
    padding: '10px',
  },
})

const MovieDialog = (props) => {
  const {
    classes,
    textTitle,
    textAction,
    values,
    handleSubmit,
    setValues,
    openDialog,
    handleOpenDialog,
    labels
  } = props

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
          if (label.display && label.type === 'textbox') {
            return (
              <CustomTextField
                key={label.id}
                label={label}
                values={values}
                setValues={setValues}
              />
            )
          }
          else {
            return false;
          }
        })}
        <Divider />
        <CustomButtonIcon
          text={textAction}
          handleSubmit={handleSubmit}
        />
      </div>
    </Dialog>
  );
}

MovieDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MovieDialog)