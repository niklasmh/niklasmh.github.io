import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Me extends Component {
  render() {
    this.props.className = "me"

    return (
      <Section {...this.props}>
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
