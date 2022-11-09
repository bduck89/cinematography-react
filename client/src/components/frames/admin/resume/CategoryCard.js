import React from 'react';
import ProductionCardList from './ProductionCardList';
import { Link } from 'react-router-dom';

class CategoryCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            categoryName: null,
        }
    }

    componentDidMount(){
        this.setState({
            categoryName: this.props.card.name
        })
    }

    handleCategoryNameOnChange(e) {
        this.setState({
          categoryName: e.target.value,
        });
      }

    renderEditForm(){
        if(this.state.edit){
            return (
                <form onSubmit={(e) => this.onEditCategorySubmit(e)}>
            <label>Category Name:</label>
            <input
              type="text"
              name="categoryName"
              onChange={(e) => this.handleCategoryNameOnChange(e)}
              defaultValue={this.state.categoryName}
            />
            <button type="submit">Submit</button>
          </form>
            )
        }
    }

    renderEdit(){
        if(!this.state.edit){
            this.setState({
                edit: true,
            })
        } else {
            this.setState({
                edit: false
            })
        }
    }

    render(){
        return (
            <div className='category-card'>
                <div className="category-card-details">
                <div>
                    <h3>{this.state.categoryName}</h3>
                </div>
                <div>
                    <button onClick={(e) => this.renderEdit(e)} 
                    className='submit-button'>
                        {this.state.edit ? 'Cancel' : 'Edit'}
                    </button>
                    <Link to={`/admin/resume/category/delete/${this.props.card._id}`}>
                    <button className='delete-button'>
                        Delete
                    </button>
                    </Link>
                </div>
                {this.renderEditForm()}
                </div>
                <ProductionCardList 
                    productions={this.props.productions}
                    category={this.props.card.name}
                />
            </div>
        )
    }
}

export default CategoryCard;