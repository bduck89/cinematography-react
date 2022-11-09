import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductionCard from "./ProductionCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class ProductionCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newInput: false,
      productionName: null,
      productionCompany: null,
      productionDetails: [],
      detail: null,
      newPositionId: 1,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      list: this.props.productions,
      newPositionId: this.props.productions.length,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        list: this.props.productions,
        newPositionId: this.props.productions.length + 1,
      });
    }
  }

  renderList() {
    const list = this.state.list;
    if (list) {
      return list.map((card, index) => (
        <Draggable draggableId={card._id} index={index} key={card._id}>
          {(provided) => (
            <div
              className="admin-production-card-list"
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
              <ProductionCard
                card={card}
                cardIndex={index}
                listLength={list.length}
                productions={this.props.productions}
              />
            </div>
          )}
        </Draggable>
      ));
    }
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
    for (const production of newOrder) {
      const index = newOrder.findIndex((x) => x._id === production._id);
      await axios.patch(`/cv/resume/production/${production._id}`, {
        categoryName: production.categoryName,
        name: production.name,
        company: production.company,
        details: production.details,
        positionId: Number(index + 1),
      });
    }
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
        productionCompany: null,
        productionDetails: [],
        productionName: null,
      });
    }
  }

  onNewProductionSubmit = async (e) => {
    e.preventDefault();
    const productionArr = this.state.productionDetails;

    if (this.state.detail) {
      productionArr.push(this.state.detail);
    }
    const positionId = this.state.newPositionId;
    const upload = await axios.post("/cv/resume/production", {
      categoryName: this.props.category,
      name: this.state.productionName,
      company: this.state.productionCompany,
      details: productionArr,
      positionId: Number(positionId),
    });

    if (upload.status === 200) {
      const listArray = this.state.list;
      listArray.push(upload.data);
      this.setState({
        list: listArray,
        newInput: false,
      });
    }
  };

  handleProductionNameOnChange(e) {
    this.setState({
      productionName: e.target.value,
    });
  }

  handleProductionCompanyOnChange(e) {
    this.setState({
      productionCompany: e.target.value,
    });
  }

  handleProductionDetailsOnChange(e) {
    this.setState({
      detail: e.target.value,
    });
  }

  addDetailOnClick(e) {
    e.preventDefault();
    const newDetail = this.state.productionDetails;
    newDetail.push(this.state.detail);

    this.setState({
      productionDetails: newDetail,
      detail: null,
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1);
  }

  handleDetailInputChange(e) {
    const prodDetailsArr = this.state.productionDetails;
    const index = Number(
      e.target.name.substring(e.target.name.indexOf("-") + 1) - 1
    );
    prodDetailsArr[index] = e.target.value;

    this.setState({
      productionDetails: prodDetailsArr,
    });
  }

  handleInputRemoval(e) {
    e.preventDefault();
    const productionArr = this.state.productionDetails;
    const target = productionArr[e.target.name];
    const newArr = productionArr.filter((arr) => arr !== target);
    this.setState({
      productionDetails: newArr,
    });
  }

  renderDetailInputs() {
    const list = this.state.productionDetails;
    if (list.length > 0) {
      return list.map((input, index) => (
        <div>
          <input
            key={index}
            type="text"
            name={`detail-${index + 1}`}
            onChange={(e) => this.handleDetailInputChange(e)}
            defaultValue={input}
          />
          <button onClick={(e) => this.handleInputRemoval(e)} name={index}>
            Remove
          </button>
        </div>
      ));
    }
  }

  renderNewInput() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.newInput) {
      return (
        <div className="new-production-form">
          <form onSubmit={(e) => this.onNewProductionSubmit(e)}>
            <br />
            <label>Production Name:</label>
            <br />
            <input
              type="text"
              name="productionName"
              onChange={(e) => this.handleProductionNameOnChange(e)}
              defaultValue={this.state.productionName}
            />
            <br />
            <label>Production Company:</label>
            <br />
            <input
              type="text"
              name="productionCompany"
              onChange={(e) => this.handleProductionCompanyOnChange(e)}
              defaultValue={this.state.productionCompany}
            />
            <br />
            <label>Production Details:</label>
            <br />
            {this.renderDetailInputs()}
            <input
              type="text"
              name={`productionDetail${
                this.state.productionDetails.length + 1
              }`}
              onChange={(e) => this.handleProductionDetailsOnChange(e)}
              defaultValue=""
            />
            <div className="new-production-buttons">
              <button
                className="submit-button"
                onClick={(e) => this.addDetailOnClick(e)}
              >
                Add Detail
              </button>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
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
            <div
              className="resume-drag-drop"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.renderList()}
              {provided.placeholder}
              <div className="new-production">
                <button
                  onClick={(e) => this.onNewButtonClick(e)}
                  className="new-production-button"
                >
                  {this.state.newInput ? "Cancel" : "New Production"}
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
      <div className="production-card-list">
        {this.renderDragDrop()}
        <div className="video-submit-buttons">
          <button className="submit-button" onClick={this.uploadNewOrder}>
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

export default ProductionCardList;
