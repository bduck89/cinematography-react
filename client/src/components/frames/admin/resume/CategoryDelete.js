import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../../../history';
import axios from 'axios';

class CategoryDelete extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            categoryId: null,
            categoryName: null
        }
    }

    componentDidMount(){
        this.getData();
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.getData();
        }
    }

    getData = async() => {
        const response = await axios.get(`/cv/resume/category/${this.props.match.params.categoryId}`)

        if(response.status === 200){
            this.setState({
                categoryId: response.data._id,
                categoryName: response.data.name
            })
        }
    }

    deleteCategory = async() => {
        const response = await axios.delete(`/cv/resume/category/${this.state.categoryId}`);
        console.log(response.data)
        if(response.status === 200){
            history.push('/admin/admin-resume')
        }
    }

    renderActions(){
        return(
            <React.Fragment>
                <button
                    onClick={(e) => this.deleteCategory(e)}
                    className="video-delete-button"
                >
                    Delete
                </button>
                <Link to='/admin/admin-resume'>
                    <button className="video-delete-cancel">Cancel</button>
                </Link>
            </React.Fragment>
        )
    }

    renderContent(){
        if(!this.state.categoryName){
            return 'Are you sure you want to delete this production?'
        }
        return `Are you sure you want to delete ${this.state.categoryName}?`
    }

    render(){
        return (                
            <div className="video-delete">
                <h1>Delete Category</h1>
                <div>
                {this.renderContent()}
                </div>
                <div>
                {this.renderActions()}
                </div>
            </div>
        )
    }
}

export default CategoryDelete;