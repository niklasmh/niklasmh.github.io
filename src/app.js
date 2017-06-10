import Component from 'inferno-component'
import Header from './components/template/Header'
import Footer from './components/template/Footer'
import Me from './components/sections/Me'
import Work from './components/sections/Work'
import Section from './components/template/Section'
import Wall from './components/template/Wall'
import Split from './components/template/Split'

class App extends Component {
  constructor () {
    super()

    this.updateScrollView = this.updateScrollView.bind(this)

    window.addEventListener('scroll', this.updateScrollView)
  }

  updateScrollView (evt) {
    let scrollTop = evt.target.body.scrollTop
    document.documentElement.style.setProperty('--perspective-focus', scrollTop + 'px')
  }

  render () {
    return (
      <div className="app">
        <Header path="Me" />
        <div className="sections content">
          <Wall />
          <Section><Me /></Section>
          <Split />
          <Wall />
          <Section><Work /></Section>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
