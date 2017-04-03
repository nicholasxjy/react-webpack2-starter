import React from 'react'

import { formatTime } from '~/utils'
import './ryvideo.scss'
export default class RyVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: '00:00',
      duration: '00:00',
      progressValue: 0,
      progressMax: 0,
      activeProgress: 0,
      isPlaying: false,
      isFullScreen: false,
      width: props.width,
      height: props.height
    }
  }
  handleVideoPlay() {
    this.videoEle.play()
    this.setState({ isPlaying: true })
  }
  handleVideoPause() {
    this.videoEle.pause()
    this.setState({ isPlaying: false })
  }
  handleSliderChange(e) {
    const val = e.target.value
    const activeValue = parseFloat(val / this.videoEle.duration)
    this.setState({
      progressValue: val,
      activeProgress: activeValue
    })
    this.videoEle.currentTime = val
  }
  seekTo(e) {
    const rect = this.refs.progress.getBoundingClientRect()
    const offset = e.pageX - rect.left
    const ratio = parseFloat(offset / rect.width)
    const value = ratio * this.videoEle.duration
    this.setState({
      progressValue: value,
      activeProgress: ratio
    })
    this.videoEle.currentTime = value
  }
  reCalculateVideoDimension() {
    const width = window.innerWidth
    const vWidth = parseInt(width * 0.8)
    const vHeight = parseInt(vWidth * 9 / 16)
    return { w: vWidth, h: vHeight }
  }
  toggleFullScreen() {
    const temp = this.state.isFullScreen
    if (!temp) {
      // cal width height
      const dimension = this.reCalculateVideoDimension()
      this.setState({
        width: dimension.w,
        height: dimension.h
      })
    } else {
      const { width, height } = this.props
      this.setState({
        width,
        height
      })
    }
    this.setState({ isFullScreen: !temp })
  }
  componentDidMount() {
    const { isPlaying } = this.state
    this.videoEle.addEventListener('loadeddata', () => {
      this.setState({
        progressMax: this.videoEle.duration,
        duration: formatTime(this.videoEle.duration)
      })
    }, false)
    this.videoEle.addEventListener('timeupdate', () => {
      const activeValue = parseFloat(this.videoEle.currentTime / this.videoEle.duration)
      this.setState({
        progressValue: this.videoEle.currentTime,
        activeProgress: activeValue,
        currentTime: formatTime(this.videoEle.currentTime)
      })
    }, false)
    this.videoEle.addEventListener('play', () => {
      if (!isPlaying) {
        this.setState({ isPlaying: true })
      }
    }, false)
    this.videoEle.addEventListener('pause', () => {
      if (isPlaying) {
        this.setState({ isPlaying: false })
      }
    }, false)
    this.videoEle.addEventListener('ended', () => {
      this.setState({ isPlaying: false })
    }, false)
  }
  render() {
    const { video } = this.props
    const { currentTime, duration, progressMax, progressValue, activeProgress, isPlaying, isFullScreen, width, height } = this.state
    return (
      <div className={isFullScreen ? 'ryvideo fullscreen' : 'ryvideo'}>
        <div className="ryvideo-container">
          <video poster={video.poster} src={video.src} preload="auto" width={width} height={height} ref={el => this.videoEle = el} playsInline>
            <p>we believe you need to upgrade your browser :)</p>
          </video>
          <div className="ryvideo-controls">
            <div className="ryvideo-controls-inner">
              <div className="ryvideo-controls-play-pause">
                { isPlaying ? <a className="ryvideo-controls-pause" onClick={ this.handleVideoPause.bind(this)}></a> : <a className="ryvideo-controls-play" onClick={this.handleVideoPlay.bind(this)}></a> }
              </div>
              <span className="ryvideo-controls-currenttime">{currentTime}</span>
              <div className="ryvideo-progress">
                <div className="ryvideo-progress-active" style={{ width: `${activeProgress * 100}%` }} onClick={this.seekTo.bind(this)}></div>
                <input ref="progress" type="range" className="ryvideo-progress-bar" min="0" max={progressMax} value={progressValue} onChange={this.handleSliderChange.bind(this)}/>
              </div>
              <span className="ryvideo-duration">{duration}</span>
              <a className="ryvideo-controls-fullscreen" onClick={this.toggleFullScreen.bind(this)}></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
RyVideo.propTypes = {
  video: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number
}

RyVideo.defaultProps = {
  video: {
    src: 'http://7xj610.com1.z0.glb.clouddn.com/what-most-schools-dont-teach.mp4',
    poster: 'http://7xj610.com1.z0.glb.clouddn.com/Rectangle-poster.png'
  },
  width: 320,
  height: 180
}
