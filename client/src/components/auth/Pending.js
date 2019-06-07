import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    backgroundColor: 'rgba(1, 155, 1, 0.2)',
    border: '2px dotted #fafafa',
    padding: '15px',
    fontWeight: 500,
    lineHeight: '20px',

    '& a': {
      marginTop: '20px'
    },
  }
})

const Pending = (props) => {
  const { actions, classes } = props
  const [message, setMessage] = useState("Vui lòng xác nhận email để hoàn thành quá trình đăng ký")
  
  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem('localState'))
    let code = actions.match.params.code;

      if (!localState) {
        actions.history.push('/')
      } else {
        if (code === undefined) {
          console.log(localState.state)
          // it's not verify
          if (localState.state === 'pending') {
          console.log("here")

            setMessage("Vui lòng xác nhận email để hoàn thành quá trình đăng ký")
    
          } else if (localState.user_email) {
            actions.history.push('/user')
          } else {
            actions.history.push('/')
          }
        }
        else {
          // it's not verify
          if (localState.state === 'pending') {

            // send code to server wish verify
            actions.VerifySignUpAsync(code)
    
          } else if (localState.user_email) {
            actions.history.push('/user')
          } else {
            actions.history.push('/')
          }
        }
      }
  }, []);


  useEffect(() => {
    if (actions.Auth.user) {
      if (actions.Auth.user.status === 200) {
        let localState = JSON.parse(localStorage.getItem('localState'))

        const { fullname, userId, email, role } = actions.Auth.user.payload

        let user = {
          ...localState,
          state: 'verify',
          user_id: userId,
          user_email: email,
          user_fullname: fullname,
          user_role: role
        }
        localStorage.setItem('localState', JSON.stringify(user))

        setMessage("Xác nhận thành công.")
      } 

      if (actions.Auth.user.status !== 200) {
        console.log("here 2")
        setMessage(actions.Auth.user.message)
        // actions.Auth.user = {}
      }

      if (actions.Auth.user.status === 408) {
        // code's obsolete, register new account
        localStorage.removeItem('localState')
      }
    }
  }, [actions.Auth.user])

  return (
    <div className={classes.root}>
      {message || "Vui lòng xác nhận email để hoàn thành quá trình đăng ký"}
      <Divider />
      <NavLink to="/">Trang chủ</NavLink>
    </div>
  )
}

export default withStyles(styles)(Pending)