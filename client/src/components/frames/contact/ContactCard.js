import '../../../css/frames/contact/contactCard.css';
import React from "react";

class ContactCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {},
      icons: [],
    };
  }

  componentDidMount() {
    this.setState({
      contact: this.props.contact,
      icons: this.props.icons,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        contact: this.props.contact,
        icons: this.props.icons,
      });
    }
  }

  whatIcon(icons, contactName) {
    if (this.state.icons.length) {
      const iconNames = [];
      icons.forEach((icon) => {
        iconNames.push(icon.name);
      });
      console.log(iconNames);
      if (iconNames.length !== 0) {
        const index = iconNames.indexOf(contactName);
        console.log(index);
        if (index !== -1) {
          console.log(icons[index].url);
          return this.state.icons[index].url;
        }
      }
    }
  }
  hasAnIcon() {
    if (this.state.contact.icon) {
      return (
        <div className="contact-card">
          <div>
            <img
              src={this.whatIcon(this.state.icons, this.state.contact.name)}
              alt={this.state.contact.name}
            />
            <h3>{this.state.contact.name}</h3>
          </div>
          <h5>{this.state.contact.description}</h5>
        </div>
      );
    } else {
      return (
        <div className="contact-card">
          <h3>{this.props.contact.name}</h3>
          <h5>{this.state.contact.description}</h5>
        </div>
      );
    }
  }

  render() {
    return <div style={{ width: "100%" }}>{this.hasAnIcon()}</div>;
  }
}

export default ContactCard;
