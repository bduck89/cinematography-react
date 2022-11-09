import "../css/components/video/video.css";
import React from "react";
import axios from "axios";
import ReactPlayer from "react-player";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTitle: null,
      videoDescription: null,
      videoLink: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await axios.get(
      `/main/work/${this.props.match.params.videoId}`
    );

    if (response.status === 200) {
      this.setState({
        videoTitle: response.data.videoTitle,
        videoDescription: response.data.videoDescription,
        videoLink: response.data.videoLink,
      });
    }
  };

  createMarkup(){
    return {__html: this.state.videoDescription}
  }

  render() {
    return (
      <div className="video">
        <h1 className="video-title">{this.state.videoTitle}</h1>
        <div className="show-reel-wrapper">
          <ReactPlayer
            className="show-reel"
            url={this.state.videoLink}
            volume={1}
            muted={false}
            playing={false}
            loop={false}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
        <div className="video-title-description">
          <h2>{this.state.videoTitle}</h2>
          <p dangerouslySetInnerHTML={this.createMarkup()}></p>
        </div>
      </div>
    );
  }
}

export default Video;
