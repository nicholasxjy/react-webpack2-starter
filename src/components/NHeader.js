import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.scss'

export default class NHeader extends React.Component {
  render() {
    return (
      <header className="nheader">
        <div className="logo">
          <NavLink to="/">
            <img src={require('assets/logo.png')} alt="logo" />
          </NavLink>
        </div>
        <div className="moto">
          精致的淘气，智性的叛逆
        </div>
        <div className="tabs">
          <NavLink to="/photo" activeClassName="active" className="nav-photo">PHOTO</NavLink>
          <NavLink to="/music" activeClassName="active" className="nav-music">MUSIC</NavLink>
          <NavLink to="/video" activeClassName="active" className="nav-video">VIDEO</NavLink>
        </div>
      </header>
    )
  }
}
