import * as TYPE from '../constants/actionTypes'

const DatveAsync = (data) => {
    return {
        type: TYPE.DAT_VE_ASYNC,
        data
    }
}

const SignInAsync = (payload) => {
    return {
        type: TYPE.SIGN_IN_ASYNC,
        payload
    }
} 

const SignUpAsync = (payload) => {
    return {
        type: TYPE.SIGN_UP_ASYNC,
        payload
    }
}

const UserUpdateInfoAsync = (payload) => {
    return {
        type: TYPE.USER_UPDATE_INFO_ASYNC,
        payload
    }
}

export default {
    DatveAsync,
    SignInAsync,
    SignUpAsync,
    UserUpdateInfoAsync,
}