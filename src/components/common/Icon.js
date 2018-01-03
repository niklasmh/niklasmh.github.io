import Component from 'inferno-component'

class Icon extends Component {
  render() {
    let className = this.props.className || ''
    className += ' material-icons'
    this.props.className = className

    this.props.style = this.props.style || {}

    if (this.props.size) {
      this.props.style.fontSize = this.props.size
      delete this.props.size
    }

    if (this.props.color) {
      this.props.style.color = this.props.color
      delete this.props.color
    }

    return (
      <i {...this.props}>
        {this.props.children || this.props.name || ''}
      </i>
    )
  }
}

export { Icon }
