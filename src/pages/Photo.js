import React from 'react'
import { cropImage } from '~/utils'
import data from '~/data'
import './photo.scss'

export default class Photo extends React.Component {
  constructor() {
    super()
    this.state = {
      photos: data.photos
    }
  }
  renderPhoto() {
    return this.state.photos.map(item => {
      const tpl = (
        <div className="photo-item" key={item.id}>
          <img src={cropImage(item.url, 300, 300)} alt="photography" />
        </div>
      )
      return tpl
    })
  }
  render() {
    return (
      <div className="photos">
        {this.renderPhoto()}
      </div>
    )
  }
}
