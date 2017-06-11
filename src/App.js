import Component from 'inferno-component'
import Header from './components/template/Header'
import { Me, Projects, Find } from './components/sections'

class App extends Component {
  constructor () {
    super()

    this.state = {
      selectedRoute: '',
      routes: [ '', 'Me', 'Projects', 'Find' ],
    }
  }

  changeTo (route) {
    this.setState(Object.assign({}, this.state, {
      selectedRoute: route
    }))
  }

  render () {
    return (
      <div className="app">
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
