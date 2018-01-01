import Component from 'inferno-component'

class SubSection extends Component {
  render () {
    if (this.props.className) {
      this.props.className += ' sub-section'
    } else {
      this.props.className = 'sub-section'
    }

    if (this.props.row) {
      this.props.className += ' row'
    }

    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
}

export { SubSection }
