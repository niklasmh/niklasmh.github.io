import Component from 'inferno-component'

class Header extends Component {
  render () {
    return (
      <div className="head">
        <h2>
          <img src="/img/me.png" alt="Me" />
          <span className="page-title">Niklas M. Hole</span>
          <span className="path">{this.props.path}</span>
        </h2>
      </div>
    )
  }
}

export default Header
