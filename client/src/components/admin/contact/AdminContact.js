import axios from "axios";
import React from "react";
import history from "../../../history";
import AdminMenu from "../../frames/admin/AdminMenu";
import ContactDetailsList from "../../frames/admin/contact/ContactDetailsList";
import SocialMediaList from "../../frames/admin/contact/SocialMediaList";
import UploadIcons from "../../frames/admin/contact/UploadIcons";

class AdminContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconsList: [],
      contactsList: [],
      sociallist: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.getIcons();
    this.getContacts();
    this.getSocial();
  }

  getIcons = async () => {
    const response = await axios.get("/contact/icons");
    if (response.data === "Not Authorised") {
      history.push("/");
    } else if (response.status === 200) {
      this.setState({
        iconsList: response.data,
      });
    }
  };

  getContacts = async () => {
    const response = await axios.get("/contact/contacts");
    if (response.data === "Not Authorised") {
      history.push("/");
    } else if (response.status === 200) {
      this.setState({
        contactsList: response.data,
      });
    }
  };

  getSocial = async () => {
    const response = await axios.get("/contact/social");
    if (response.data === "Not Authorised") {
      history.push("/");
    } else if (response.status === 200) {
      this.setState({
        sociallist: response.data,
      });
    }
  };

  render() {
    return (
      <div>
        <AdminMenu />
        <div className="admin-contact">
          <h1>Contact Page</h1>
          <ContactDetailsList contacts={this.state.contactsList} />
          <SocialMediaList socials={this.state.sociallist} />
          <UploadIcons icons={this.state.iconsList} />
        </div>
      </div>
    );
  }
}

export default AdminContact;
