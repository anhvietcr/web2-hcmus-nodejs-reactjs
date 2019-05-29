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
    const { User } = state
    return {
        User
    }
}

const mapDispatchToProps = (dispatch) => ({
    UserUpdateInfo: (payload) => {dispatch({type: TYPE.USER_UPDATE_INFO, payload})},
    GetHistory: (payload) => {dispatch({type: TYPE.USER_HISTORY, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)