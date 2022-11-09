import '../../../css/frames/resume/categoryCard.css';
import React from "react";
import ProductionCard from "./ProductionCard";

class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
      productions: [],
    };
  }

  componentDidMount() {
    this.setState({
      card: this.props.card,
      productions: this.props.productions,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        card: this.props.card,
        productions: this.props.productions,
      });
    }
  }

  renderProductions() {
    return this.state.productions.map((production) => (
      
        <ProductionCard production={production} key={production._id}/>
      
    ));
  }

  ifNoProductions() {
    if (this.state.productions.length !== 0) {
      return (
        <div className="category-list">
          <div>
            <h2>{this.state.card.name}</h2>
          </div>
          <div className="production-column-titles">
            <div className="production-column">
              <h3>Production Name</h3>
            </div>
            <div className="production-column">
                  <h3>Production Company</h3>
            </div>
            <div className="production-column">
                  <h3>Production Details</h3>
            </div>
          </div>
          {this.renderProductions()}
        </div>
      );
    }
  }

  render() {
    return <div className="resume-list">{this.ifNoProductions()}</div>;
  }
}

export default CategoryCard;
