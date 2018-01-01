import Component from 'inferno-component'

class Section extends Component {
  render () {
    if (this.props.className) {
      this.props.className += ' section-container'
    } else {
      this.props.className = 'section-container'
    }

    let title = null
    if (this.props.title) {
      title = <h1 className="title">{this.props.title}</h1>
      delete this.props.title
    }

    return (
      <section {...this.props}>
        <section className="section">
          {title}
          <div className="sub-section">
            {this.props.children}
          </div>
        </section>
      </section>
    )
  }
}

export { Section }
