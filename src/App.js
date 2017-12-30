import Component from 'inferno-component'
import Header from './components/template/Header'
import { Me, Projects, Find } from './components/sections'

class App extends Component {
  constructor () {
    super()

    this.state = {
      selectedRoute: '',
      routes: [ '', 'Me', 'Projects', 'Find' ],
      scrollTop: true,
    }

    let body = document.getElementsByTagName('body')[0]
    window.addEventListener('scroll', evt => {
      if (!body.scrollTop ^ this.state.scrollTop) {
        this.setState(Object.assign({}, this.state, {
          scrollTop: !body.scrollTop
        }))
      }
    })
  }

  changeTo (route) {
    this.setState(Object.assign({}, this.state, {
      selectedRoute: route
    }))
  }

  render () {
    let className = 'app'

    if (this.state.scrollTop) {
      className += ' scroll-top'
    }

    return (
      <div className={className}>
        <Header path={this.state.selectedRoute} onClick={()=>this.changeTo('')}/>
        <div className={`sections content route-${this.state.selectedRoute.toLowerCase() || 'menu'}`}>
          <Me onClick={()=>this.changeTo('Me')}/>
          <Projects onClick={()=>this.changeTo('Projects')}/>
          <Find onClick={()=>this.changeTo('Find')}/>
        </div>
      </div>
    )
  }
}

export default App
