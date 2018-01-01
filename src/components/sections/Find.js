import Component from 'inferno-component'
import { Section } from '../layout/Section'

class Find extends Component {
  render() {
    return (
      <Section className="find" title="Find me" {...this.props}>
        <div className="sub-section">GitHub</div>
        <div className="sub-section">Hi</div>
      </Section>
    )
  }
}

export default Find
