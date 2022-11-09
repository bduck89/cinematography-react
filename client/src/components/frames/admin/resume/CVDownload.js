import React from "react";
import axios from "axios";

class CVDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileReady: false,
      filename: null,
      fileUrl: null,
      initialFileUrl: null,
      initialFileId: null,
      initialFilename: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await axios.get("/cv/cv");
    console.log(response);
    if (response.data.length !== 0) {
      return this.setState({
        initialFileUrl: response.data[0].url,
        initialFileId: response.data[0]._id,
        fileReady: true,
        initialFilename: response.data[0].uniqueFileName,
      });
    }
  };

  cvUploadOnChangeHandler = async (event) => {
    this.setState({
      fileReady: true,
    });

    const file = new FormData();
    file.append("file", event.target.files[0]);

    const response = await axios.post("/upload/file", file);

    this.setState({
      fileUrl: response.data.url,
    });
  };

  askForUpload() {
    if (!this.state.fileReady) {
      return (
        <React.Fragment>
          <span>Please upload a CV ready for download...</span>
        </React.Fragment>
      );
    }
  }

  filenameOnChangeHandler(e) {
    this.setState({
      filename: e.target.value,
    });
  }

  cvSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (
      this.state.initialFileUrl &&
      this.state.filename &&
      this.state.fileUrl
    ) {
      axios.patch(`cv/replace/${this.state.initialFileId}`, {
        uniqueFileName: this.state.filename,
        url: this.state.fileUrl,
      });
    } else if (
      this.state.initialFileUrl === null &&
      this.state.fileUrl &&
      this.state.filename
    ) {
      axios.post("/cv/upload", {
        uniqueFileName: this.state.filename,
        url: this.state.fileUrl,
      });
      this.setState({
        initialFileUrl: this.state.fileUrl,
      });
    } else if (
      this.state.initialFileUrl &&
      this.state.filename === null &&
      this.state.fileUrl !== this.state.initialFileUrl
    ) {
      axios.patch(`/cv/replace/${this.state.initialFileId}`, {
        uniqueFileName: this.state.initialFilename,
        url: this.state.fileUrl,
      });
    }
  }

  render() {
    return (
      <div>
        <form>
          <label>CV File:</label>
          <input
            type="file"
            name="file"
            onChange={this.cvUploadOnChangeHandler}
          />
          {this.askForUpload()}
        </form>
        <form onSubmit={(e) => this.cvSubmit(e)}>
          <label>File Name:</label>
          <input
            type="text"
            name="filename"
            onChange={(e) => this.filenameOnChangeHandler(e)}
            defaultValue={this.state.initialFilename}
          />
          <button 
          className="submit-button" style={{height:"auto"}}
          type="submit">Submit CV</button>
        </form>
      </div>
    );
  }
}

export default CVDownload;
