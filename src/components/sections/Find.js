import Component from 'inferno-component'
import { Section, SubSection } from '../layout'
import { FaIcon } from '../common'

class Find extends Component {
  render() {
    this.props.title = 'Find me'
    this.props.className = 'find'

    return (
      <Section row subClassName="find-me" {...this.props}>
        <SubSection flex="0 0 100px">
          <a href="https://github.com/niklasmh" target="_blank">
            <FaIcon name="github" color="white" size="4em" />
          </a>
        </SubSection>
        <SubSection flex="0 0 100px">
          <a href="https://twitter.com/niklashole" target="_blank">
            <FaIcon name="twitter" color="#1da1f2" size="4em" />
          </a>
        </SubSection>
        <SubSection flex="0 0 100px">
          <a href="https://www.facebook.com/niklas.m.hole" target="_blank">
            <FaIcon name="facebook-official" color="#3b5998" size="4em" />
          </a>
        </SubSection>
      </Section>
    )
  }
}

export default Find
