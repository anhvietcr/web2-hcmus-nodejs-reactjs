import React, { useEffect } from 'react';

const Logout = props => {
  
  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem('localState'))

    if (localState) {
      localStorage.setItem('localState', JSON.stringify({}))

      setTimeout(() => {
        props.history.push('/')
      }, 5000)
    } else {
      props.history.push('/')
    }
  }, [])

  return (
    <p>Đăng xuất thành công</p>
  )
}

export default Logout