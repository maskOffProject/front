import React, {Component} from 'react'
 
class ImageViewer extends Component {
  initialState = {
      src: ''
  }

  state = this.initialState

  render() {
      const {src } = this.state | "";
      return (
        <img style={{maxHeight: "600px"}} id="test" src={src}></img>
      );
  }
}

export default ImageViewer;