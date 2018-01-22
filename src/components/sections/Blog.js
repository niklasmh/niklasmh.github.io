import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Blog extends Component {
  render() {
    this.props.title = "Blog"
    this.props.className = "blog"

    return (
      <Section row subClassName="blog" {...this.props}>
        <SubSection flex="0 0 100px">
          Blog!!
        </SubSection>
      </Section>
    )
  }
}

export default Blog
