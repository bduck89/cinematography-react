import React from "react";
import Tile from '../../Tile';

class VideoPreviewWindow extends React.Component {
  createMarkup(){
    return {__html: this.props.videoDescription}
  }

  render() {
    return (
      <div>
        <Tile
          videoId={this.props.videoId}
          tileStyle="video-details-preview"
          videoTitle={this.props.videoTitle}
          backgroundImage={this.props.backgroundImage}
        />
        <div>
          <p dangerouslySetInnerHTML={this.createMarkup()}></p>
        </div>
      </div>
    );
  }
}

export default VideoPreviewWindow;

// <VideoPreviewWindow
// backgroundImage={this.state.backgroundImage}
// videoTitle={this.state.videoTitle}
// videoDescription={this.state.videoDescription}
// />
