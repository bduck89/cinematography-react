import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../../../../history";
import VideoPreviewWindow from "./VideoPreviewWindow";

class VideoDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileReady: false,
      videoDescriptionArray: [],
    };
  }

  componentDidMount() {
    this.setState({
      videoDescriptionArray: this.props.videoDescription,
    });

    if (this.props.existingVideo) {
      this.setState({
        fileReady: true,
      });
    }
  }

  thumbnailOnChangeHandler = async (event) => {
    this.setState({
      fileReady: true,
    });

    const file = new FormData();
    file.append("file", event.target.files[0]);

    const response = await axios.post("/upload/file", file);
    this.props.onVideoThumbnailOnChange(response.data.url);
  };

  askForUpload() {
    if (!this.state.fileReady) {
      return (
        <React.Fragment>
          <span>Please upload a thumbnail for the video...</span>
        </React.Fragment>
      );
    }
  }

  submitVideoDetails = async (e) => {
    e.preventDefault();
    if (this.props.emptyForm) {
      const upload = await axios.post("/video/work", {
        thumbnail: this.props.backgroundImage,
        videoTitle: this.props.videoTitle,
        videoDescription: this.props.videoDescription,
        videoLink: this.props.videoLink,
        positionId: this.props.positionId,
      });

      if (upload.status === 200) {
        history.push("/admin/work/videos");
      }
    } else {
      const upload = await axios.patch(`/video/work/${this.props.videoId}`, {
        thumbnail: this.props.backgroundImage,
        videoTitle: this.props.videoTitle,
        videoDescription: this.props.videoDescription,
        videoLink: this.props.videoLink,
        positionId: this.props.positionId,
      });

      if (upload.status === 200) {
        history.push("/admin/work/videos");
      }
    }
  };

  handleVideoTitleChange(e) {
    this.props.onVideoTitleOnChange(e.target.value);
  }

  handleVideoDescriptionChange(e) {
    this.props.onVideoDescriptionOnChange(e.target.value);
  }

  handleVideoLinkChange(e) {
    this.props.onVideoLinkOnChange(e.target.value);
  }

  render() {
    return (
      <div className="video-details-form">
        <h1>{this.props.formTitle}</h1>
        <form>
          <div className="thumbnail-upload">
            <div>
              <label>Thumbnail:</label>
            </div>
            <div>
              <input
                className="thumbnail-upload"
                type="file"
                name="file"
                onChange={this.thumbnailOnChangeHandler}
              />
            </div>
            <div className="ask-for-upload">{this.askForUpload()}</div>
          </div>
        </form>
        <form onSubmit={this.submitVideoDetails}>
          <div className="video-details-form">
            <div className="video-details-form-input">
              <label>Video Title:</label>
              <input
                name="videoTitle"
                type="text"
                placeholder="Please insert the title of the video..."
                onChange={(e) => this.handleVideoTitleChange(e)}
                value={this.props.videoTitle}
              />
            </div>
            <div className="video-details-form-input">
              <label>Video Description:</label>
              <input
                name="videodescription"
                type="text"
                placeholder="Please insert the description of the video..."
                onChange={(e) => this.handleVideoDescriptionChange(e)}
                value={this.props.videoDescription}
              />
              <p>New Line = &#60;br&#62; e.g Line 1&#60;br&#62;Line 2
                <br/>
                If Gap between New Line add another &#60;br&#62; e.g "Line 1&#60;br&#62;&#60;br&#62;Line 2" <br/>Do not leave spaces next to &#60;br&#62;<br />
                See Preview below to check how it looks.</p>
            </div>
            <div className="video-details-form-input">
              <label>Video Link:</label>
              <input
                name="videoLink"
                type="text"
                placeholder="Please insert the link to the video..."
                onChange={(e) => this.handleVideoLinkChange(e)}
                value={this.props.videoLink}
              />
            </div>
            <div>
              <button className="video-details-form-submit" type="submit">
                Submit
              </button>
              <Link to="/admin/work/videos">
                <button className="video-details-form-cancel" type="button">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
        <VideoPreviewWindow
          backgroundImage={this.props.backgroundImage}
          videoTitle={this.props.videoTitle}
          videoDescription={this.props.videoDescription}
          videoLink={this.props.videoLink}
        />
      </div>
    );
  }
}

export default VideoDetailsForm;

//<VideoDetailsForm
// emptyForm={false}
// formTitle="New Video Details"
// onVideoTitleOnChange={this.videoTitleOnChangeHandler}
// onVideoDescriptionOnChange={this.videoDescriptionOnChangeHandler}
// onVideoLinkOnChange={this.videoLinkOnChangeHandler}
// onVideoThumbnailOnChange={this.videoThumbnailOnChangeHandler}
// backgroundImage={this.state.backgroundImage}
// videoTitle={this.state.videoTitle}
// videoDescription={this.state.videoDescription}
// videoLink={this.state.videoLink}
// videoId={this.props.videoId}
// />
