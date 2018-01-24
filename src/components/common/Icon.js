import Component from 'inferno-component'

class Icon extends Component {
  render() {
    let className = this.props.className || ''
    className += ' icon material-icons'
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

    if (this.props.align) {
      this.props.style.verticalAlign = this.props.align
      delete this.props.align
    }

    return (
      <i {...this.props}>
        {this.props.children || this.props.name || ''}
      </i>
    )
  }
}

class FaIcon extends Component {
  render() {
    let className = this.props.className || ''
    className += ' icon fa fa-' + (this.props.children || this.props.name)
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

    if (this.props.align) {
      this.props.style.verticalAlign = this.props.align
      delete this.props.align
    }

    return (
      <i {...this.props}></i>
    )
  }
}

export { Icon, FaIcon }
