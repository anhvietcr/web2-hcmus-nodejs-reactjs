import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  card: {
    position: "relative",
    height: '300px',
    maxHeight: '300px',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    overFlowY: 'scroll',
  },
  ahref: {
    textDecoration: 'none'
  }
});

const SimpleCard = (props) => {
  const { classes, label } = props

  return (
    <a href={`/movie/detail/${label.id}`} className={classes.ahref}>
      <Card className={classes.card} href={'/home'}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={label.images}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {label.name}
            </Typography>
            <Divider />
            <Typography variant="body2" color="textSecondary" component="p">
              {label.introduce}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleCard)