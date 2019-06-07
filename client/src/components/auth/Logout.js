import React, { useEffect } from 'react';

const Logout = props => {
  
  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem('localState'))

    if (localState) {
      localStorage.removeItem('localState')

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