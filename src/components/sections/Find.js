import Component from 'inferno-component'
import { Section } from '../layout/Section'

class Find extends Component {
  render () {
    return (
      <Section className="find" title="Find me" {...this.props}>
        Find me!
      </Section>
    )
  }
}

export default Find
