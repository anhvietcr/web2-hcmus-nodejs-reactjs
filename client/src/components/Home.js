import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Navbar from './head/Navbar';
import Grid from '@material-ui/core/Grid'
import CardFilm from './helper/CardFilm'

const styles = (theme) => ({
  root: {
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  homeTitle: {
    background: "url(../bg_h3_line.jpg) repeat-x scroll left center rgba(0, 0, 0, 0)",
    height: "60px",
    textAlign: "center",
    width: "100%",
    padding: '10px 0px',
    "& > *": {
      display: "inline-block",
      width: "230px",
      height: "40px",
      textIndent: "-99999px",
      margin: "10px",
      padding: 0
    },
    "& > h2": {
      background: "url(../h3_movie_new.gif) no-repeat scroll center center / 406px 41px #FDFCF0",
    },
    "& > h3": {
      background: "url(../h3_movie_view.gif) no-repeat scroll center center / 406px 41px #FDFCF0",
    }
  },
});


const Home = (props) => {
  const { actions, classes } = props;
  const { MovieCpanel } = actions
  const [hover, setHover] = useState(false)
  const [dataMoviesNew, setDataMoviesNew] = useState([])
  const [dataMoviesViewest, setDataMoviesViewest] = useState([])


  useEffect(() => {
    actions.ListNews();
    actions.ListViewest();
  }, []);

  useEffect(() => {
    if (MovieCpanel.news) {
      const { movies } = MovieCpanel.news.payload
      setDataMoviesNew(movies)
    }
  }, [MovieCpanel]);


  const handleClickBook = (e) => {
    e.preventDefault()
    console.log(e.target.id)
  }

  const showMovies = (data) => {

    return data.map((movie) => {
      return (
        <Grid item sm={6} xs={6} md={4} lg={3} key={movie.id}>
          <CardFilm
            id={movie.id}
            image="movie.jpg"
            mainText={movie.name}
            handleClick={handleClickBook}
          />
        </Grid>
      )
    });
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className={classes.root}>
        <div className={classes.homeTitle}>
          <h2>movie news</h2>
        </div>
        <section className={classes.movies}>
          <Grid container spacing={8}>
            {dataMoviesNew.length > 0 && showMovies(dataMoviesNew)}
          </Grid>
        </section>
        <div className={classes.homeTitle}>
          <h3>movie views</h3>
        </div>
        <section className={classes.movies}>
          <Grid container spacing={8}>
            <Grid item sm={6} xs={6} md={4} lg={3}>
              <CardFilm />
            </Grid>
            <Grid item sm={6} xs={6} md={4} lg={3}>
              <CardFilm />
            </Grid>
            <Grid item sm={6} xs={6} md={4} lg={3}>
              <CardFilm />
            </Grid>
            <Grid item sm={6} xs={6} md={4} lg={3}>
              <CardFilm />
            </Grid>
          </Grid>
        </section>
      </div>
    </React.Fragment>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home)