import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Find extends Component {
  render() {
    this.props.title = "Find me"
    this.props.className = "find"

    return (
      <Section row justifyContent="space-evenly" {...this.props}>
        <SubSection flex="0 0 0%">GitHub</SubSection>
        <SubSection flex="0 0 0%">Twitter</SubSection>
        <SubSection flex="0 0 0%">Facebook</SubSection>
      </Section>
    )
  }
}

export default Find
