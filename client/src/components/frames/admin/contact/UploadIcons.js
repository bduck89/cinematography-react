import React from "react";
import axios from "axios";
import IconCard from "./IconCard";

class UploadIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newInput: false,
      iconName: null,
      iconUrl: null,
      fileReady: false,
    };
  }

  componentDidMount() {
    this.setState({
      list: this.props.icons,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        list: this.props.icons,
      });
    }
  }

  renderList() {
    const list = this.state.list;
    return list.map((card, index) => (
      <div key={card._id}
      className="admin-contact-details-card">
        <IconCard card={card} />
      </div>
    ));
  }

  onNewIconSubmit = async (e) => {
    e.preventDefault();
    if (this.state.iconName && this.state.iconUrl) {
      const response = await axios.post("/contact/icons", {
        name: this.state.iconName,
        url: this.state.iconUrl,
      });

      if (response.status === 200) {
        const Arr = this.state.list;
        Arr.push(response.data);
        this.setState({
          list: Arr,
          newInput: false,
        });
      }
    }
  };

  handleIconNameOnChange(e) {
    this.setState({
      iconName: e.target.value,
    });
  }

  handleUploadOnChange = async (event) => {
    this.setState({
      fileReady: true,
    });

    const file = new FormData();
    file.append("file", event.target.files[0]);

    const response = await axios.post("/upload/file", file);
    this.setState({
      iconUrl: response.data.url,
    });
  };

  askForUpload() {
    if (!this.state.fileReady) {
      return (
        <React.Fragment>
          <span>Please upload an icon...</span>
        </React.Fragment>
      );
    }
  }

  renderNewInput() {
    if (this.state.newInput) {
      return (
        <div style={{marginLeft: "40px"}}>
          <form onSubmit={(e) => this.onNewIconSubmit(e)}>
            <label>Icon Name:</label>
            <br/>
            <input
              type="text"
              name="socialName"
              onChange={(e) => this.handleIconNameOnChange(e)}
            />
            <br/>
            <label>Upload Icon:</label>
            <br/>
            <input
              type="file"
              name="file"
              onChange={this.handleUploadOnChange}
            />
            <br/>
            <div className="ask-for-upload">{this.askForUpload()}</div>
            <button 
            className="submit-button"
            type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }

  onNewButtonClick(e) {
    e.preventDefault();
    if (!this.state.newInput) {
      this.setState({
        newInput: true,
      });
    } else {
      this.setState({
        newInput: false,
      });
    }
  }

  renderDragDrop() {
    return (
      <div style={{width: "100%"}}>
        {this.renderList()}
        <div className="new-video-details-card">
          <button
            onClick={(e) => this.onNewButtonClick(e)}
            className="video-list-new-button"
          >
            {this.state.newInput ? "Cancel" : "New Icon"}
          </button>
          <div>{this.renderNewInput()}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="admin-contact-list">
        <div className="contact-list">
          <h2>Icons</h2>
          {this.renderDragDrop()}
        </div>
      </div>
    );
  }
}

export default UploadIcons;
