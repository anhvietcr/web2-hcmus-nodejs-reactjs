import React, {useState, useEffect} from 'react'
import Alert from './helper/Alert'
import CardHistory from './helper/CardHistory'
import ButtonIcon from './helper/ButtonIcon'
import * as TYPE from '../constants/actionTypes'
import Requirement from './helper/Requirement'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import NearMe from '@material-ui/icons/NearMe'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
        boxSizing: "border-box",
        margin: "16px 0",
        width: '100%',
        backgroundColor: '#f8fafc'
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
        margin: '5px 0px',
        padding: "10px 15px"
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
    bigAvatar: {
        width: 128,
        height: 128,
        backgroundColor: "#9c9c9c"
    },
    rightInformation: {
        flexGrow: 0,
        flexShrink: 0,
        marginLeft: 'auto'
    },
    leftInformation: {
        lineHeight: "7vh"
    },
    information: {
        listStyleType: 'none',
        display: 'flex',
        margin: "5px 0px",
        padding: 0
    },
    infoHead: {
        display: 'flex',

        "& > *": {
            paddingRight: '10px'
        },
        "&:nth-child(1)": {
            marginTop: "5px"
        }
    },
})

const User = (props) => {
    const {actions, classes} = props;
    const [alert, setAlert] = useState({
        count: 0,
        open: false,
        message: "",
        variant: "success"
    });
    const [submitted, setSubmit] = useState(false);
    const [values, setValues] = useState({
        email: '', 
        fullname: '',
        phone: '',
        password: '',
        repassword: ''
    });
    const [onChangeValues, setOnChangeValues] = useState({
        email: false, 
        fullname: false, 
        phone: false, 
        password: false, 
        repassword: false, 
    });
    const [messageFrom, setMessageFrom] = useState({
        email: TYPE.REQUIRE_EMAIL,
        fullname: TYPE.REQUIRE_NAME,
        phone: TYPE.REQUIRE_PHONE,
        password: TYPE.REQUIRE_PASSW,
        repassword: TYPE.REQUIRE_REPASSW, 
    });
    const [dataHistory, setDataHistory] = useState([])

    useEffect(() => {
        if (submitted && actions.User.status) {
            if (actions.User.status === 200) {
                setAlert({
                    open: true,
                    message: TYPE.MESSAGE_SUCCESS,
                    variant: 'success'
                });
            } else {
                setAlert({
                    open: true,
                    message: TYPE.MESSAGE_ERROR,
                    variant: 'error'
                });
            }
        }

        // Get data history
        if (actions.User.history) {
            const { history } = actions.User.history.payload
            setDataHistory(history)
        }
        

    }, [submitted, actions])


    const handleChange = (e) => {
        const {value, name} = e.target;
        setSubmit(false)
        setValues((values) => ({...values, [name]: value}));
        setOnChangeValues((values) => ({...values, [name]: true}));
        setAlert((values) => ({...values, open: false}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Need fill some input
        if (!values.email || !values.fullname || !values.phone || !values.password || !values.repassword) {
            setOnChangeValues({
                email: true, 
                fullname: true, 
                phone: true, 
                password: true, 
                repassword: true
            });
            setMessageFrom({
                email: TYPE.REQUIRE_EMAIL, 
                fullname: TYPE.REQUIRE_NAME, 
                phone: TYPE.REQUIRE_PHONE, 
                password: TYPE.REQUIRE_PASSW, 
                repassword: TYPE.REQUIRE_REPASSW, 
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

        // Data is valid, dispatch to action
        setSubmit(true);
        actions.UserUpdateInfo(values)
    }

    const loadHistory = () => {
        actions.GetHistory({userId: 1});
    }

    const showHistory = () => {
        return dataHistory.map((data) => {
            return (
                <CardHistory 
                    key={data.id}
                    avatarText={`A${data.id}`}
                    title={data.showtime.theater.name}
                    subheader={data.showtime.theater.cinema.name}
                    mainText={data.showtime.movie.name}
                    time={data.showtime.start_time}    
                />
            )
        })
    }

    return (
        <Grid container className={classes.root} spacing={16}>
            <Alert 
                count={alert.count}
                open={alert.open}
                message={alert.message}
                variant={alert.variant}
            />
            <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper className={classes.paper}>
                    <ul className={classes.information}>
                        <li className={classes.leftInformation}>
                            <Typography component="h3" variant="headline" align="left">
                                Phan Anh Viet
                            </Typography>
                            <Divider/>
                            <Typography component="h6" variant="subtitle1" gutterBottom align="left">
                                + admin@example.com
                            </Typography>
                            <Typography component="h6" variant="subtitle1" gutterBottom align="left">
                                + 84 333 666 999
                            </Typography>
                        </li>
                        <li className={classes.rightInformation}>        
                            <Avatar alt="Icon" src="/avatar.jpg" className={classes.bigAvatar} />
                        </li>
                    </ul>
                </Paper>
                <Paper className={classes.paper}>
                    <div className={classes.infoHead}>
                        <Typography component="h4" variant="headline" gutterBottom align="left" className={classes.social}>
                            Hồ sơ
                        </Typography>
                        <Typography  variant="subtitle2" align="right">
                            Chỉnh sửa thông tin cá nhân
                        </Typography>
                    </div>
                    <Divider />
                    <form className={classes.container}>
                        <TextField
                            required
                            id="outlined-email-input"
                            label="Email"
                            className={classes.textField}
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
                            id="outlined-fullname-input"
                            label="Họ tên"
                            className={classes.textField}
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
                            id="outlined-phone-input"
                            label="Số điện thoại"
                            className={classes.textField}
                            type="text"
                            name="phone"
                            margin="normal"
                            variant="outlined"
                            value={values.phone}                            
                            onChange={handleChange}
                            />
                            {onChangeValues.phone && !values.phone &&
                                <Requirement message={messageFrom.phone} />}
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Mật khẩu"
                            className={classes.textField}
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
                            label="Mật khẩu *nhập lại"
                            className={classes.textField}
                            type="password"
                            name="repassword"
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
                            className={classNames(classes.button, classes.signinButton)}
                            onClick={handleSubmit}
                            >
                            Thay đổi
                            <NearMe className={classes.rightIcon} />
                        </Button>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={8} xl={8}>
                <Paper className={classes.paper}>
                    <div className={classes.infoHead}>
                        <Typography component="h4" variant="headline" gutterBottom align="left" className={classes.social}>
                            Lịch sử
                        </Typography>
                        <Typography  variant="subtitle2" align="right">
                            Xem danh sách vé đã đặt
                        </Typography>
                    </div>
                    <Divider />
                    <ButtonIcon 
                        text="Hiển thị"
                        handleSubmit={loadHistory} 
                    />{dataHistory && showHistory()}
                </Paper>
            </Grid>
        </Grid>        
    );
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

export default withStyles(styles)(User)