import Component from 'inferno-component'
import { Section, SubSection } from '../layout'
import { API } from '../../api'

class Blog extends Component {
  constructor() {
    super()

    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    API.getRequest('blog.json', articles => {
      this.setState(Object.assign({}, this.state, { articles }))
    })
  }

  render() {
    this.props.title = "Latest articles"
    this.props.name = "Blog"
    this.props.className = "blog"

    let articles = this.state.articles.map(article => {
      return (
        <SubSection className="blog-article">
          <h3>{article.title}</h3>
        </SubSection>
      )
    })

    return (
      <Section nowrap subClassName="blog blog-article-list" {...this.props}>
        {articles}
      </Section>
    )
  }
}

export default Blog
