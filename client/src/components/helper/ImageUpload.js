import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import storage from '../firebase'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  button: {
    border: '1px dotted #ccc',
    width: '120px',
    margin: '0 auto',
    marginTop: '5px',
    marginBottom: '5px',
  }
})

const ImageUpload = (props) => {
  const [image, setImage] = useState(null);
  const [completed, setCompleted] = useState(0);

  const {
    classes,
    values,
    setValues,
    label,
  } = props

  const handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image)
    }
  }

  const handleUpload = e => {
    if (!image) return false;

    const taskUpload = storage.storage.ref(`images/${image.name}`).put(image);

    taskUpload.on('state_changed', 
      (snapshot) => {
        // process uploading
        let perComplete = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setCompleted(perComplete)
      }, 
      (err) => {
        // error
        console.log("Error occur when upload image: ", err)
      }, 
      () => {
        //complete
        storage.storage.ref('images').child(image.name).getDownloadURL().then(url => {

          setValues((values) => ({...values, image: url}))

        })
      });
  }

  return (
    <FormControl variant="outlined" key={label.id} className={classes.formControl}>
      <input 
        onChange={handleChange}
        type="file" />
      <Button
        className={classes.button}
        size="small"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
      <LinearProgress variant="determinate" value={completed} />
    </FormControl>
  )
}

ImageUpload.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ImageUpload)