import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Find extends Component {
  render() {
    return (
      <Section row className="find" title="Find me" {...this.props}>
        <SubSection>GitHub</SubSection>
        <SubSection>Twitter</SubSection>
        <SubSection>Facebook</SubSection>
      </Section>
    )
  }
}

export default Find
