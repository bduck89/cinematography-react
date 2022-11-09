import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ContactDetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      type: null,
      name: null,
      description: null,
      icon: null,
    };
  }

  componentDidMount() {
    this.setState({
      type: this.props.card.type,
      name: this.props.card.name,
      description: this.props.card.description,
      icon: this.props.card.icon,
    });
  }

  handleContactNameOnChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleContactDescriptionChange(e) {
    this.setState({
      link: e.target.value,
    });
  }

  handleContactTypeChange(e) {
    this.setState({
      type: e.target.value,
    });
  }

  handleContactIconChange(e) {
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

  onEditContactSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.patch(
      `/contact/contacts/${this.props.card._id}`,
      {
        type: this.state.type,
        name: this.state.name,
        description: this.state.description,
        icon: this.state.icon,
      }
    );

    if (response.status === 200) {
      this.setState({
        edit: false,
      });
    }
  };

  renderEdit() {
    if (this.state.edit) {
      return (
        <form onSubmit={(e) => this.onEditContactSubmit(e)}>
          <label>Contact Name:</label>
          <br/>
          <input
            type="text"
            name="contactName"
            onChange={(e) => this.handleContactNameOnChange(e)}
            defaultValue={this.state.name}
          />
          <br/>
          <label>Contact Description:</label>
          <br/>
          <input
            type="text"
            name="contactDescription"
            onChange={(e) => {
              this.handleContactDescriptionChange(e);
            }}
            defaultValue={this.state.description}
          />
          <br/>
          <label>Contact Type:</label>
          <br/>
          <input
            type="text"
            name="contactType:"
            onChange={(e) => {
              this.handleContactTypeChange(e);
            }}
            defaultValue={this.state.type}
          />
          <br/>
          <label>Icon:</label>
          <button 
          onClick={(e) => this.handleContactIconChange(e)}>
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
          <h5>{this.state.description}</h5>
          <h5>{this.state.type}</h5>
        </div>
        <div className="admin-contact-card-details-buttons">
          <button onClick={(e) => this.editOnClick(e)}
          className="submit-button">
            {this.state.edit ? "Cancel" : "Edit"}
          </button>
          <Link to={`/admin/contact/delete/${this.props.card._id}`}>
            <button
            className="delete-button">Delete</button>
          </Link>
        </div>
        
        <div>{this.renderEdit()}</div>
      </div>
    );
  }
}

export default ContactDetailsCard;
