import Component from 'inferno-component'
import { Section } from '../layout/Section'

class Me extends Component {
  render () {
    return (
      <Section className="me" {...this.props}>
        Welcome to my private website.
      </Section>
    )
  }
}

export default Me
