import '../../../css/frames/resume/productionCard.css';
import React from "react";

class ProductionCard extends React.Component {
    renderDetails(){
    return this.props.production.details.map((detail, index) => (
        
            <h4 key={index}>{detail}</h4>
        ))
    }

    render(){
        return (
            <div className="production-card">
                <div className="production-card-column"><h4>{this.props.production.name}</h4></div>
                <div className="production-card-column"><h4>{this.props.production.company}</h4></div>
                <div className="production-card-column-detail-list">
                {this.renderDetails()}
                </div>
            </div>
        )
    }
}

export default ProductionCard;