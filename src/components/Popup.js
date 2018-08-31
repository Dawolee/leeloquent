import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  withMobileDialog
} from '@material-ui/core/'

class ResponsiveDialog extends React.Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSearch = () => {
    let { search, word } = this.props
    this.setState({ open: false })
    search(word)
  }

  handleRemove = () => {
    let { handleRemoveWord, index } = this.props
    this.setState({ open: false })
    handleRemoveWord(index)
  }

  handleReplace = () => {
    let { selectedWordChange, index } = this.props
    this.setState({ open: false })
    selectedWordChange(index)
  }

  render() {
    const { word, isSelected } = this.props
    return (
      <div>
        <Button
          style={{ color: isSelected && 'blue' }}
          onClick={this.handleClickOpen}
        >
          {word}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{word}</DialogTitle>

          <DialogActions>
            <Button onClick={this.handleSearch} color="primary">
              Find Synonyms
            </Button>
            <Button onClick={this.handleReplace} color="primary">
              Replace Word
            </Button>
            <Button onClick={this.handleRemove} color="primary" autoFocus>
              Remove Word
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
}

export default withMobileDialog()(ResponsiveDialog)
