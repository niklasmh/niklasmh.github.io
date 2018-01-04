import Component from 'inferno-component'
import { Section, SubSection } from '../layout'
import { Icon } from '../common'

class Projects extends Component {
  constructor() {
    super()

    this.state = {
      projects: [
        {
          name: 'Ascend NTNU Website',
          tags: ['react', 'three', 'ts'],
          image: 'template-ascend-small.png',
          description: 'Website for representing team Ascend NTNU in the IARC competition.',
          more: false,
        },
        {
          name: 'Bot Project',
          tags: ['vue', 'mysql', 'css'],
          image: '',
          description: 'Teaching assistant bot for the program engineering course (TDT4140).',
          more: false,
        },
        {
          name: 'Training Diary Project',
          tags: ['mysql', 'java', 'cli'],
          image: '',
          description: 'A training diary using MySQL, Java and CLI. Made in TDT4145.',
          more: false,
        },
        {
          name: 'Web Dev Project',
          tags: ['react', 'mongodb', 'css'],
          image: '',
          description: 'Made in the second web course (IT2810) at NTNU.',
          more: false,
        },
        {
          name: 'Chat Project',
          tags: ['python', 'socket', 'cli'],
          image: '',
          description: 'Socket chat client-server made in TTM4100.',
          more: false,
        },
        {
          name: 'Web Project',
          tags: ['javascript', 'css', 'html'],
          image: '',
          description: 'Made in the first web course (IT2805) at NTNU.',
          more: false,
        },
        {
          name: 'Highschool Web Project',
          tags: ['php', 'css', 'html'],
          image: 'template-kfk-small.png',
          description: 'School project made in 2015 using PHP, CSS and HTML.',
          more: false,
        },
        {
          name: 'Lektordokka',
          tags: ['angular 1', 'yt', 'php'],
          image: 'template-lektordokka-small.png',
          description: 'Site using YT videoes to explain physics.',
          more: false,
        },
        {
          name: 'Physics Engine',
          tags: ['game maker', 'css'],
          image: 'template-physics-engine-small.jpg',
          description: 'Made a 2D physics engine from the bottom using math and physics from highschool.',
          more: false,
        },
        {
          name: 'Young Portfolio',
          tags: ['css', 'javascript', 'php'],
          image: 'template-old-niklasmh-small.png',
          description: 'This is the first version of this page.',
          more: false,
        },
        {
          name: 'NikkApp',
          tags: ['php', 'css', 'html'],
          image: 'template-nikkapp-small.png',
          description: 'Displaying apps and stuff. Learned a lot of CSS making it.',
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
