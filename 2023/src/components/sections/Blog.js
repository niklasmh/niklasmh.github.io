import Component from 'inferno-component'
import { Section, SubSection } from '../layout'
import { API } from '../../api'
import { formatDateFromISO } from '../../common'

class Blog extends Component {
  constructor() {
    super()

    this.state = {
      articles: [],
    }
  }

  componentDidMount() {
    API.getRequest('blog.json', articles => {
      articles = articles.map(article => {
        article['dateFormatted'] = formatDateFromISO(article.date)
        return article
      })

      this.setState(Object.assign({}, this.state, { articles }))
    })
  }

  render() {
    this.props.title = 'Latest articles'
    this.props.name = 'Blog'
    this.props.className = 'blog'

    let articles = this.state.articles.map(article => {
      let tags = article.tags
        .split(' ')
        .map(tag => <div className="tag">{tag}</div>)

      return (
        <SubSection className="blog-article">
          <h3>
            <a href={'blog/' + article.link}>{article.title}</a>
          </h3>
          <div className="date">{article.dateFormatted}</div>
          <div>{article.description}</div>
          <div className="tags">{tags}</div>
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
