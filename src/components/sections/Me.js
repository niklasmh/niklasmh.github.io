import Component from 'inferno-component'
import { Section, SubSection } from '../layout'
import { Icon } from '../common'

class Me extends Component {
  constructor() {
    super()

    this.state = {
      repos: [],
      repoSet: {},
      repoData: {},
      repoTopics: {},
    }

    fetch('https://api.github.com/users/niklasmh/repos')
    .then(res => res.json())
    .then(repos => {
      let repoSet = this.state.repoSet

      if (this.state.repos.length) {
        repos = [...this.state.repos, repos]
      }

      for (let repo of repos) {
        repo['last_contrib'] = new Date(repo.pushed_at)
        repoSet[repo.name] = repo
      }
      this.setState(Object.assign({}, this.state, { repos, repoSet }))
      this.fetchRepos(repos)
    })
    .catch(err => {
      console.log('Failed to fetch. Do you have internet?')
    })
  }

  async fetchRepos(repos, amount = 3) {
    try {
      let repoData = this.state.repoData
      let repoTopics = this.state.repoTopics

      if (amount > 0) {
        repos = repos
        .filter(repo => {
          return !(repo.name in repoData && repo.name in repoTopics)
        })
        .sort((a, b) => b.last_contrib - a.last_contrib)
        .slice(0, amount)
      }

      await Promise.all(
        [
          ...repos.map(repo => {
            return fetch(`https://api.github.com/repos/niklasmh/${repo.name}/stats/contributors`)
            .then(res => res.json())
            .then(stats => {
              repoData[repo.name] = stats.filter(stat => stat.author.login === 'niklasmh')[0]
            })
          }),
          ...repos.map(repo => {
            return fetch(`https://api.github.com/repos/niklasmh/${repo.name}/topics`, {
              headers: { 'Accept': 'application/vnd.github.mercy-preview+json' }
            })
            .then(res => res.json())
            .then(topics => {
              repoTopics[repo.name] = topics.names
            })
          })
        ]
      )

      this.setState(Object.assign({}, this.state, { repoData, repoTopics }))

    } catch (err) {}
  }

  render() {
    this.props.className = "me"

    let repos = Object.keys(this.state.repoData)
    .sort((a, b) => this.state.repoSet[b].last_contrib - this.state.repoSet[a].last_contrib)
    .map(repoName => {
      let url = 'https://github.com/niklasmh/' + repoName
      let description = this.state.repoSet[repoName].description

      let topics = this.state.repoTopics[repoName].slice(0, 3).map(topic => {
        return <div className="tag">{topic}</div>
      })

      return (
        <div className="recent-project">
          <a href={url}>{repoName}</a>&nbsp;
          <div className="tags">{topics}</div>
          <div className="recent-project-description">{description}</div>
        </div>
      )
    })

    let reposLeft = this.state.repos.length - Object.keys(this.state.repoData).length

    return (
      <Section {...this.props}>
        <SubSection row flex="3">
          <SubSection flex="1 1 320px" className="about-me">
            <h3>Front-end developer. Passion for graphics and design.</h3>
            <p><b>Current favorites:</b> JavaScript, C++ and Docker <Icon name="favorite" color="red" size="1em" align="middle" /></p>
          </SubSection>
          <SubSection flex="1 1 320px" className="recent-project-container">
            <h4>Recent projects:</h4>
            <div className="recent-project-list">{repos}</div>
            {
              !!Object.keys(this.state.repoData).length
                ? !!reposLeft &&
                  <div className="load-more" onClick={() => this.fetchRepos(this.state.repos, reposLeft)}>
                    Load more... ({reposLeft})
                  </div>
                : <div className="load-more">Fetching data...</div>
            }
          </SubSection>
        </SubSection>
        <SubSection><h4>Recent commitment</h4></SubSection>
      </Section>
    )
  }
}

export default Me
