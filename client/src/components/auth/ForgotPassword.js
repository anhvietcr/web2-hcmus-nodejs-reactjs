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
  MESSAGE_SUCCESS,
  REQUIRE_PASSW,
  REQUIRE_PASS_CONFIRM,
  REQUIRE_REPASSW,
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
  const [code, setCode] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: '',
    repassword: ''
  })
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

  useEffect(() => {
    console.log(actions.Auth)

    if (actions.Auth.password && code) {
      if (actions.Auth.password.status === 200) {
        console.log('thanh cong');
        setAlert({
          count: alert.count + 1,
          open: true,
          message: actions.Auth.password.message + '. Chuyển hướng sau 3s',
          variant: "success"
        })

        actions.history.push('/auth/login')
      } 

      if (actions.Auth.password.status) {
        setAlert({
          count: alert.count + 1,
          open: true,
          message: actions.Auth.password.message,
          variant: "error"
        })
      }

      if (actions.Auth.password.status === 408) {

      }
    }

  }, [actions.Auth])

  
  useEffect(() => {
    setCode(actions.match.params.code)
  }, [actions.match.params.code])

  const handleChange = (e) => {
    const {value, name} = e.target

    setValues((values) => ({...values, [name]: value}))
  }

  // Send request server and save email
  const handleSubmit = () => {

    if (!values.email) {
      setAlert({
        count: alert.count + 1,
        open: true,
        message: REQUIRE_EMAIL,
        variant: "error"
      })
      return false;
    }

    // Email is incorrect format
    if (!/[a-z0-9._+-]+@[a-z0-9]{2,5}(\.[a-z0-9]{2,4}){1,2}/i.test(values.email)) {

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

    actions.ForgotPassword({email: values.email});

    let localState = JSON.parse(localStorage.getItem('localState'))

    let info = {
      ...localState,
      pending_email: values.email
    }
    localStorage.setItem('localState', JSON.stringify(info))
  }

  // Renew pasword
  const handleChangePassword = () => {
    if (!values.password) {
      setAlert({
        count: alert.count + 1,
        open: true,
        message: REQUIRE_PASSW,
        variant: "error"
      })
      return false;
    }

    if (!values.repassword) {
      setAlert({
        count: alert.count + 1,
        open: true,
        message: REQUIRE_REPASSW,
        variant: "error"
      })
      return false;
    }

    if (values.password !== values.repassword) {
      setAlert({
        count: alert.count + 1,
        open: true,
        message: REQUIRE_PASS_CONFIRM,
        variant: "error"
      })
      return false;
    }

    let localState = JSON.parse(localStorage.getItem('localState'))
    if (localState) {
      let payload = {
        code,
        email: localState.pending_email,
        newpassword: values.password,
        renewpassword: values.repassword
      }

      actions.ChangePassword(payload);
    }
  }


  const showComponent = () => {
    if (code) {
      // obsolete code ?  

      return (
        <form className={classes.form}>
          <TextField
              required
              id="outlined-password-input"
              label="Mật khẩu"
              className={classes.textField}
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={values.password}                            
              onChange={handleChange}
              />
          <TextField
              required
              id="outlined-repassword-input"
              label="Mật khẩu *nhập lại"
              className={classes.textField}
              type="password"
              name="repassword"
              margin="normal"
              variant="outlined"
              value={values.repassword}
              onChange={handleChange}
              />
          <Button 
              variant="contained" 
              color="inherit" 
              className={classNames(classes.button, classes.signinButton)}
              onClick={handleChangePassword}
              >
              Thay đổi
              <NearMe className={classes.rightIcon} />
          </Button>
      </form>
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