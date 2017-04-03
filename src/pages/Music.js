import React from 'react'
import RyAudio from '~/components/RyAudio'
import data from '~/data'
import { cropImage } from '~/utils'
import './music.scss'

export default class Music extends React.Component {
  constructor() {
    super()
    this.state = {
      musics: data.musics,
      currentMusic: data.musics[4],
      currentIndex: 4
    }
    this.changeMusic.bind(this)
  }
  prev() {
    let index = this.state.currentIndex - 1
    const len = this.state.musics.length
    if (index < 0) {
      index = len - 1
    }
    this.setState({
      currentIndex: index,
      currentMusic: this.state.musics[index]
    })
  }
  next() {
    let index = this.state.currentIndex + 1
    const len = this.state.musics.length
    if (index > len - 1) {
      index = 0
    }
    this.setState({
      currentIndex: index,
      currentMusic: this.state.musics[index]
    })
  }
  changeMusic(index) {
    this.setState({
      currentIndex: index,
      currentMusic: this.state.musics[index]
    })
  }
  renderMusic() {
    return this.state.musics.map((item, index) => {
      const tpl = (
        <div className="music-item" key={item.id} onClick={() => this.changeMusic(index)}>
          <div className="music-cover">
            <img src={cropImage(item.cover, 220, 220)} alt={item.title} />
          </div>
          <div className="music-info">
            <div className="music-title">{item.title}</div>
            <div className="music-singer">{item.singer}</div>
          </div>
        </div>
      )
      return tpl
    })
  }
  render() {
    const { currentIndex, currentMusic } = this.state
    return (
      <div className="musics">
        <div className="music-player">
          <RyAudio audio={currentMusic} index={currentIndex} onPrev={this.prev.bind(this)} onNext={this.next.bind(this)}/>
        </div>
        <div className="music-list">
          {this.renderMusic()}
        </div>
      </div>
    )
  }
}
