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
    const {classes, info} = props

    return (
        <Card className={classes.card}>
           <CardHeader
                avatar={
                    <Avatar aria-label="Recipe">
                    A{info}
                    </Avatar>
                }
                title="Rạp: Lotte Q7"
                subheader="Cụm Sài Gòn"
                className={classes.cardHeaderLeft}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    Tên phim
                </Typography>
            </CardContent>
            <CardActions>
                <Typography>
                    1/1/2019 00:00
                </Typography>
            </CardActions>
        </Card>
    )
}

CardHistory.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardHistory)