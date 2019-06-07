import React, { Component } from 'react';
import Ticket from '../components/Ticket'
import * as TYPE from '../constants/actionTypes'
import { connect } from 'react-redux'

class TicketContainer extends Component {

  render() {
    return (
      <Ticket actions={this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer)