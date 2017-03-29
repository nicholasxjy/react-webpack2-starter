import React from 'react'
import { render } from 'react-dom'

import Hello from '~/components/Hello'
import 'sass/app.scss'

class App extends React.Component {
  render() {
    return (
      <Hello />
    )
  }
}

render(<App/>, document.getElementById('app'))
