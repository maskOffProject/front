import React, {Component} from 'react'
 
class VideoViewer extends Component {
  initialState = {
      src: ''
  }

  state = this.initialState

  render() {
      const {src } = this.state | "";
      return (
        <video style={{maxHeight: "600px"}} id="video" src={src}></video>
      );
  }
}

export default VideoViewer;