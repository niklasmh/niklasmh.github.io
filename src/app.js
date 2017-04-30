import Component from 'inferno-component'
import Header from './components/template/Header'
import Footer from './components/template/Footer'
import Me from './components/sections/Me'

class App extends Component {
  render () {
    return (
      <div className="app">
        <Header path="Me" />
        <div className="sections content">
          <Me />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
