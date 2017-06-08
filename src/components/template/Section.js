import Component from 'inferno-component'

class Section extends Component {
  render () {
    return (
      <section className="section">
        {this.props.children}
      </section>
    )
  }
}

export default Section
