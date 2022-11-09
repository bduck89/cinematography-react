import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../../../history';
import axios from 'axios';

class VideoDelete extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            videoId: null,
            videoTitle: null
        }
        this.deleteVideo = this.deleteVideo.bind(this)
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
        const response = await axios.get(`/video/work/${this.props.match.params.videoId}`)

        if(response.status === 200){
            this.setState({
                videoId: response.data._id,
                videoTitle: response.data.videoTitle
            })
        }
    }


    deleteVideo = async() => {
        const response = await axios.delete(`/video/work/${this.state.videoId}`);

        if(response.status === 200){
            history.push('/admin/work/videos')
        }
    }

    renderActions(){
        return(
            <React.Fragment>
                <button
                    onClick={(e) => this.deleteVideo(e)}
                    className="video-delete-button"
                >
                    Delete
                </button>
                <Link to='/admin/work/videos'>
                    <button
                        className="video-delete-cancel"
                    >Cancel</button>
                </Link>
            </React.Fragment>
        )
    }

    renderContent(){
        if(!this.state.videoTitle){
            return 'Are you sure you want to delete this video?'
        }
        return `Are you sure you want to delete ${this.state.videoTitle}?`
    }

    render(){
        return (                
            <div className="video-delete">
                <h1>Delete Video</h1>
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

export default VideoDelete;