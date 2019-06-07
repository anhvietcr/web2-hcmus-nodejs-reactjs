import React, { Component } from 'react';
import Pending from '../../components/auth/Pending';
import { connect } from 'react-redux'

class PendingContainer extends Component {

  render() {
    return (
      <Pending actions={this.props} />
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PendingContainer)