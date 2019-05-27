import React from 'react'
import PropTypes from 'prop-types'
import CustomTextField from '../TextField'
import CustomButtonIcon from '../ButtonIcon'
import CustomSelect from '../Select'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  dialogFrom: {
    width: '100%',
    padding: '10px',
  },
})

const TheaterDialog = (props) => {
  const {
    classes,
    textTitle,
    textAction,
    values,
    handleSubmit,
    setValues,
    openDialog,
    handleOpenDialog,
    labels,
    dataCinemas,
    dataTheaterType
  } = props

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
          } else {
            return false;
          }
        })}
        <CustomSelect
          label={
            {
              id: 0,
              label: 'Cụm rạp',
              name: 'cinema_name',
              name_id: 'cinema_id'
            }
          }
          values={values}
          setValues={setValues}
          dataCombobox={dataCinemas}
        />
        <CustomSelect
          label={
            {
              id: 1,
              label: 'Loại rạp',
              name: 'type',
              name_id: 'type'
            }
          }
          values={values}
          setValues={setValues}
          dataCombobox={dataTheaterType}
        />
        <Divider />
        <CustomButtonIcon
          text={textAction}
          handleSubmit={handleSubmit}
        />
      </div>
    </Dialog>
  );
}

TheaterDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TheaterDialog)