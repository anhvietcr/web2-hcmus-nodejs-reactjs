import React, { useState, useEffect } from 'react';

const Pending = (props) => {

  const { actions } = props
  
  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem('localState'))

    if (!localState) {
      actions.history.push('/')
    } else {
      if (localState.state === 'pending') {
        let user = {
          ...localState,
          state: 'verify'
        }

        localStorage.setItem('localState', JSON.stringify(user))

        //actions.history.push('/user');

        //action verify server



      } else if (localState.user_email) {
        actions.history.push('/user')
      } else {
        actions.history.push('/')
      }
    }
  }, [])

  return (
    <div>Please verify email</div>
  )
}

export default Pending