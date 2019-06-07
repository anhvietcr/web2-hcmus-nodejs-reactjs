import React, { Component } from 'react';
import Pending from '../../components/auth/Pending';
import { connect } from 'react-redux'
import * as TYPE from '../../constants/actionTypes'

class PendingContainer extends Component {

  render() {
    return (
      <Pending actions={this.props} />
    )
  }
}

const mapStateToProps = state => ({
  Auth: state.Auth
})

const mapDispatchToProps = dispatch => ({
  VerifySignUpAsync: (payload) => {dispatch({type: TYPE.VERIFY_SIGN_UP, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingContainer)