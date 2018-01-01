import Component from 'inferno-component'
import { Section } from '../layout/Section'

class Find extends Component {
  render() {
    return (
      <Section className="find" title="Find me" {...this.props}>
        <div className="content-section">GitHub</div>
        <div className="content-section">Hi</div>
      </Section>
    )
  }
}

export default Find
