import { render } from 'inferno'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<App />, div)
})

it('should work', () => {
  let a = 1
  expect(a).toBeTruthy()
})
