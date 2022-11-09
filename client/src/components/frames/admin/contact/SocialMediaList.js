import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SocialMediaCard from "./SocialMediaCard";
import history from "../../../../history";

class SocialMediaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newInput: false,
      socialName: null,
      socialLink: null,
      icon: false,
    };
  }

  componentDidMount() {
    this.setState({
      list: this.props.socials,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        list: this.props.socials,
      });
    }
  }

  renderList() {
    const list = this.state.list;
    return list.map((card, index) => (
      <Draggable draggableId={card._id} index={index} key={card._id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style }}
            className="admin-contact-details-card"
          >
            <span
              {...provided.dragHandleProps}
              className="material-icons-outlined"
            >
              reorder
            </span>
            <SocialMediaCard card={card} />
          </div>
        )}
      </Draggable>
    ));
  }

  onNewSocialSubmit = async (e) => {
    e.preventDefault();
    if (this.state.socialName && this.state.socialLink) {
      const response = await axios.post("/contact/social", {
        name: this.state.socialName,
        link: this.state.socialLink,
        positionId: Number(this.state.list.length + 1),
        icon: this.state.icon,
      });

      if (response.status === 200) {
        const Arr = this.state.list;
        Arr.push(response.data);
        this.setState({
          list: Arr,
          newInput: false
        });
      }
    }
  };

  handleSocialNameOnChange(e) {
    this.setState({
      socialName: e.target.value,
    });
  }

  handleSocialLinkOnChange(e) {
    this.setState({
      socialLink: e.target.value,
    });
  }

  handleSocialIconOnChange(e) {
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

  renderNewInput() {
    if (this.state.newInput) {
      return (
        <div style={{marginLeft: "40px"}}>
          <form onSubmit={(e) => this.onNewSocialSubmit(e)}>
            <label>Social Name:</label>
            <br/>
            <input
              type="text"
              name="socialName"
              onChange={(e) => this.handleSocialNameOnChange(e)}
            />
            <br/>
            <label>Social Link:</label>
            <br/>
            <input
              type="text"
              name="socialLink"
              onChange={(e) => this.handleSocialLinkOnChange(e)}
            />
            <br/>
            <label>Icon:</label>
            <button onClick={(e) => this.handleSocialIconOnChange(e)}>
              {this.state.icon ? "Yes" : "No"}
            </button>
            <br/>
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
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="videoList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}
            className="admin-contact-div">
              {this.renderList()}
              {provided.placeholder}
              <div className="new-video-details-card">
                <button
                  onClick={(e) => this.onNewButtonClick(e)}
                  className="video-list-new-button"
                >
                  {this.state.newInput ? "Cancel" : "New Social"}
                </button>
                <div>{this.renderNewInput()}</div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newList = this.state.list;
    const [removed] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, removed);
    this.setState({ list: newList });
  };

  uploadNewOrder = async () => {
    const newOrder = this.state.list;
    for (const social of newOrder) {
      const index = newOrder.findIndex((x) => x._id === social._id);
      await axios.patch(`/contact/social/${social._id}`, {
        name: social.name,
        link: social.link,
        positionId: index + 1,
        icon: social.icon,
      });
    }
    history.push("/admin/dashboard");
  };

  render() {
    return (
      <div className="admin-contact-list">
        <div className="contact-list">
          <h2>Social Media Details</h2>
          <div style={{width: "100%"}}>
            {this.renderDragDrop()}
            <div className="video-submit-buttons">
              <button
                className="submit-button"
                onClick={(e) => this.uploadNewOrder(e)}
              >
                Submit
              </button>
              <Link to="/admin/dashboard">
                <button className="cancel-button">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialMediaList;
