import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import NearMe from '@material-ui/icons/NearMe'
import Button from "@material-ui/core/Button";
import Navbar from '../head/Navbar';
import Alert from '../helper/Alert'
import { 
  REQUIRE_EMAIL, 
  REQUIRE_TYPE_EMAIL,
  MESSAGE_SUCCESS
} from '../../constants/actionTypes'

const styles = theme => ({
  root: {
    backgroundColor: '#f5f6f7',
    paddingTop: 16
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "flex",
    margin: 16,
  },
  button: {
    margin: theme.spacing.unit,
  },
  signinButton: {
    padding: '10px 25px'
  },
  form: {
    margin: "0px 20%"
  }
})  



const ForgotPassword = (props) => {
  const { actions, classes } = props
  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({
    count: 0,
    open: false,
    message: "",
    variant: "success"
  })

  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem('localState'))

    // navigation
    if (localState) {
      if (localState.user_id) {
        actions.history.push('/')
      }
    }
  }, [])

  const handleChange = (e) => {
    const {value} = e.target

    setEmail(value)
  }

  const handleSubmit = () => {

    if (!email) {
      setAlert({
        count: alert.count + 1,
        open: true,
        message: REQUIRE_EMAIL,
        variant: "error"
      })
      return false;
    }

    // Email is incorrect format
    if (!/[a-z0-9._+-]+@[a-z0-9]{2,5}(\.[a-z0-9]{2,4}){1,2}/i.test(email)) {
      setEmail('')

      setAlert({
        count: alert.count + 1,
        open: true,
        message: REQUIRE_TYPE_EMAIL,
        variant: "error"
      })
      return false;
    }

    setAlert({
      count: alert.count + 1,
      open: true,
      message: MESSAGE_SUCCESS + ". Vui lòng kiểm tra địa chỉ email",
      variant: "success"
    })

    console.log(email)
  }

  const showComponent = () => {
    let code = actions.match.params.code;

    if (code) {
      return (
        <div>{code}</div>
      )
    } else {
      return (
        <section className={classes.form}>
          <form className={classes.container}>
            <TextField
              required
              id="outlined-email-input"
              label="Địa chỉ email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <Button 
              variant="contained" 
              color="inherit" 
              className={classNames(classes.button, classes.signinButton)}
              onClick={handleSubmit}
              >
              Nhận mật khẩu
              <NearMe className={classes.rightIcon} />
            </Button>
            </form>
        </section>
      )
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className={classes.root}>
        {showComponent()}
      </div>
      <Alert
        count={alert.count}
        open={alert.open}
        message={alert.message}
        variant={alert.variant}
      />
    </React.Fragment>
  )

}

ForgotPassword.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ForgotPassword)