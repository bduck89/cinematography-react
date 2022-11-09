import axios from "axios";
import React from "react";
import ContactDetailsCard from "./ContactDetailsCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import history from "../../../../history";

class ContactDetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newInput: false,
      contactName: null,
      contactDesc: null,
      contactType: null,
      icon: false,
    };
  }

  componentDidMount() {
    this.setState({
      list: this.props.contacts,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        list: this.props.contacts,
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
            <ContactDetailsCard card={card} />
          </div>
        )}
      </Draggable>
    ));
  }

  onNewContactSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.contactName &&
      this.state.contactDesc &&
      this.state.contactType
    ) {
      const response = await axios.post("/contact/contacts", {
        type: this.state.contactType,
        name: this.state.contactName,
        description: this.state.contactDesc,
        positionId: Number(this.state.list.length + 1),
        icon: this.state.icon,
      });

      if (response.status === 200) {
        const Arr = this.state.list;
        Arr.push(response.data);
        this.setState({
          list: Arr,
          newInput:false
        });
      }
    }
  };

  handleContactNameOnChange(e) {
    this.setState({
      contactName: e.target.value,
    });
  }

  handleContactInfoOnChange(e) {
    this.setState({
      contactDesc: e.target.value,
    });
  }

  handleContactTypeChange(e) {
    this.setState({
      contactType: e.target.value,
    });
  }

  handleContactIconOnChange(e) {
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
          <form onSubmit={(e) => this.onNewContactSubmit(e)}>
            <label>Contact Name:</label>
            <br/>
            <input
              type="text"
              name="contactName"
              onChange={(e) => this.handleContactNameOnChange(e)}
            />
            <br/>
            <label>Contact Info:</label>
            <br/>
            <input
              type="text"
              name="contactInfo"
              onChange={(e) => this.handleContactInfoOnChange(e)}
            />
            <br/>
            <label>Contact Type:</label>
            <br/>
            <input
              type="text"
              name="contentType"
              onChange={(e) => this.handleContactTypeChange(e)}
            />
            <br/>
            <label>Icon:</label>
            <button onClick={(e) => this.handleContactIconOnChange(e)}>
              {this.state.icon ? "Yes" : "No"}
            </button>
            <br/>
            <div>
            <button className="submit-button" type="submit">Submit</button>
            </div>
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
                  {this.state.newInput ? "Cancel" : "New Contact"}
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
    for (const contact of newOrder) {
      const index = newOrder.findIndex((x) => x._id === contact._id);
      await axios.patch(`/contact/contacts/${contact._id}`, {
        type: contact.type,
        name: contact.name,
        description: contact.description,
        positionId: index + 1,
        icon: contact.icon,
      });
    }
    history.push("/admin/dashboard");
  };

  render() {
    return (
      <div className="admin-contact-list">
        <div className="contact-list">
            <h2>Contact Details</h2>
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

export default ContactDetailsList;
