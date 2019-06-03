import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Navbar from './head/Navbar';
import Grid from '@material-ui/core/Grid'
import CardFilm from './helper/CardFilm'
import SimpleTextField from './helper/SimpleTextField'

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
  const [dataMoviesTrend, setDataMoviesTrend] = useState([])


  useEffect(() => {
    actions.ListNews();
    actions.ListTrends();
  }, []);

  useEffect(() => {
    if (MovieCpanel.news) {
      const { movies } = MovieCpanel.news.payload
      setDataMoviesNew(movies)
    }

    if (MovieCpanel.trends) {
      const { movies } = MovieCpanel.trends.payload
      setDataMoviesTrend(movies)
    }
  }, [MovieCpanel]);

  // render movie cards
  const showMovies = (data) => {
    return data.slice(0, 11).map((movie) => {
      return (
        <Grid item sm={6} xs={6} md={4} lg={3} key={movie.id}>
          <CardFilm
            id={movie.id}
            image="movie.jpg"
            mainText={movie.name}
          />
        </Grid>
      )
    });
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value !== "") {
      actions.history.push("/movie/search?key="+e.target.value)
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <SimpleTextField
        label="Tìm suất chiếu của phim" 
        handleSearch={handleSearch}
        />
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
          <h3>movie trend</h3>
        </div>
        <section className={classes.movies}>
          <Grid container spacing={8}>
            {dataMoviesTrend.length > 0 && showMovies(dataMoviesTrend)}
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