import React from 'react'
import { NavLink } from 'react-router-dom'
import './footer.scss'

export default class NFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="group">
          <div className="group-title">
            SOCIAL
          </div>
          <div className="group-link">
            <a href="https://twitter.com/Normal_Geek_Xue">Twitter</a>
            <a href="https://www.facebook.com/a.chef.salad">Facebook</a>
            <a href="https://www.instagram.com/nicholas_xue">Instagram</a>
          </div>
        </div>
        <div className="group">
          <div className="group-title">
            COOL
          </div>
          <div className="group-link">
            <NavLink to="/music" activeClassName="active">Music</NavLink>
            <NavLink to="/video" activeClassName="active">Video</NavLink>
          </div>
        </div>
        <div className="group">
          <div className="group-title">
            CONTCAT
          </div>
          <div className="group-link">
            <a href="https://github.com/nicholasxjy">Github</a>
          </div>
        </div>
      </footer>
    )
  }
}
