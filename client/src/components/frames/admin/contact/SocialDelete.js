import React from 'react';
import axios from 'axios';
import history from '../../../../history';
import {Link} from 'react-router-dom';

class SocialDelete extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            socialId: null,
            socialName: null
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
        const response = await axios.get(`/contact/social/${this.props.match.params.socialId}`)

        if(response.status === 200){
            this.setState({
                socialId: response.data._id,
                socialName: response.data.name
            })
        }
    }

    deleteProduction = async() => {
        const response = await axios.delete(`/contact/social/${this.state.socialId}`);
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
        if(!this.state.socialName){
            return 'Are you sure you want to delete this icon?'
        }
        return `Are you sure you want to delete ${this.state.socialName} Icon?`
    }

    render(){
        return (                
            <div className="video-delete">
                <h1>Delete Social</h1>
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

export default SocialDelete;