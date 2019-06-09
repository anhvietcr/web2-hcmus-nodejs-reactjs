import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SimpleSelect from '../helper/SimpleSelect'
import ButtonIcon from '../helper/ButtonIcon'
import Alert from '../helper/Alert'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Chart } from "react-charts"
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {
    STARTDATE_OVER_ENDDATE,
    REQUIRE_CINEMA,
    REQUIRE_MOVIE,
    REQUEST_SUCCESS_WAITING_DATA
} from '../../constants/actionTypes'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    datepicker: {
        margin: '10px',
        width: '100%',

        "& input": {
            minWidth: '120px',
            padding: 10,
            margin: '15px',
            borderRadius: '14px',
            border: "1px solid #000"
        },
        "& p": {
            display: 'inline-flex'
        },
        "& section": {
            display: 'block',
            position: 'relative',
        },
        "& section > *": {
            display: 'inline-flex'
        },
        "& form": {
            width: '100%',
            margin: 0,
        },
        "& form > div": {
            width: '100%'
        }
    }
})

// Set inTab selected
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

// Reformat date send server: dd/MM/YYY
function beautifyDate(date) {
    let newDate = new Date(date);
    return newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
}

// draw chart income by cinema, movie data
function drawChart(data) {
    if (!data.length) {
        return (
            <Typography>Không có dữ liệu</Typography>
        )
    } else {
        return (
            <React.Fragment>
                <Typography>Biểu đồ doanh thu</Typography>
                <span style={{
                    width: "100%",
                    height: "350px",
                    position: "absolute",
                    marginTop: '60px',
                    left: "-35px",
                    top: 0,
                    bottom: 0,
                    right: 0
                    }}>
                    <Chart
                        data={[{data}]}
                        axes={[
                            { primary: true, type: "ordinal", position: "bottom" },
                            { type: "linear", position: "left" }
                        ]}
                        />
                </span>
            </React.Fragment>
        )
    }
}


