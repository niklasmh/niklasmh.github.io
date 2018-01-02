import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Projects extends Component {
  constructor() {
    super()

    this.state = {
      projects: [
        {
          name: 'Mega Awesome',
          tags: ['react', 'redux'],
          image: '/template-nikkapp-small.jpg',
          description: 'Displaying apps and stuff. Awesome things about this project.'
        },
        {
          name: 'Docker cloud',
          tags: ['docker'],
          image: '/template-nikkapp-small.jpg',
          description: 'Displaying apps and stuff. Awesome things about this project.'
        },
        {
          name: 'Mega Awesome',
          tags: ['react', 'redux'],
          image: '/template-nikkapp-small.jpg',
          description: 'Displaying apps and stuff. Awesome things about this project.'
        },
        {
          name: 'Docker cloud',
          tags: ['docker'],
          image: '/template-nikkapp-small.jpg',
          description: 'Displaying apps and stuff. Awesome things about this project.'
        },
        {
          name: 'Mega Awesome',
          tags: ['react', 'redux'],
          image: '/template-nikkapp-small.jpg',
          description: 'Displaying apps and stuff. Awesome things about this project.'
        },
        {
          name: 'Docker cloud',
          tags: ['docker'],
          image: '/template-nikkapp-small.jpg',
          description: 'Displaying apps and stuff. Awesome things about this project.'
        },
      ]
    }
  }

  render() {
    this.props.className = "projects"
    this.props.title = "Projects"

    let projects = this.state.projects.map((e, i) => {
      let tags = e.tags.map((tag, j) => {
        return <div className="tag">{tag}</div>
      })

      return (
        <SubSection flex="0 0 200px" className="project">
          <SubSection>{e.name}</SubSection>
          <SubSection>{tags}</SubSection>
          <SubSection>{e.description}</SubSection>
        </SubSection>
      )
    })

    return (
      <Section row subClassName="project-list" {...this.props}>
        {projects}
      </Section>
    )
  }
}

export default Projects
