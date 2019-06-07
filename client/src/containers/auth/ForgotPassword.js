import React, {Component} from 'react'
import * as TYPE from '../../constants/actionTypes'
import { connect } from 'react-redux'
import ForgotPassword from '../../components/auth/ForgotPassword'

class ForgotPasswordContainer extends Component {
    render() {
        return (
            <ForgotPassword actions={this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    ForgotPassword: (payload) => {dispatch({type: TYPE.FORGOT_PASSWORD, payload})},
    ChangePassword: (payload) => {dispatch({type: TYPE.CHANGE_PASSWORD, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer)