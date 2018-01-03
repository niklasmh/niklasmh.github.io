import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Me extends Component {
  render() {
    this.props.className = "me"

    return (
      <Section {...this.props}>
        <SubSection row flex="3">
          <SubSection flex="1 1 320px">
            <h3>I am a front-end developer which have a passion for design in general.</h3>
            <p><b>Current favorites:</b> JavaScript, C++ and Docker.</p>
          </SubSection>
          <SubSection flex="1 1 320px">Recent projects</SubSection>
        </SubSection>
        <SubSection>Recent commitment</SubSection>
      </Section>
    )
  }
}

export default Me
