import React, {Component} from 'react'
import * as TYPE from '../constants/actionTypes'
import { connect } from 'react-redux'
import User from '../components/User'

class UserContainer extends Component {
    render() {
        return (
            <User actions={this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        User: state.User
    }
}

const mapDispatchToProps = (dispatch) => ({
    UserUpdateInfo: (payload) => {dispatch({type: TYPE.USER_UPDATE_INFO, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)