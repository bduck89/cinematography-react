import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class SocialMediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: null,
      link: null,
      icon: null,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.card.name,
      link: this.props.card.link,
      icon: this.props.card.icon,
    });
  }

  handleSocialNameOnChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleSocialLinkChange(e) {
    this.setState({
      link: e.target.value,
    });
  }

  handleSocialIconChange(e) {
    e.preventDefault();
    if (this.state.icon) {
      this.setState({
        icon: false,
      });
    } else {
      this.setState({
        icon: true,
      });
    }
  }

  onEditSocialSubmit = async (e) => {
    e.preventDefault();
    if (this.state.name && this.state.link) {
      const response = await axios.patch(
        `/contact/social/${this.props.card._id}`,
        {
          name: this.state.name,
          link: this.state.link,
          icon: this.state.icon,
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
        <form onSubmit={(e) => this.onEditSocialSubmit(e)}>
          <label>Social Name:</label>
          <br/>
          <input
            type="text"
            name="socialName"
            onChange={(e) => this.handleSocialNameOnChange(e)}
            defaultValue={this.state.name}
          />
          <br/>
          <label>Social Link:</label>
          <br/>
          <input
            type="text"
            name="socialLink"
            onChange={(e) => {
              this.handleSocialLinkChange(e);
            }}
            defaultValue={this.state.link}
          />
          <br/>
          <label>Icon:</label>
          <br/>
          <button onClick={(e) => this.handleSocialIconChange(e)}>
            {this.state.icon ? "Yes" : "No"}
          </button>
          <br/>
          <button 
          className="submit-button"
          type="submit">Submit</button>
        </form>
      );
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
      <div className="admin-contact-card-details">
        <div className="admin-contact-card-details-card">
          <h4>{this.state.name}</h4>
          <h5>{this.state.link}</h5>
        </div>
        <div className="admin-contact-card-details-buttons">
          <button onClick={(e) => this.editOnClick(e)} className="submit-button">
            {this.state.edit ? "Cancel" : "Edit"}
          </button>
          <Link to={`/admin/social/delete/${this.props.card._id}`}>
            <button className="delete-button">Delete</button>
          </Link>
        </div>
        <div>{this.renderEdit()}</div>
      </div>
    );
  }
}

export default SocialMediaCard;
