import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Me extends Component {
  render () {
    return (
      <Section className="me" {...this.props}>
        <SubSection row flex="3">
          <SubSection flex="1 1 320px">About</SubSection>
          <SubSection flex="1 1 320px">Favorites</SubSection>
        </SubSection>
        <SubSection>Recent commitment</SubSection>
      </Section>
    )
  }
}

export default Me
