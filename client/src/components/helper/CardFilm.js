import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = (theme) => ({
  movieTitle: {
    fontSize: '20px'
  },
  movieCard: {
    position: "relative",
    height: '250px',
    maxHeight: '250px',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,

    "& > img": {
      width: '100%',
      height: '85%',
      transition: ".5s",
      paddingBottom: '5px',
    },
  },
  movieBook: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",

  },
  btnBook: {
    color: '#fff',
    border: "1px solid #fff",
    display: "inline-block",
    fontSize: "14px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#ffffff",
    fontWeight: "400",
    padding: "15px 30px",
    textDecoration: "none",
    lineHeight: 1,

    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0.7)",
    }
  },
  overlap: {
    zIndex: "99",
    width: "100%",
    height: "100%",
    transition: "all 300ms",
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  movieHover: {
    position: "absolute",
    top: 0,
    left: 0
  },
  override: {
    opacity: "1 !important"
  }
});

const CardFilm = (props) => {
  const { classes,
    image,
    mainText,
    id,
  } = props
  const [hover, setHover] = useState(false)

  return (
    <Paper className={classes.movieCard}>
      <img src={image} alt={"img"} />
      <a href={`/ticket/${id}`}>
        <div
          className={classNames(classes.overlap, classes.movieHover, hover ? classes.override : "")}
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseOut={() => {
            setHover(false)
          }}
        >
          <div className={classes.movieBook}>
            <Typography
              variant="h5"
              component="h3"
              className={classes.btnBook}
            > Đặt Vé
              </Typography>
          </div>
        </div>
      </a>
      <Divider />
      <Typography
        variant="h5"
        component="h3"
        className={classes.movieTitle}
      > {mainText}
        </Typography>
    </Paper>
  )
}

CardFilm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardFilm)