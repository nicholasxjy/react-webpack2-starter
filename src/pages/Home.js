import React from 'react'
import { Link } from 'react-router-dom'
import { cropImage } from '~/utils'
import data from '~/data'
import './home.scss'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      images: data.images
    }
  }
  renderCategory() {
    return this.state.images.map((item, index) => {
      const tpl = (
        <div className="category" key={index}>
          <Link to={`/${item.category}`}>
            <img src={cropImage(item.url, 300, 200)} alt="photo"/>
            <div className="intro">{item.intro}</div>
          </Link>
        </div>
      )
      return tpl
    })
  }
  render() {
    return (
      <div className="home">
        {this.renderCategory()}
      </div>
    )
  }
}
