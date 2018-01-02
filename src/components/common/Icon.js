import Component from 'inferno-component'

class Icon extends Component {
  render() {
    let className = this.props.className || ''
    className += ' material-icons'

    let style = this.props.style || {}
    if (this.props.size) {
      style.fontSize = this.props.size
      delete this.props.size
    }

    return (
      <i className={className} style={style}>
        {this.props.children || this.props.name || ''}
      </i>
    )
  }
}

export { Icon }
