import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

const styles = {
  card: {
    maxWidth: 345,
    marginTop: 10,
    marginBottom: 10
  },
  media: {
    height: 200
  }
}

function MediaCard(props) {
  const { classes, image, title, desc } = props
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={image} />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {title}
        </Typography>
        <Typography component="p">{desc}</Typography>
      </CardContent>
    </Card>
  )
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MediaCard)
