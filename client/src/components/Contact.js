import '../css/components/contact/contact.css';
import React from "react";
import axios from "axios";
import ContactCard from "./frames/contact/ContactCard";
import SocialCard from "./frames/contact/SocialCard";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      socials: [],
      icons: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.getContacts();
    this.getSocials();
    this.getIcons();
  }

  getContacts = async () => {
    const response = await axios.get("/main/contacts");

    if (response.status === 200) {
      this.setState({
        contacts: response.data,
      });
    }
  };

  getSocials = async () => {
    const response = await axios.get("/main/social");

    if (response.status === 200) {
      this.setState({
        socials: response.data,
      });
    }
  };

  getIcons = async () => {
    const response = await axios.get("/main/icons");

    if (response.status === 200) {
      this.setState({
        icons: response.data,
      });
    }
  };

  renderContact() {
    if (this.state.contacts.length !== 0) {
      return this.state.contacts.map((contact) => (
        <ContactCard
          key={contact._id}
          contact={contact}
          icons={this.state.icons}
        />
      ));
    }
  }

  renderSocial() {
    if (this.state.socials.length !== 0) {
      return this.state.socials.map((social) => (
        <SocialCard key={social._id} social={social} icons={this.state.icons} />
      ));
    }
  }

  render() {
    return (
      <div className="contact">
        <div>
          <h1>Contact Details</h1>
        </div>
        <div className="contact-column-split">
        <div className="contact-column">
          <h2>General Information</h2>
          {this.renderContact()}
        </div>
        <div className="contact-column">
          <h2>Social Media</h2>
          <div className='social-row'>
        {this.renderSocial()}
          </div>
        </div>
        </div>

      </div>
    );
  }
}

export default Contact;
