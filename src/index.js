import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import NHeader from './components/NHeader'
import NFooter from './components/NFooter'
import Home from './pages/Home'
import Photo from './pages/Photo'
import Music from './pages/Music'
import Movie from './pages/Movie'
import 'normalize.css'
import 'sass/app.scss'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
          <NHeader />
          <Route exact path="/" component={Home} />
          <Route path="/photo" component={Photo} />
          <Route path="/music" component={Music} />
          <Route path="/video" component={Movie} />
          <NFooter />
        </div>
      </HashRouter>
    )
  }
}

render(<App/>, document.getElementById('app'))
