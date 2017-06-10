import Component from 'inferno-component'
import Header from './components/template/Header'
import Footer from './components/template/Footer'
import { Me, Projects, Find } from './components/sections'

class App extends Component {
  constructor () {
    super()

    this.state = {
      selectedRoute: 'Me'
    }
  }

  render () {
    return (
      <div className="app">
        <Header path="Me" />
        <div className="sections content">
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
