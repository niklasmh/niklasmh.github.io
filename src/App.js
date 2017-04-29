import Component from 'inferno-component'
import Header from './components/template/Header'
import Footer from './components/template/Footer'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Header />
        <div className="sections">
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
