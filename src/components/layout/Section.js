import Component from 'inferno-component'
import { SubSection } from './'

class Section extends Component {
  render () {
    if (this.props.className) {
      this.props.className += ' section-container'
    } else {
      this.props.className = 'section-container'
    }

    let title = null
    let name = null
    if (this.props.title) {
      title = <h1 className="title">{this.props.title}</h1>
      name = this.props.title.split(' ')[0]
      delete this.props.title
    }

    let style = {}
    if (this.props.basis) style.flexBasis = this.props.basis
    if (this.props.flex) style.flex = this.props.flex
    if (this.props.wrap) style.wrap = this.props.wrap
    if (this.props.nowrap) style.wrap = 'nowrap'
    if (this.props.justifyContent) style.justifyContent = this.props.justifyContent
    if (this.props.alignItems) style.alignItems = this.props.alignItems

    return (
      <section {...this.props}>
        <section className="section" name={name}>
          {title}
          <SubSection row={this.props.row} style={style}>
            {this.props.children}
          </SubSection>
        </section>
      </section>
    )
  }
}

export { Section }
