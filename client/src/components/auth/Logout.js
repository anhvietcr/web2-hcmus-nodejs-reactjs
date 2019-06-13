import React, { useEffect } from 'react';

const Logout = props => {
  
  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem('localState'))

    if (localState) {
      let info = {
        ...localState,
        user_email: null,
        user_fullname: null,
        user_id: null,
        user_phone: null,
        user_role: null
      }
      localStorage.setItem('localState', JSON.stringify(info))
      // localStorage.removeItem('localState')

      setTimeout(() => {
        props.history.push('/')
      }, 3000)
    } else {
      props.history.push('/')
    }
  }, [])

  return (
    <p>Đăng xuất thành công. Tự động chuyển hướng sau 3 giây !</p>
  )
}

export default Logout