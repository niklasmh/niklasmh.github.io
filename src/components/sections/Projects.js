import Component from 'inferno-component'
import { Section } from '../layout'

class Projects extends Component {
  render () {
    return (
      <Section className="projects" title="Projects" {...this.props}>
        This is my projects.
      </Section>
    )
  }
}

export default Projects
