import React from 'react';
import axios from 'axios';
import history from '../../../../history';
import {Link} from 'react-router-dom';

class IconDelete extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            iconId: null,
            iconName: null
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
        const response = await axios.get(`/contact/icons/${this.props.match.params.iconId}`)

        if(response.status === 200){
            this.setState({
                iconId: response.data._id,
                iconName: response.data.name
            })
        }
    }

    deleteProduction = async() => {
        const response = await axios.delete(`/contact/icons/${this.state.iconId}`);
        console.log(response.data)
        if(response.status === 200){
            history.push('/admin/admin-contact')
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
                <Link to='/admin/admin-contact'>
                    <button className="video-delete-cancel">Cancel</button>
                </Link>
            </React.Fragment>
        )
    }

    renderContent(){
        if(!this.state.iconName){
            return 'Are you sure you want to delete this icon?'
        }
        return `Are you sure you want to delete ${this.state.iconName} Icon?`
    }

    render(){
        return (                
            <div className="video-delete">
                <h1>Delete Icon</h1>
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

export default IconDelete;