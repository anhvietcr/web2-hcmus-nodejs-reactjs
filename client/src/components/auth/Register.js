import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Requirement from '../helper/Requirement'
import Alert from '../helper/Alert'
import * as TYPE from '../../constants/actionTypes'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import NearMe from '@material-ui/icons/NearMe'
import Filter1 from '@material-ui/icons/Filter1'
import Filter2 from '@material-ui/icons/Filter2'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
        boxSizing: "border-box",
        width: '100%',
        backgroundColor: "#fcfcfc",
    },
    control: {
        padding: theme.spacing.unit * 3
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid #DFE3E8",
        borderRadius: 4,
        boxShadow: "none",
        color: "#12161B",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backgroundColor: "#FFFFFF",
        width: '420px',
        margin: '0 auto',
        padding: "0px 10px"
    },
    container: {
        display: 'block',
        flexWrap: 'wrap',
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: "flex",
        margin: 16
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    social: {
        padding: '10px'
    },
    signupButton: {
        padding: '10px 25px'
    },
    helper: {
        color: 'red',
        fontSize: '12px',
        margin: "15px",
        marginTop: "-10px"
    },
    caption: {
        marginTop: '5px',
        padding: "0px 10px" 
    },
    link: {
        color: "#0767DB",
        fontWeight: "bold",
        "&:hover": {
            color: 'red',
            cursor: 'pointer'
        }
    }
})

const Register = (props) => {
    const {actions, classes} = props;
    const [submitted, setSubmit] = useState(false);
    const [values, setValues] = useState({
        email: '',
        fullname: '',
        password: '',
        repassword: '',
    });
    const [onChangeValues, setOnChangeValues] = useState({
        email: false, 
        fullname: false, 
        password: false,
        repassword: false,
    });
    const [messageFrom, setMessageFrom] = useState({
        email: TYPE.REQUIRE_EMAIL, 
        fullname: TYPE.REQUIRE_NAME, 
        password: TYPE.REQUIRE_PASSW, 
        repassword: TYPE.REQUIRE_REPASSW, 
    });
    const [alert, setAlert] = useState({
        count: 0,
        open: false,
        message: "",
        variant: "success"
    })
    
    useEffect(() => {
        // get localState
        let localState = localStorage.getItem('localState')

        if (localState) {
            localState = JSON.parse(localState);

            if (localState.user_id) {
                actions.history.push('/')
            }

            if (localState.state === 'pending') {
                actions.history.push('/auth/pending')
            }
        }

        // remove cached
        if (actions.Auth.user) {
            actions.Auth.user = {}
        }
    }, []);

    useEffect(() => {
        if (submitted && actions.Auth.user) {
            if (actions.Auth.user.status === 200) {

                setAlert({
                    count: alert.count + 1,
                    open: true,
                    message: TYPE.MESSAGE_SUCCESS,
                    variant: "success"
                });
                
                let localState = localStorage.getItem('localState');
                let user = {
                    ...localState,
                    state: "pending",
                    user_email: values.email,
                    user_fullname: values.fullname
                }
                localStorage.setItem('localState', JSON.stringify(user))

                // navigation
                actions.history.push('/auth/pending')
            } else {
                setAlert({
                    count: alert.count + 1,
                    open: true,
                    message: "Đăng ký thất bại",
                    variant: "error"
                })
            }
        }
    }, [submitted, actions.Auth.user])

    const handleChange = (e) => {
        const {value, name} = e.target;
        setValues((values) => ({...values, [name]: value}));
        setOnChangeValues((values) => ({...values, [name]: true}));
        setSubmit(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Need fill some input
        if (!values.email || !values.fullname || !values.password || !values.repassword) {
            setOnChangeValues({
                email: true, 
                fullname: true,
                password: true,
                repassword: true,
            });
            setMessageFrom({
                email: TYPE.REQUIRE_EMAIL, 
                fullname: TYPE.REQUIRE_NAME, 
                password: TYPE.REQUIRE_PASSW, 
                repassword: TYPE.REQUIRE_REPASSW, 
            });
            return false;
        }

        // Email is incorrect format
        if (!/[a-z0-9._+-]+@[a-z0-9]{2,5}(\.[a-z0-9]{2,4}){1,2}/i.test(values.email)) {
            setValues({
                ...values,
                email: ''
            })
            setMessageFrom({
                ...messageFrom,
                email: TYPE.REQUIRE_TYPE_EMAIL
            });
            return false;
        }

        // Valid password and repassword
        if (values.password !== values.repassword) {
            setValues({
                ...values,
                repassword: ''
            })
            setMessageFrom({
                ...messageFrom,
                repassword: TYPE.REQUIRE_PASS_CONFIRM
            });
            return false;
        }

        // Data is valid, dispatch to action
        setSubmit(true);
        actions.SignUp(values);
    }

    return (
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper className={classes.paper}>
                    <Typography component="h2" variant="headline" gutterBottom align="left" className={classes.social}>
                        Đăng ký
                        <Typography variant="caption" align="left">
                            Đăng ký với mạng xã hội
                        </Typography>
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classNames(classes.button, classes.social)}
                        onClick={handleSubmit}
                        >
                        <Filter1 className={classes.leftIcon} />
                        Đăng ký với Facebook
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classNames(classes.button, classes.social)}
                        onClick={handleSubmit}
                        >
                        <Filter2 className={classes.leftIcon} />
                        Đăng ký với Google
                    </Button>
                    <Divider />
                    <Typography 
                        variant="caption" 
                        gutterBottom 
                        align="center"
                        className={classes.caption}>
                        hoặc với địa chỉ email
                    </Typography>
                    <form className={classes.container}>
                        <TextField
                            required
                            id="outlined-email-input"
                            label="Email"
                            className={classNames(classes.textField)}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            />
                            {onChangeValues.email && !values.email &&
                                <Requirement message={messageFrom.email} />}
                        <TextField
                            required
                            id="outlined-input"
                            label="Họ tên"
                            className={classNames(classes.textField)}
                            type="text"
                            name="fullname"
                            margin="normal"
                            variant="outlined"
                            value={values.fullname}
                            onChange={handleChange}
                            />
                            {onChangeValues.fullname && !values.fullname &&
                                <Requirement message={messageFrom.fullname} />}
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Mật khẩu"
                            className={classNames(classes.textField)}
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={values.password}
                            onChange={handleChange}
                            />
                            {onChangeValues.password && !values.password &&
                                <Requirement message={messageFrom.password} />}
                        <TextField
                            required
                            id="outlined-repassword-input"
                            label="Nhập lại Mật khẩu"
                            className={classNames(classes.textField)}
                            type="password"
                            name="repassword"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={values.repassword}
                            onChange={handleChange}
                            />
                            {onChangeValues.repassword && !values.repassword &&
                                <Requirement message={messageFrom.repassword} />}
                        <Button 
                            variant="contained" 
                            color="inherit" 
                            className={classNames(classes.button, classes.signupButton)}
                            onClick={handleSubmit}
                            >
                            Đăng ký
                            <NearMe className={classes.rightIcon} />
                        </Button>
                        <Typography 
                        variant="caption" 
                        gutterBottom 
                        align="left"
                        className={classNames(classes.caption, classes.link)}
                        onClick={() => {
                            actions.history.push("/auth/login")
                        }}>
                        Đăng nhập
                    </Typography>
                    </form>

                </Paper>
            </Grid>
        </Grid>        
    );
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default withStyles(styles)(Register)