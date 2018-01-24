import Component from 'inferno-component'
import { Section, SubSection } from '../layout'
import { Icon, FaIcon } from '../common'
import { API } from '../../api'

class Me extends Component {
  constructor() {
    super()

    let state = {
      repos: [],
      repoSet: {},
      repoData: {},
      repoTopics: {},
    }

    try {
      let localState = localStorage.getItem('state')

      if (localState) {
        state = JSON.parse(localState)
      }
    } catch (err) {
      state.repoData = {}
    }

    this.state = state

    if (!Object.keys(this.state.repoData).length) {
      API.getRequest('https://api.github.com/users/niklasmh/repos', repos => {
        let repoSet = this.state.repoSet

        if (this.state.repos.length) {
          repos = this.state.repos.slice(0, repos.length)
        }

        for (let repo of repos) {
          repo['last_contrib'] = new Date(repo.pushed_at)
          repoSet[repo.name] = repo
        }

        let newState = Object.assign({}, this.state, { repos, repoSet })

        try {
          localStorage.setItem('state', JSON.stringify(newState))
        } catch (err) {}

        this.setState(newState)
        this.fetchRepos(repos)
      }, err => {
        console.log('Failed to fetch. Do you have internet?')
      })
    }
  }

  async fetchRepos(repos, amount = 3) {
    let repoData = this.state.repoData
    let repoTopics = this.state.repoTopics

    try {
      if (amount > 0) {
        repos = repos
        .filter(repo => !(repo.name in repoData))
        .sort((a, b) => b.last_contrib - a.last_contrib)
        .slice(0, amount)
        .filter(repo => typeof repo.name !== 'undefined')
      }

      await Promise.all(
        [
          ...repos.map(repo => {
            return fetch(`https://api.github.com/repos/niklasmh/${repo.name}/stats/contributors`)
            .then(res => res.json())
            .then(stats => {
              repoData[repo.name] = stats.filter(stat => stat.author.login === 'niklasmh')[0]
            }).catch(err => {})
          }),
          ...repos.map(repo => {
            return fetch(`https://api.github.com/repos/niklasmh/${repo.name}/topics`, {
              headers: { 'Accept': 'application/vnd.github.mercy-preview+json' }
            })
            .then(res => res.json())
            .then(topics => {
              repoTopics[repo.name] = topics.names
            }).catch(err => {})
          })
        ]
      )
    } finally {
      let newState = Object.assign({}, this.state, { repoData, repoTopics })

      try {
        localStorage.setItem('state', JSON.stringify(newState))
      } catch (err) {}

      this.setState(newState)
    }
  }

  render() {
    this.props.className = "me"

    let repos = Object.keys(this.state.repoData)
    .sort((a, b) => this.state.repoSet[b].last_contrib - this.state.repoSet[a].last_contrib)
    .slice(0, 3)
    .map(repoName => {
      let url = 'https://github.com/niklasmh/' + repoName
      let description = this.state.repoSet[repoName].description

      let topics = null
      if (repoName in this.state.repoTopics) {
        topics = this.state.repoTopics[repoName].slice(0, 3).map(topic => {
          return <div className="tag">{topic}</div>
        })
      }

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
                    {/*Load more... ({reposLeft})*/}
                  </div>
                : (
                  <div className="load-more">
                    <FaIcon name="circle-o-notch" className="fa-spin fa-lg" />
                  </div>
                  )
                }
          </SubSection>
        </SubSection>
        {/*<SubSection><h4>Recent commitment</h4></SubSection>*/}
      </Section>
    )
  }
}

export default Me
