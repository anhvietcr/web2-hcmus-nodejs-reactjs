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

const ShowtimeDialog = (props) => {
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
    dataTheaters,
    dataMovies
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
              label: 'Phim',
              name: 'movie_name',
              name_id: 'movie_id'
            }
          }
          values={values}
          setValues={setValues}
          dataCombobox={dataMovies}
        />
        <CustomSelect
          label={
            {
              id: 1,
              label: 'Rạp',
              name: 'theater_name',
              name_id: 'theater_id'
            }
          }
          values={values}
          setValues={setValues}
          dataCombobox={dataTheaters}
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

ShowtimeDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ShowtimeDialog)