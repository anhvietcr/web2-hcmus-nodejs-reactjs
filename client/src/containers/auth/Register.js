import React, {Component} from 'react'
import * as TYPE from '../../constants/actionTypes'
import { connect } from 'react-redux'
import Register from '../../components/auth/Register'

class RegisterContainer extends Component {
    render() {
        return (
            <Register actions={this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    SignUp: (payload) => {dispatch({type: TYPE.SIGN_UP, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)