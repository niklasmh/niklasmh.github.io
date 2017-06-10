import Component from 'inferno-component'
import Header from './components/template/Header'
import Footer from './components/template/Footer'
import { Me, Projects, Find } from './components/sections'

class App extends Component {
  constructor () {
    super()

    this.state = {
      selectedRoute: 'Menu',
      routes: [ 'Menu', 'Me', 'Projects', 'Find' ],
    }
  }

  change (evt) {
    this.setState({
      selectedRoute: this.state.routes[(this.state.routes.indexOf(this.state.selectedRoute) + 1) % this.state.routes.length]
    })
  }

  render () {
    return (
      <div className="app" onClick={this.change.bind(this)}>
        <Header path="Me" />
        <div className={`sections content route-${this.state.selectedRoute.toLowerCase()}`}>
          <Me />
          <Projects />
          <Find />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
