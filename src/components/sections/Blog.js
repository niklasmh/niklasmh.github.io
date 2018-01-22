import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Blog extends Component {
  render() {
    this.props.title = "Latest articles"
    this.props.name = "Blog"
    this.props.className = "blog"

    return (
      <Section row subClassName="blog" {...this.props}>
        Blog!
      </Section>
    )
  }
}

export default Blog
