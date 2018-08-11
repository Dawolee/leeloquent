import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

class SynonymList extends Component {
  state = { open: false }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { classes, name, synonyms } = this.props
    let displayName = name[0].toUpperCase() + name.slice(1)
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={this.handleClick}>
            <ListItemText inset primary={displayName} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {synonyms[name] &&
            synonyms[name].synonyms.map(word => {
              return (
                <Collapse
                  key={word}
                  in={this.state.open}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    disablePadding
                    onClick={() => console.log(word)}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText inset primary={word} />
                    </ListItem>
                  </List>
                </Collapse>
              )
            })}
        </List>
      </div>
    )
  }
}

SynonymList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SynonymList)
