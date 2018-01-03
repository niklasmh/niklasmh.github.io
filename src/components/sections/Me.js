import Component from 'inferno-component'
import { Section, SubSection } from '../layout'

class Me extends Component {
  constructor() {
    super()

    this.state = {
      repos: [],
      repoData: {},
    }

    fetch('https://api.github.com/users/niklasmh/repos')
    .then(res => res.json())
    .then(repos => {
      console.log(repos)
      this.setState(Object.assign({}, this.state, { repos }))
      this.fetchRepos(repos)
    })

  }

  async fetchRepos(repos) {
    try {
      let repoData = {}
      await Promise.all(repos.map(repo => {
        return fetch(`https://api.github.com/repos/niklasmh/${repo.name}/stats/contributors`)
        .then(res => res.json())
        .then(stats => {
          repoData[repo.name] = stats
        })
      }))

      console.log(repoData)
      this.setState(Object.assign({}, this.state, { repoData }))

    } catch (err) {}
  }

  render() {
    this.props.className = "me"

    let repos = this.state.repos.map(repo => {
      let stats = this.state.repoData[repo.name]

      return <div>{repo.name} ({stats && stats[0].total})</div>
    })

    return (
      <Section {...this.props}>
        <SubSection row flex="3">
          <SubSection flex="1 1 320px">
            <h3>I am a front-end developer which have a passion for design in general.</h3>
            <p><b>Current favorites:</b> JavaScript, C++ and Docker.</p>
          </SubSection>
          <SubSection flex="1 1 320px"><b>Recent projects:</b>
            {repos}
          </SubSection>
        </SubSection>
        <SubSection>Recent commitment</SubSection>
      </Section>
    )
  }
}

export default Me
