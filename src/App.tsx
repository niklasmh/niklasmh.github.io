import './App.css'
import styled from 'styled-components'
import GlassBox from './GlassBox'
import React, { useEffect, useRef, useState, HTMLAttributes } from 'react'

type Options = {
  onCreate?: () => void
  props?: HTMLAttributes<HTMLDivElement>
  comment?: 'comment'
  keyword?: 'keyword'
  small?: 'small'
  link?: string
}
type TimelineElement = [duration: number, add: string, options?: Options]

const comment = 'comment'
const keyword = 'keyword'
const small = 'small'
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

let windowWidth = 1000,
  windowHeight = 1000,
  cw = 100,
  ch = 100,
  x = -1,
  y = -1,
  isRunningAnimation = false

function App() {
  const [timelineElementIndex, setTimelineElementIndex] = useState<number>(0)
  const [wordLength, setWordLength] = useState<number>(0)
  const [isCursorVisible, showCursor] = useState<boolean>(true)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas !== null) {
      setCtx(canvas.getContext('2d'))
    }
    return () => setCtx(null)
  }, [])

  useEffect(() => {
    if (ctx && !isRunningAnimation) {
      isRunningAnimation = true
      let ax = 0,
        ay = 0,
        vx = 0,
        vy = 0,
        bx = x,
        by = y,
        first = true
      const animation = () => {
        if (x > -1 && y > -1) {
          if (first) {
            first = false
            bx = x
            by = y
          }

          const dx = x - bx
          const dy = y - by

          const a = Math.atan2(dy, dx)
          const d = Math.sqrt(dx * dx + dy * dy) * 0.1

          const friction = 0.1
          const damp = 0.05

          ax = Math.cos(a) * d - vx * Math.abs(vx) * friction - vx * damp
          ay = Math.sin(a) * d - vy * Math.abs(vy) * friction - vy * damp
          vx += ax
          vy += ay
          bx += vx * 0.1
          by += vy * 0.1

          ctx.fillStyle = '#00000016'
          ctx.fillRect(0, 0, cw, ch)
          ctx.fillStyle = '#ff00ff01'

          const ellipse = (r: number) => {
            ctx.beginPath()
            ctx.ellipse(
              (bx + 0.5) * cw,
              (by + 0.5) * ch,
              (cw / windowWidth) * r,
              (ch / windowHeight) * r,
              0,
              0,
              2 * Math.PI
            )
            ctx.fill()
          }

          ellipse(100)
          ellipse(200)
          ellipse(300)
          ellipse(400)
          ellipse(600)
          ellipse(800)

          const direction = Math.atan2(by, bx) + Math.PI / 2
          const distance = Math.min(1, Math.sqrt(bx * bx + by * by) / 0.4)
          document.documentElement.style.setProperty(
            '--glass-direction',
            direction + 'rad'
          )
          document.documentElement.style.setProperty(
            '--glass-distance',
            distance + ''
          )
        }

        requestAnimationFrame(animation)
      }
      animation()
    }
  }, [ctx])

  const [duration, word, options] = timeline[timelineElementIndex] || [
    0,
    '',
    {},
  ]

  return (
    <div
      className="App"
      onMouseMove={({ clientX, clientY }) => {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        x = clientX / windowWidth - 0.5
        y = clientY / windowHeight - 0.5
        cw = canvasRef.current?.width ?? 100
        ch = canvasRef.current?.height ?? 100
      }}
    >
      <Canvas ref={canvasRef}></Canvas>
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

const Canvas = styled.canvas`
  position: fixed;
  width: 100%;
  height: 100%;
  filter: blur(36px) brightness(0.5);
`

const Content = styled.div`
  display: flow-root;
  background: #0004;
  padding: 24px 44px;
  --margin: -1px;
  margin: var(--margin);
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
  display: inline-block;
`

const Comment = styled.span<ColorProps>`
  color: ${(props) => props.c || '#555'};
  font-size: 12px;
  letter-spacing: 0;
  display: inline-block;
`
