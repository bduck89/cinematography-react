import React from 'react';
import CategoryCard from './CategoryCard';

class CategoryList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            categories: [],
            productions: [],
        }
    }

    componentDidMount(){
        this.setState({
            categories: this.props.categories,
            productions: this.props.productions
        })
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.setState({
                categories: this.props.categories,
                productions: this.props.productions
            })
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

    renderCategoriesList(){
        if(this.state.categories){
            return this.state.categories.map(card => (
                <CategoryCard 
                card={card}
                key={card._id}
                productions={this.sortProductions(card.name)}
                />
                ))
        }
    }

    render(){
        return (
            <div style={{width: '100%'}}>
                {this.renderCategoriesList()}
            </div>
        )
    }
}

export default CategoryList;