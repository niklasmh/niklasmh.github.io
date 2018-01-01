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

    return (
      <section {...this.props}>
        <section className="section" name={name}>
          {title}
          <SubSection row={this.props.row}>
            {this.props.children}
          </SubSection>
        </section>
      </section>
    )
  }
}

export { Section }
