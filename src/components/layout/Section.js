import Component from 'inferno-component'
import { SubSection } from './'

class Section extends Component {
  render() {
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

    this.props.style = Object.assign({}, this.props.style, {
      minHeight: this.props.height + 'px'
    })

    let style = {}
    if (this.props.basis) style.flexBasis = this.props.basis
    if (this.props.flex) style.flex = this.props.flex
    if (this.props.wrap) style.flexWrap = this.props.wrap
    if (this.props.nowrap) style.flexWrap = 'nowrap'
    if (this.props.justifyContent) style.justifyContent = this.props.justifyContent
    if (this.props.alignItems) style.alignItems = this.props.alignItems

    let sectionStyle = {
      minHeight: this.props.height
    }

    let subClassName = this.props.subClassName
    delete this.props.subClassName

    return (
      <section {...this.props}>
        <section style={sectionStyle} className="section" name={name}>
          {title}
          <SubSection row={this.props.row} style={style} className={subClassName}>
            {this.props.children}
          </SubSection>
        </section>
      </section>
    )
  }
}

export { Section }
