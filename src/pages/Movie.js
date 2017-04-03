import React from 'react'
import RyVideo from '~/components/RyVideo'
import data from '~/data'
import './movie.scss'

export default class Movie extends React.Component {
  constructor() {
    super()
    this.state = {
      videos: data.videos
    }
  }
  renderVideo() {
    return this.state.videos.map(item => {
      const tpl = (
        <div className="video-item" key={item.id}>
          <RyVideo video={item} width={460} height={258}/>
        </div>
      )
      return tpl
    })
  }
  render() {
    return (
      <div className="videos">
        {this.renderVideo()}
      </div>
    )
  }
}
