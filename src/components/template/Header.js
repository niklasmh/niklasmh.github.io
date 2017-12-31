import Component from 'inferno-component'

class Header extends Component {
  render () {
    return (
      <div className="head" {...this.props}>
        <img className="head-img" src={process.env.PUBLIC_URL + '/img/me.png'} alt="Me" />
        <div className="head-title">
          <span className="name">Niklas M. Hole </span>
        </div>
      </div>
    )
  }
}

export default Header
