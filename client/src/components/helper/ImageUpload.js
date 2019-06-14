import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { storage } from '../firebase'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

const CustomSelect = (props) => {
  const [image, setImage] = useState(null)
  const {
    classes,
    values,
    setValues,
    label,
  } = props

  const handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      console.log(image);

      setImage(image)
    }
  }

  const handleUpload = e => {
    console.log("image was selected: ", image);

    const taskUpload = storage.ref(`images/${image}`).put(image);
    taskUpload.on('state_changed', 
      (snapshot) => {
        // process uploading

      }, 
      (err) => {
        // error
        console.log("Error occur when upload image: ", err)
      }, 
      () => {
        //complete
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log("url image upload: ", url)

          setValues((values) => ({...values, url}))

        })
      });
  }

  return (
    <FormControl variant="outlined" key={label.id} className={classes.formControl}>
      <InputLabel htmlFor={`outlined-${label.name}-input`}>
        {label.label}
      </InputLabel>
      <input 
        onChange={handleChange}
        type="file" />
      <Button
        size="small"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </FormControl>
  )
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomSelect)