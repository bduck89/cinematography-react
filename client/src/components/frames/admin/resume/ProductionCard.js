import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class ProductionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      detail: "",
      productionDetails: [],
      edit: false,
      loading: false,
      productionName: "",
      productionCompany: "",
      delete: false,
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.card,
      productionDetails: this.props.card.details,
      productionName: this.props.card.name,
      productionCompany: this.props.card.company,
    });
  }

  renderList() {
    const list = this.state.productionDetails;

    if (list) {
      return list.map((detail, index) => {
        return <h4 key={index}>{detail}</h4>;
      });
    }
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

  renderDetailInputs() {
    const list = this.state.productionDetails;
    if (list.length > 0) {
      return list.map((input, index) => (
        <div key={index}>
          <input
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

  onEditProductionSubmit = async (e) => {
    e.preventDefault();
    const productionArr = this.state.productionDetails;
    if (this.state.detail) {
      productionArr.push(this.state.detail);
    }
    const upload = await axios.patch(
      `/cv/resume/production/${this.props.card._id}`,
      {
        categoryName: this.props.card.category,
        name: this.state.productionName,
        company: this.state.productionCompany,
        details: productionArr,
        positionId: this.props.card.positionId,
      }
    );

    if (upload.status === 200) {
      this.setState({
        edit: false,
        productionDetails: productionArr,
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

  renderEdit() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.edit) {
      return (
        <div className="new-production-form">
          <form onSubmit={(e) => this.onEditProductionSubmit(e)}>
            <label>Production Name:</label>
            <br/>
            <input
              type="text"
              name="productionName"
              onChange={(e) => this.handleProductionNameOnChange(e)}
              defaultValue={this.state.productionName}
            />
            <br/>
            <label>Production Company:</label>
            <br/>
            <input
              type="text"
              name="productionCompany"
              onChange={(e) => this.handleProductionCompanyOnChange(e)}
              defaultValue={this.state.productionCompany}
            />
            <br/>
            <label>Production Details:</label>
            <br/>
            {this.renderDetailInputs()}
            <input
              type="text"
              name={`productionDetail${
                this.state.productionDetails.length + 1
              }`}
              onChange={(e) => this.handleProductionDetailsOnChange(e)}
              defaultValue=""
            />
            <div className="edit-production-buttons">
            <button 
            className="submit-button"
            onClick={(e) => this.addDetailOnClick(e)}>
              Add Detail
            </button>
            <button 
            className="submit-button"
            type="submit">Submit</button>
            </div>
          </form>
        </div>
      );
    }
  }

  renderEditOnClick() {
    if (!this.state.edit) {
      this.setState({
        edit: true,
      });
    } else {
      this.setState({
        edit: false,
        productionName: this.state.data.name,
        productionCompany: this.state.data.company,
        productionDetails: this.state.data.details,
      });
    }
  }

  render() {
    return (
      <div className="admin-production-card">
        <div className="production-card-details">
          <div style={{width: "33%"}}>
        <h4>{this.state.productionName}</h4>
          </div>
          <div style={{width: "33%"}}>
        <h4>{this.state.productionCompany}</h4>
          </div>
        <div className="production-detail-list">
        {this.renderList()}
        </div>
        </div>
        <div>
          <button onClick={(e) => this.renderEditOnClick(e)} className="submit-button">
            {this.state.edit ? "Cancel" : " Edit"}
          </button>
          <Link to={`/admin/resume/production/delete/${this.props.card._id}`}>
            <button className="delete-button">Delete</button>
          </Link>
        </div>
        {this.renderEdit()}
      </div>
    );
  }
}

export default ProductionCard;
