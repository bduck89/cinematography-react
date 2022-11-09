import React from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import history from "../../../../history";

class CategoryCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newInput: false,
      categoryName: null,
      newPositionId: 1,
      productions: [],
    };
  }

  componentDidMount() {
    this.setState({
      list: this.props.categories,
      newPositionId: this.props.categories.length + 1,
      productions: this.props.productions,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        list: this.props.categories,
        newPositionId: this.props.categories.length + 1,
        productions: this.props.productions,
      });
    }
  }

  sortProductions(name) {
    const list = this.state.productions;
    const newList = [];
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].categoryName === name) {
          newList.push(list[i]);
        }
      }
      return newList;
    }
  }

  renderList() {
    const list = this.state.list;
    return list.map((card, index) => (
      <Draggable draggableId={card._id} index={index} key={card._id}>
        {(provided) => (
          <div
          className="admin-category-card-list"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style }}
          >
            <span
              {...provided.dragHandleProps}
              className="material-icons-outlined"
            >
              reorder
            </span>
            <CategoryCard
              card={card}
              cardIndex={index}
              listLength={list.length}
              productions={this.sortProductions(card.name)}
            />
          </div>
        )}
      </Draggable>
    ));
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
    for (const category of newOrder) {
      const index = newOrder.findIndex((x) => x._id === category._id);
      await axios.patch(`/cv/resume/category/${category._id}`, {
        positionId: index + 1,
        name: category.name,
      });
    }
    history.push("/admin/dashboard");
  };

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

  onNewCategorySubmit = async (e) => {
    e.preventDefault();
    const positionId = this.state.newPositionId;
    const upload = await axios.post("/cv/resume/category", {
      positionId: Number(positionId),
      name: this.state.categoryName,
    });

    if (upload.status === 200) {
      const listArray = this.state.list;
      listArray.push(upload.data);
      this.setState({
        newInput: false,
        list: listArray
      });
    }
  };

  handleCategoryNameOnChange(e) {
    this.setState({
      categoryName: e.target.value,
    });
  }

  renderNewInput() {
    if (this.state.newInput) {
      return (
        <div>
          <form onSubmit={(e) => this.onNewCategorySubmit(e)}>
            <label>Category Name:</label>
            <input
              type="text"
              name="categoryName"
              onChange={(e) => this.handleCategoryNameOnChange(e)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }

  renderDragDrop() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="videoList">
          {(provided) => (
            <div className="resume-drag-drop" ref={provided.innerRef} {...provided.droppableProps}>
              {this.renderList()}
              {provided.placeholder}
              <div className="new-video-details-card">
                <button
                  onClick={(e) => this.onNewButtonClick(e)}
                  className="video-list-new-button"
                >
                  {this.state.newInput ? "Cancel" : "New Category"}
                </button>
                <div>{this.renderNewInput()}</div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  render() {
    return (
          <div style={{width: '100%'}}>
            {this.renderDragDrop()}
            <div className="video-submit-buttons">
              <button className="submit-button" onClick={(e) => this.uploadNewOrder(e)}>
                Submit
              </button>
              <Link to="/admin/dashboard">
                <button className="cancel-button">Cancel</button>
              </Link>
            </div>
          </div>
    );
  }
}

export default CategoryCardList;
