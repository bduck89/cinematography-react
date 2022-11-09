import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../../../history';
import axios from 'axios';

class ProductionDelete extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            productionId: null,
            productionName: null
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
        const response = await axios.get(`/cv/resume/production/${this.props.match.params.productionId}`)

        if(response.status === 200){
            this.setState({
                productionId: response.data._id,
                productionName: response.data.name
            })
        }
    }

    deleteProduction = async() => {
        const response = await axios.delete(`/cv/resume/production/${this.state.productionId}`);
        console.log(response.data)
        if(response.status === 200){
            history.push('/admin/admin-resume')
        }
    }

    renderActions(){
        return(
            <React.Fragment>
                <button
                    onClick={(e) => this.deleteProduction(e)}
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
        if(!this.state.productionName){
            return 'Are you sure you want to delete this production?'
        }
        return `Are you sure you want to delete ${this.state.productionName}?`
    }

    render(){
        return (                
            <div className="video-delete">
                <h1>Delete Production</h1>
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

export default ProductionDelete;