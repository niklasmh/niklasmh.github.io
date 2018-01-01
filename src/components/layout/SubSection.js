import Component from 'inferno-component'

class SubSection extends Component {
  render() {
    if (this.props.className) {
      this.props.className += ' sub-section'
    } else {
      this.props.className = 'sub-section'
    }

    if (this.props.row) {
      this.props.className += ' row'
    }

    let style = {}
    if (this.props.basis) style.flexBasis = this.props.basis
    if (this.props.flex) style.flex = this.props.flex
    if (this.props.wrap) style.wrap = this.props.wrap
    if (this.props.nowrap) style.wrap = 'nowrap'
    if (this.props.justifyContent) style.justifyContent = this.props.justifyContent
    if (this.props.alignItems) style.alignItems = this.props.alignItems
    this.props.style = Object.assign({}, this.props.style || {}, style)

    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
}

export { SubSection }
