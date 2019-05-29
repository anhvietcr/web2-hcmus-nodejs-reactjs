import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '5px 0px'
    },
    cardContent: {
        flexGrow: 1,
        padding: 0
    },
    cardHeaderLeft: {
        textAlign: 'left'
    },
})

const CardHistory = (props) => {
    const {classes, 
        avatarText,
        title,
        subheader,
        mainText,
        time
    } = props

    return (
        <Card className={classes.card}>
           <CardHeader
                avatar={
                    <Avatar aria-label="Recipe">
                    {avatarText}
                    </Avatar>
                }
                title={title}
                subheader={subheader}
                className={classes.cardHeaderLeft}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {mainText}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography>
                    {time}
                </Typography>
            </CardActions>
        </Card>
    )
}

CardHistory.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardHistory)