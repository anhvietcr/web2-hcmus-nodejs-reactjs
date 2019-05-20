import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles'
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
        marginTop: "5%",
        width: '100%',
        backgroundColor: "#fcfcfc"
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
        padding: "5px 10px"
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
    signinButton: {
        padding: '10px 25px'
    },
    helper: {
        color: 'red',
        fontSize: '12px',
        margin: "15px",
        marginTop: "-10px"
    },
    caption: {
        marginTop: '16px'
    }
})

const Login = (props) => {
    const {actions, classes} = props;
    const [submitted, setSubmit] = useState(false);
    const [values, setValues] = useState({
        email: '', 
        password: ''
    });
    const [onChangeValues, setOnChangeValues] = useState({
        email: false, 
        password: false
    });
    const [messageFrom, setMessageFrom] = useState({
        email: "Email không được để trống", 
        password: "Mật khẩu không được để trống"
    });
    
    useEffect(() => {
        if (submitted) {
            if (actions.Auth.payload.status === 200) {
                if (actions.Auth.payload.role === 'admin') {
                    actions.history.push('/cpanel')
                } else {
                    actions.history.push('/user')
                }
            }
        }
    })

    const handleChange = (e) => {
        const {value, name} = e.target;
        setValues((values) => ({...values, [name]: value}));
        setOnChangeValues((values) => ({...values, [name]: true}));
        setSubmit(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Need fill some input
        if (!values.email || !values.password) {
            setOnChangeValues({
                email: true, 
                password: true
            });
            setMessageFrom({
                email: "Email không được trống", 
                password: "Mật khẩu không được trống"
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
                email: "Email không đúng định dạng"
            });
            return false;
        }

        // Data is valid, dispatch to action
        setSubmit(true);
        actions.SignIn(values);
    }

    return (
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper className={classes.paper}>
                    <Typography component="h2" variant="headline" gutterBottom align="left" className={classes.social}>
                        Đăng nhập
                        <Typography variant="caption" align="left">
                            Đăng nhập với mạng xã hội
                        </Typography>
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classNames(classes.button, classes.social)}
                        onClick={handleSubmit}
                        >
                        <Filter1 className={classes.leftIcon} />
                        Đăng nhập với Facebook
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classNames(classes.button, classes.social)}
                        onClick={handleSubmit}
                        >
                        <Filter2 className={classes.leftIcon} />
                        Đăng nhập với Google
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
                            onChange={handleChange}
                            />
                            {onChangeValues.email && !values.email &&
                                <Typography 
                                    variant="caption" 
                                    gutterBottom 
                                    align="left"
                                    className={classes.helper}>{messageFrom.email}
                                </Typography>
                            }
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
                            onChange={handleChange}
                            />
                            {onChangeValues.password && !values.password &&
                                <Typography 
                                    variant="caption" 
                                    gutterBottom 
                                    align="left"
                                    className={classes.helper}>{messageFrom.password}
                                </Typography>
                            }
                        <Button 
                            variant="contained" 
                            color="inherit" 
                            className={classNames(classes.button, classes.signinButton)}
                            onClick={handleSubmit}
                            >
                            Đăng nhập
                            <NearMe className={classes.rightIcon} />
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>        
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)