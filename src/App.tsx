import './App.css'
import styled from 'styled-components'
import GlassBox from './GlassBox'
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
} from 'react'

type Options = {
  onCreate?: () => void
  props?: HTMLAttributes<HTMLDivElement>
  keyword?: 'keyword'
  link?: string
}
type TimelineElement = [duration: number, add: string, options?: Options]

const keyword = 'keyword'
const small = 'small'
const comment = 'comment'
const timePerLetter = 0.025

const timeline: TimelineElement[] = [
  [2, ''],
  [0, 'interests = { '],
  [0, 'web 🕸', { keyword }],
  [0, ', '],
  [0, 'graphics 👓', { keyword }],
  [0, ' and '],
  [0, 'physics 🔬', { keyword }],
  [1, ' }\n'],
  [0, '\n'],
  [0, 'links = {'],
  [0, '\n\t'],
  [0, 'GitHub ↗', { link: 'https://github.com/niklasmh' }],
  [0, ' // Most of my recent projects', { comment }],
  [0, '\n\t'],
  [0, 'LinkedIn ↗', { link: 'https://www.linkedin.com/in/niklasmh/' }],
  [0, ' // You can contact me here', { comment }],
  [0, '\n\t'],
  [0, 'Twitter ↗', { link: 'https://twitter.com/niklashole' }],
  [0, ' // Not using this much, but here it is', { comment }],
  [0, '\n'],
  [1, '}\n'],
  [0, '\n'],
  [0, 'skills = {'],
  [0, '\n\t'],
  [0, '   Frontend: ', { small }],
  [
    0,
    'JavaScript, CSS, HTML, React.js, Vue.js, Angular, TypeScript, WebGL, Three.js, jQuery',
    { keyword, small },
  ],
  [0, '\n\t'],
  [0, '    Backend: ', { small }],
  [
    0,
    '.NET, Node.js, Express.js, Java, Kotlin, PHP, Django',
    { keyword, small },
  ],
  [0, '\n\t'],
  [0, '           App: ', { small }],
  [0, 'React Native, Android Automotive', { keyword, small }],
  [0, '\n\t'],
  [0, 'Databases: ', { small }],
  [
    0,
    'MS SQL, MySQL, Firebase, PostgreSQL, Redis, MongoDB',
    { keyword, small },
  ],
  [0, '\n\t'],
  [0, '     DevOps: ', { small }],
  [0, 'Docker, GitHub Actions, Jenkins, Drone CI', { keyword, small }],
  [0, '\n\t'],
  [0, '          Misc: ', { small }],
  [
    0,
    'Bash, PowerShell, Git, SVN, TFS, 3D printing, 3D modelling, 3D graphics',
    { keyword, small },
  ],
  [0, '\n}'],
]

/**
 * Goal with website:
 *
 * - Show my interests
 * - Show my skills
 * - Display my blog with creative content
 * - Demo of a few projects (client-side python, physics, graphics)
 */

function App() {
  const [timelineElementIndex, setTimelineElementIndex] = useState<number>(0)
  const [wordLength, setWordLength] = useState<number>(0)
  const [isCursorVisible, showCursor] = useState<boolean>(true)
  const contentRef = useRef<HTMLDivElement>(null)

  const addCode = (code: string, options: Options = {}): void => {
    const intervalID = setInterval(() => {
      setWordLength((wordLength) => {
        if (wordLength >= code.length) {
          if (options?.onCreate) options.onCreate()

          clearInterval(intervalID)
        }

        return wordLength + 1
      })
    }, timePerLetter * 1000)
  }

  const prevIndex = useRef<number>(-1)
  useEffect(() => {
    if (prevIndex.current !== timelineElementIndex) {
      prevIndex.current = timelineElementIndex
      if (timelineElementIndex in timeline) {
        const [duration, add, options = {}] = timeline[timelineElementIndex]

        addCode(add, options)

        setTimeout(() => {
          setTimelineElementIndex((index) => index + 1)
          setWordLength(0)
        }, Math.max(duration, timePerLetter * add.length) * 1000)
      } else {
        showCursor(false)
      }
    }
  }, [timelineElementIndex])

  const [duration, word, options] = timeline[timelineElementIndex] || [
    0,
    '',
    {},
  ]

  return (
    <div
      className="App"
      onMouseMove={({ clientX, clientY }) => {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const x = clientX / windowWidth - 0.5
        const y = clientY / windowHeight - 0.5
        const direction = Math.atan2(y, x) + Math.PI / 2
        const distance = Math.min(1, Math.sqrt(x * x + y * y) / 0.4)
        document.documentElement.style.setProperty(
          '--glass-direction',
          direction + 'rad'
        )
        document.documentElement.style.setProperty(
          '--glass-distance',
          distance + ''
        )
      }}
    >
      <GlassBox>
        <h1>NIKLAS MOLNES HOLE</h1>
        <Content ref={contentRef}>
          <Code>
            {timeline
              .slice(0, timelineElementIndex)
              .concat([[duration, word.slice(0, wordLength), options]])
              .map(([_, add, options = {}], i) => {
                const { keyword, small, comment, link, props = {} } = options

                if (small) {
                  props.style = {
                    ...props.style,
                    fontSize: 10,
                    letterSpacing: 1,
                    verticalAlign: 'middle',
                  }
                }

                if (comment) {
                  return (
                    <Comment key={i} {...props}>
                      {add}
                    </Comment>
                  )
                }

                if (keyword) {
                  return (
                    <C key={i} {...props}>
                      {add}
                    </C>
                  )
                }

                if (link) {
                  return (
                    <a key={i} href={link} target={'_blank'}>
                      <C {...props}>{add}</C>
                    </a>
                  )
                }

                if (props) {
                  return (
                    <span key={i} {...props}>
                      {add}
                    </span>
                  )
                }

                return <React.Fragment key={i}>{add}</React.Fragment>
              })}
            {isCursorVisible && <Cursor />}
          </Code>
        </Content>
      </GlassBox>
    </div>
  )
}

export default App

const Content = styled.div`
  display: flow-root;
  background: #0004;
  padding: 24px 44px;
  --margin: -1px;
  margin: var(--margin);
  //border-radius: calc(var(--r) - var(--margin));
  //box-shadow: 0 0 var(--margin) #0008;
  backdrop-filter: grayscale(1);
`

const Code = styled.pre`
  font-family: var(--font-family-mono);
  white-space: pre-wrap;
  text-align: left;
  line-height: 1.8;
  color: #666;

  a {
    appearance: none;
    color: rgba(var(--glass-color), 0.4);
    text-decoration: none;
    display: inline-block;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    line-height: 1.2;

    :hover {
      border-bottom-color: rgba(var(--glass-color), 0.4);
    }
  }
`

const Cursor = styled.span`
  width: 4px;
  height: 22px;
  border-radius: 2px;
  display: inline-block;
  background: rgba(var(--glass-color), var(--glass-color-alpha));
  vertical-align: middle;
  vertical-align: text-bottom;
  //animation: pulse 0.5s infinite alternate;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`

interface ColorProps {
  c?: string | undefined
  b?: boolean
}

const C = styled.span<ColorProps>`
  color: ${(props) => props.c || '#aaa'};
`

const Comment = styled.span<ColorProps>`
  color: ${(props) => props.c || '#555'};
  font-size: 12px;
  letter-spacing: 0;
`
