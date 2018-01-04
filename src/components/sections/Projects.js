import Component from 'inferno-component'
import { Section, SubSection } from '../layout'
import { Icon } from '../common'

class Projects extends Component {
  constructor() {
    super()

    this.state = {
      projects: [
        {
          name: 'Mega Awesome',
          tags: ['react', 'redux'],
          image: 'template-nikkapp-small.png',
          description: 'Displaying apps and stuff. Awesome things about this project.',
          more: false,
        },
        {
          name: 'Docker cloud',
          tags: ['docker'],
          image: '',
          description: 'Displaying apps and stuff. Awesome things about this project. Awesome things about this project. Awesome things about this project. Awesome things about this project.',
          more: false,
        },
        {
          name: 'Mega Awesome',
          tags: ['react', 'redux'],
          image: 'template-kfk-small.png',
          description: 'Displaying apps and stuff. Awesome things about this project. Awesome things about this project.',
          more: false,
        },
        {
          name: 'Docker cloud',
          tags: ['docker'],
          image: 'template-niklasmh-small.png',
          description: 'Displaying apps and stuff. Awesome things about this project. Tessssst. Testtts.',
          more: false,
        },
        {
          name: 'Mega Awesome',
          tags: ['react', 'redux'],
          image: 'template-nikkapp-small.png',
          description: 'Displaying apps and stuff. Awesome things about this project.',
          more: false,
        },
        {
          name: 'Docker cloud',
          tags: ['docker'],
          image: 'template-niklasmh-small.png',
          description: 'Displaying apps and stuff. Awesome things about this project.',
          more: false,
        },
      ]
    }

    this.readMore = this.readMore.bind(this)

    this.timeout = null
    this.interval = null
    this.holdInterval = null
    this.leftDown = false
    this.leftDownTime = 0
    this.rightDown = false
    this.rightDownTime = 0
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
    this.leftDownHandler = this.leftDownHandler.bind(this)
    this.leftUpHandler = this.leftUpHandler.bind(this)
    this.rightDownHandler = this.rightDownHandler.bind(this)
    this.rightUpHandler = this.rightUpHandler.bind(this)
  }

  readMore(index) {
    let projects = this.state.projects.slice()
    projects[index].more = !projects[index].more
    this.setState(Object.assign({}, this.state, { projects }))
  }

  leftDownHandler() {
    this.leftDown = true
    this.leftDownTime = 0

    if (this.holdInterval) {
      clearInterval(this.holdInterval)
      this.holdInterval = null
    }

    this.holdInterval = setInterval(() => {
      this.scrollDistAnimated(-2, 0)
      this.leftDownTime += 5
    }, 5)
  }

  leftUpHandler() {
    if (this.leftDown && this.holdInterval) {
      clearInterval(this.holdInterval)
      this.holdInterval = null
      this.leftDown = false
    }
  }

  rightDownHandler() {
    this.rightDown = true
    this.rightDownTime = 0

    if (this.holdInterval) {
      clearInterval(this.holdInterval)
      this.holdInterval = null
    }

    this.holdInterval = setInterval(() => {
      this.scrollDistAnimated(2, 0)
      this.rightDownTime += 5
    }, 5)
  }

  rightUpHandler() {
    if (this.rightDown && this.holdInterval) {
      clearInterval(this.holdInterval)
      this.holdInterval = null
      this.rightDown = false
    }
  }

  scrollLeft() {
    if (!this.leftDown && this.leftDownTime < 300) {
      this.scrollDistAnimated(-20, 40)
    }
  }

  scrollRight() {
    if (!this.rightDown && this.rightDownTime < 300) {
      this.scrollDistAnimated(20, 40)
    }
  }

  scrollDistAnimated(dist, time, intervals = 5) {
    let scrollElement = document.querySelector('.project-list')

    if (this.interval) {
      clearInterval(this.interval)
      clearTimeout(this.timeout)
      this.interval = null
      this.timeout = null
    }

    if (time > 0) {
      this.interval = setInterval(() => {
        scrollElement.scrollLeft += dist * intervals / time
      }, intervals)

      this.timeout = setTimeout(() => {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      }, time)
    } else {
      scrollElement.scrollLeft += dist
    }
  }

  render() {
    this.props.className = "projects"
    this.props.title = "Projects"

    let projects = this.state.projects.map((e, i) => {
      let tags = e.tags.map((tag, j) => {
        return <div className="tag">{tag}</div>
      })

      let titleStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/${e.image})`
      }

      let sliceTo = e.more ? -1 : e.description.indexOf('.', 110)
      let description = ''
      let overflowStyle = { overflowY: 'auto' }

      if (e.more || sliceTo === -1) {
        description = e.description
      } else {
        overflowStyle = { overflowY: 'hidden' }
        description = e.description.slice(0, 75) + '...'
      }

      return (
        <SubSection className="project">
          <SubSection style={titleStyle}>{e.name}</SubSection>
          <SubSection>{tags}</SubSection>
          <SubSection className="project-description" style={overflowStyle}>
            {description}
            {
              (e.more || sliceTo !== -1) &&
              <div onClick={() => this.readMore(i)} className="load-more">
                {!e.more ? 'Read more' : 'Collapse'}
              </div>
            }
          </SubSection>
        </SubSection>
      )
    })

    return (
      <Section row subClassName="project-list" {...this.props}>
        <Icon className="scroll-left"
          onClick={this.scrollLeft}
          onMouseDown={this.leftDownHandler}
          onTouchStart={this.leftDownHandler}
          onMouseUp={this.leftUpHandler}
          onTouchEnd={this.leftUpHandler}
          onTouchCancel={this.leftUpHandler}>
          keyboard_arrow_left
        </Icon>
        {projects}
        <div className="spacing"></div>
        <Icon className="scroll-right"
          onClick={this.scrollRight}
          onMouseDown={this.rightDownHandler}
          onTouchStart={this.rightDownHandler}
          onMouseUp={this.rightUpHandler}
          onTouchEnd={this.rightUpHandler}
          onTouchCancel={this.rightUpHandler}>
          keyboard_arrow_right
        </Icon>
      </Section>
    )
  }
}

export default Projects
