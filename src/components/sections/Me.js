import Component from 'inferno-component'

class Me extends Component {
  render () {
    return (
      <section className="section me" {...this.props}>
        Welcome to my private website.
      </section>
    )
  }
}

export default Me
