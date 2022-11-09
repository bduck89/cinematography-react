import '../../../css/frames/contact/socialCard.css';
import React from "react";
import { ExternalLink } from "react-external-link";

class SocialCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [],
      social: {},
    };
  }

  componentDidMount() {
    this.setState({
      icons: this.props.icons,
      social: this.props.social,
    });
    console.log(this.state);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        icons: this.props.icons,
        social: this.props.social,
      });
    }
    console.log(this.state);
  }

  whatIcon(icons, socialName) {
    if (this.state.icons.length) {
      const iconNames = [];
      icons.forEach((icon) => {
        iconNames.push(icon.name);
      });
      console.log(iconNames);
      if (iconNames.length !== 0) {
        const index = iconNames.indexOf(socialName);
        console.log(index);
        if (index !== -1) {
          console.log(icons[index].url);
          return this.state.icons[index].url;
        }
      }
    }
  }

  hasAnIcon() {
    if (this.state.social.icon) {
      return (
        <ExternalLink href={this.props.social.link}>
          <div className="social-card">
            <img
              src={this.whatIcon(this.state.icons, this.state.social.name)}
              alt={this.state.social.name}
            />
          </div>
        </ExternalLink>
      );
    } else {
      return (
        <ExternalLink href={this.props.social.link}>
          <h3>{this.props.social.name}</h3>
        </ExternalLink>
      );
    }
  }

  render() {
    return <div className="social-column">{this.hasAnIcon()}</div>;
  }
}

export default SocialCard;
