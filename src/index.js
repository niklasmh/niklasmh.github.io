import React from 'react'
import ReactDOM from 'react-dom'

import debug from 'debug'
const log = debug('app:log')

if (ENV === 'production') {
  debug.disable()
} else {
  debug.enable('*')
  log('Logging is enabled!')

  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
}

ReactDOM.render(
  <h1>Work!!!!</h1>,
  document.querySelector('#app')
)
