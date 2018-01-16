import Component from 'inferno-component'
import { Header } from './components/template'
import { Me, Projects, Find } from './components/sections'

class App extends Component {
  constructor() {
    super()

    this.state = {
      selectedRoute: '',
      routes: [ '', 'Me', 'Projects', 'Find' ],
      scrollTop: true,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }

    this.body = document.getElementsByTagName('body')[0]
    this.html = document.getElementsByTagName('html')[0]
    this.updateScrollTop = this.updateScrollTop.bind(this)
    window.addEventListener('scroll', this.updateScrollTop)
    document.addEventListener('scroll', this.updateScrollTop)

    this.updateLayout = this.updateLayout.bind(this)
    window.addEventListener('resize', this.updateLayout)
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    })
  }

  updateScrollTop() {
    let scrollTop = this.body.scrollTop || this.html.scrollTop

    if (!scrollTop ^ this.state.scrollTop) {
      this.setState(Object.assign({}, this.state, {
        scrollTop: !scrollTop,
      }))
    }
  }

  updateLayout() {
    let changed = false
    let width = this.state.windowWidth
    let height = this.state.windowHeight
    let orientationChange = screen.orientation !== this.state.orientation

    if (window.innerWidth !== this.state.windowWidth || orientationChange) {
      changed = true
      width = window.innerWidth
    }

    if (window.innerHeight > this.state.windowHeight || changed) {
      changed = true
      height = window.innerHeight
    }

    if (changed) {
      this.setState(Object.assign({}, this.state, {
        windowHeight: height,
        windowWidth: width,
        orientation: screen.orientation,
      }))
    }
  }

  changeTo(route) {
    this.setState(Object.assign({}, this.state, {
      selectedRoute: route
    }))
  }

  render() {
    let className = 'app'

    if (this.state.scrollTop) {
      className += ' scroll-top'
    }

    return (
      <div className={className}>
        <Header path={this.state.selectedRoute} onClick={()=>this.changeTo('')}/>
        <div className={`sections content route-${this.state.selectedRoute.toLowerCase() || 'menu'}`}>
          <Me height={this.state.windowHeight} onClick={()=>this.changeTo('Me')}/>
          <Projects height={this.state.windowHeight} onClick={()=>this.changeTo('Projects')}/>
          <Find height={this.state.windowHeight} onClick={()=>this.changeTo('Find')}/>
        </div>
      </div>
    )
  }
}

export default App
