import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class IconCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: null,
      url: null,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.card.name,
      url: this.props.card.url,
    });
  }

  handleUploadOnChange = async (event) => {
    const file = new FormData();
    file.append("file", event.target.files[0]);

    const response = await axios.post("/upload/file", file);
    this.setState({
      url: response.data.url,
    });
  };

  handleIconNameOnChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onEditIconSubmit = async (e) => {
    e.preventDefault();
    if (this.state.name && this.state.url) {
      const response = await axios.patch(
        `/contact/icons/${this.props.card._id}`,
        {
          name: this.state.name,
          url: this.state.url,
        }
      );

      if (response.status === 200) {
        this.setState({
          edit: false,
        });
      }
    }
  };

  renderEdit() {
    if (this.state.edit) {
      return (
        <form onSubmit={(e) => this.onEditIconSubmit(e)}>
          <label>Icon Name:</label>
          <br/>
          <input
            type="text"
            name="socialName"
            onChange={(e) => this.handleIconNameOnChange(e)}
            defaultValue={this.state.name}
          />
          <br/>
          <label>Change Icon:</label>
          <br/>
          <input type="file" name="file" onChange={this.handleUploadOnChange} />
          <br/>
          <button 
          className="submit-button"
          type="submit">Submit</button>
        </form>
      );
    } else {
    }
  }

  editOnClick(e) {
    e.preventDefault();
    if (this.state.edit) {
      this.setState({
        edit: false,
      });
    } else {
      this.setState({
        edit: true,
      });
    }
  }

  render() {
    return (
      <div className="admin-icon-card">
        <div className="admin-icon-card-details">
          <div className="admin-icon-card-image">
            <img src={this.state.url} alt={this.state.name} />
          </div>
          <div>
            <h4>{this.state.name}</h4>
          </div>
        </div>
        <div>
          <button 
          className="submit-button"
          onClick={(e) => this.editOnClick(e)}>
            {this.state.edit ? "Cancel" : "Edit"}
          </button>
          <Link to={`/admin/icon/delete/${this.props.card._id}`}>
            <button className="delete-button">Delete</button>
          </Link>
        </div>
        <div>{this.renderEdit()}</div>
      </div>
    );
  }
}

export default IconCard;
