import Component from 'inferno-component'
import { Section } from '../layout'

class Projects extends Component {
  render () {
    this.props.className = "projects"
    this.props.title = "Projects"

    return (
      <Section {...this.props}>
        This is my projects.
      </Section>
    )
  }
}

export default Projects
