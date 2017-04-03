import React from 'react'

import { formatTime } from '~/utils'
import './ryaudio.scss'

export default class RyAudio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: '00:00',
      duration: '00:00',
      isPlaying: false,
      progressMax: 0,
      activeProgress: 0,
      progressValue: 0
    }
  }
  handleAudioPlay() {
    this.audioEle.play()
    this.setState({ isPlaying: true })
  }
  handleAudioPause() {
    this.audioEle.pause()
    this.setState({ isPlaying: false })
  }
  handleSliderChange(e) {
    const val = e.target.value
    const activeValue = parseFloat(val / this.audioEle.duration)
    this.setState({
      progressValue: val,
      activeProgress: activeValue
    })
    this.audioEle.currentTime = val
  }
  seekTo(e) {
    const rect = this.refs.progress.getBoundingClientRect()
    const offset = e.pageX - rect.left
    const ratio = parseFloat(offset / rect.width)
    const value = ratio * this.audioEle.duration
    this.setState({
      progressValue: value,
      activeProgress: ratio
    })
    this.audioEle.currentTime = value
  }
  handlePrev() {
    this.setState({ isPlaying: false })
    this.props.onPrev()
  }
  handleNext() {
    this.setState({ isPlaying: false })
    this.props.onNext()
  }
  componentDidMount() {
    const { isPlaying } = this.state
    this.audioEle.addEventListener('loadeddata', () => {
      this.setState({
        progressMax: this.audioEle.duration,
        duration: formatTime(this.audioEle.duration)
      })
    }, false)
    this.audioEle.addEventListener('timeupdate', () => {
      const activeValue = parseFloat(this.audioEle.currentTime / this.audioEle.duration)
      this.setState({
        progressValue: this.audioEle.currentTime,
        activeProgress: activeValue,
        currentTime: formatTime(this.audioEle.currentTime)
      })
    }, false)
    this.audioEle.addEventListener('play', () => {
      if (!isPlaying) {
        this.setState({ isPlaying: true })
      }
    }, false)
    this.audioEle.addEventListener('pause', () => {
      if (isPlaying) {
        this.setState({ isPlaying: false })
      }
    }, false)
    this.audioEle.addEventListener('ended', () => {
      this.setState({ isPlaying: false })
    }, false)
  }
  componentDidUpdate(prevProps) {
    if (prevProps && this.props.index !== prevProps.index) {
      this.audioEle.play()
      this.setState({ isPlaying: true })
    }
  }
  renderPlayAndPause() {
    const { isPlaying } = this.state
    const tpl = isPlaying ? (<a className="ryaudio-pause" onClick={this.handleAudioPause.bind(this)}><img src={require('assets/audio/pause.svg')} alt="pause"/></a>) : (<a className="ryaudio-play" onClick={this.handleAudioPlay.bind(this)}><img src={require('assets/audio/play.svg')} alt="play"/></a>)
    return tpl
  }
  render() {
    const { audio } = this.props
    const { currentTime, duration, isPlaying, activeProgress, progressMax, progressValue } = this.state
    return (
      <div className="ryaudio">
        <div className="ryaudio-container">
          <audio ref={el => this.audioEle = el} src={audio.src} preload="auto">
            <p>we believe you need to upgrade your browser :)</p>
          </audio>
          <div className={ isPlaying ? 'ryaudio-cover' : 'ryaudio-cover is-paused'}>
            <img src={audio.cover} alt={audio.title} />
          </div>
          <div className="ryaudio-content">
            <div className="ryauio-info">
              <div className="ryaudio-title">{audio.title}</div>
              <div className="ryaudio-singer">{audio.singer}</div>
            </div>
            <div className="ryaudio-progress-wrap">
              <span className="ryaudio-currenttime">{currentTime}</span>
              <div className="ryaudio-progress">
                <div className="ryaudio-progress-active" style={{ width: `${activeProgress * 100}%` }} onClick={this.seekTo.bind(this)}></div>
                <input ref="progress" type="range" className="ryaudio-progress-bar" min="0" max={progressMax} value={progressValue} onChange={this.handleSliderChange.bind(this)} />
              </div>
              <span className="ryaudio-duration">{duration}</span>
            </div>
            <div className="ryaudio-controls">
              <a className="ryaudio-prev" onClick={this.handlePrev.bind(this)}>
                <img src={require('assets/audio/prev.svg')} alt="prev"/>
              </a>
              { this.renderPlayAndPause() }
              <a className="ryaudio-next" onClick={this.handleNext.bind(this)}>
                <img src={require('assets/audio/next.svg')} alt="next"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RyAudio.propTypes = {
  audio: React.PropTypes.object,
  index: React.PropTypes.number,
  onPrev: React.PropTypes.func,
  onNext: React.PropTypes.func
}

RyAudio.defaultProps = {
  audio: {
    src: 'http://7xj610.com1.z0.glb.clouddn.com/%E4%B8%81%E5%8F%AF%20-%20If.mp3',
    title: 'If',
    singer: '丁可',
    cover: 'http://7xj610.com1.z0.glb.clouddn.com/86861418607103.jpeg'
  },
  index: 0
}
