import React, {Component} from 'react'
import * as TYPE from '../../constants/actionTypes'
import { connect } from 'react-redux'
import Login from '../../components/auth/Login'

class LoginContainer extends Component {
    render() {
        return (
            <Login actions={this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    SignIn: (payload) => {dispatch({type: TYPE.SIGN_IN, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)