// Main Income container
const IncomeCpanel = (props) => {
    const { classes, actions } = props
    const { IncomeCpanel, CinemaCpanel, MovieCpanel } = actions;
    
    // UI control
    const [tabValue, setTabValue] = useState(0);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [dataChartCinema, setDataChartCinema] = useState([])
    const [dataChartMovie, setDataChartMovie] = useState([])

    // render values i/o server
    const [dataCinemas, setDataCinemas] = useState([])
    const [dataMovies, setDataMovies] = useState([])
    const [values, setValues] = useState({
        start_date: beautifyDate(new Date()),
        end_date: beautifyDate(new Date()),
        cinema_id: 0,
        movie_id: 0
    });
    const [alert, setAlert] = useState({
        count: 0,
        open: false,
        message: "",
        variant: "success"
    })

    // first load
    useEffect(() => {
        actions.ListCinemas();
        actions.ListMovies();
    }, [])

    // set data cinemas
    useEffect(() => {
        const { cinemas } = CinemaCpanel

        if (cinemas) {
            setDataCinemas(cinemas)
        }
    }, [CinemaCpanel.cinemas])

    // set data movies
    useEffect(() => {
        const { movies } = MovieCpanel

        if (movies) {
            setDataMovies(movies)
        }
    }, [MovieCpanel.movies])


    // get date Income by Cinema from server
    useEffect(() => {
        const { income_cinema } = IncomeCpanel

        if (income_cinema) {
            setDataChartCinema(income_cinema)
        }
    }, [IncomeCpanel.income_cinema])

    // get date Income by Movie from server
    useEffect(() => {
        const { income_movie } = IncomeCpanel

        if (income_movie) {
            setDataChartMovie(income_movie)
        }
    }, [IncomeCpanel.income_movie])


    // change end date
    const handleChangeEnd = (date) => {
        if (date < startDate) {
            setAlert({
                count: alert.count + 1,
                open: true,
                message: STARTDATE_OVER_ENDDATE,
                variant: "error"
            })
            return false
        }
        setEndDate(date);

        let beaDate = beautifyDate(date);
        setValues((values) => ({ ...values, end_date: beaDate }));
    }

    // change start date
    const handleChangeStart = (date) => {
        if (date > endDate) {
            setAlert({
                count: alert.count + 1,
                open: true,
                message: STARTDATE_OVER_ENDDATE,
                variant: "error"
            })
            return false
        }
        setStartDate(date)

        let beaDate = beautifyDate(date);
        setValues((values) => ({ ...values, start_date: beaDate }));
    }

    // change cinemas combobox
    const handleChangeCombobox = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }))
    }

    // request get income by cinema
    const handleRequestIncomCinema = (e) => {
        if (startDate > endDate) {
            return false;
        }

        if (!values.cinema_id) {
            setAlert({
                count: alert.count + 1,
                open: true,
                message: REQUIRE_CINEMA,
                variant: "error"
            })
            return false;
        }

        setAlert({
            count: alert.count + 1,
            open: true,
            message: REQUEST_SUCCESS_WAITING_DATA,
            variant: "success"
        })

        actions.GetIncomeByCinema(values)
    }

    // request get income by movie
    const handleRequestIncomMovie = (e) => {
        if (startDate > endDate) {
            return false;
        }

        if (!values.movie_id) {
            setAlert({
                count: alert.count + 1,
                open: true,
                message: REQUIRE_MOVIE,
                variant: "error"
            })
            return false;
        }

        setAlert({
            count: alert.count + 1,
            open: true,
            message: REQUEST_SUCCESS_WAITING_DATA,
            variant: "success"
        });

        actions.GetIncomeByMovie(values)
    }

    // Income by Cinema Component 
    const IncomeByCinemaContainer = () => {
        return (
            <React.Fragment>
                <div className={classes.datepicker}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                        <section>
                            <Typography>Ngày bắt đầu</Typography>
                            <DatePicker
                                selected={startDate}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleChangeStart}
                                dateFormat="dd / MM / YYY"
                            />
                        </section>
                        <section>
                            <Typography>Ngày kết thúc</Typography>
                            <DatePicker
                                selected={endDate}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleChangeEnd}
                                minDate={startDate}
                                dateFormat="dd / MM / YYY"
                            />
                        </section>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                        <section>
                            <SimpleSelect
                                label={{
                                    label: 'Cụp rạp',
                                    name_id: 'cinema_id'
                                }}
                                defaultValue={
                                    values.cinema_id
                                }
                                dataCombobox={dataCinemas}
                                handleChange={handleChangeCombobox}
                            />
                        </section>
                        <section>
                            <ButtonIcon 
                                text={"Thống kê"}
                                handleSubmit={handleRequestIncomCinema} 
                                />
                        </section>
                        </Grid>
                        <Grid item sm={12} xs={12} md={12} lg={12}>
                        <Divider />
                        <section>
                            {drawChart(dataChartCinema)}
                        </section>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }

    // Income by Movie Component 
    const IncomeByMovieContainer = () => {
        return (
            <React.Fragment>
                <div className={classes.datepicker}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                        <section>
                            <Typography>Ngày bắt đầu</Typography>
                            <DatePicker
                                selected={startDate}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleChangeStart}
                                dateFormat="dd / MM / YYY"
                            />
                        </section>
                        <section>
                            <Typography>Ngày kết thúc</Typography>
                            <DatePicker
                                selected={endDate}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleChangeEnd}
                                minDate={startDate}
                                dateFormat="dd / MM / YYY"
                            />
                        </section>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                        <section>
                            <SimpleSelect
                                label={{
                                    label: 'Tên phim',
                                    name_id: 'movie_id'
                                }}
                                defaultValue={
                                    values.movie_id
                                }
                                dataCombobox={dataMovies}
                                handleChange={handleChangeCombobox}
                            />
                        </section>
                        <section>
                            <ButtonIcon 
                                text={"Thống kê"}
                                handleSubmit={handleRequestIncomMovie} 
                                />
                        </section>
                        </Grid>
                        <Grid item sm={12} xs={12} md={12} lg={12}>
                        <Divider />
                        <section>
                            {drawChart(dataChartMovie)}
                        </section>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }

    // Navigation
    function handleChangeTabs(event, newValue) {
        setTabValue(newValue);
    }

    // Main Income component
    return (
        <div className={classes.root}>
            <Alert
                count={alert.count}
                open={alert.open}
                message={alert.message}
                variant={alert.variant}
            />
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChangeTabs}>
                    <Tab label="Cụm Rạp" />
                    <Tab label="Phim" />
                </Tabs>
            </AppBar>
            {tabValue === 0 && <TabContainer><IncomeByCinemaContainer /></TabContainer>}
            {tabValue === 1 && <TabContainer><IncomeByMovieContainer /></TabContainer>}
        </div>
    );
}

IncomeCpanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeCpanel);