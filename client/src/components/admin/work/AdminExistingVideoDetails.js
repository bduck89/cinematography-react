import React from 'react';
import AdminMenu from '../../frames/admin/AdminMenu';
import VideoDetailsForm from '../../frames/admin/work/VideoDetailsForm';
import axios from 'axios';

class AdminExistingVideoDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            initialTitle: '',
            backgroundImage: '',
            videoTitle: 'Video Title',
            videoDescription: 'Video Description',
            videoLink: '',
            videoId: ''
        }
        this.videoTitleOnChangeHandler = this.videoTitleOnChangeHandler.bind(this);
        this.videoDescriptionOnChangeHandler = this.videoDescriptionOnChangeHandler.bind(this);
        this.videoLinkOnChangeHandler= this.videoLinkOnChangeHandler.bind(this);
        this.videoThumbnailOnChangeHandler = this.videoThumbnailOnChangeHandler.bind(this);
    }
    
    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        const response = await axios.get(`/video/work/${this.props.match.params.videoId}`)
        if(response){
            this.setState({
                initialTitle: response.data.videoTitle,
                backgroundImage: response.data.thumbnail,
                videoTitle: response.data.videoTitle,
                videoDescription: response.data.videoDescription,
                videoLink: response.data.videoLink,
                videoId: response.data._id
            })
        }
    }

    videoTitleOnChangeHandler(e){
        this.setState({videoTitle: e})
    }

    videoDescriptionOnChangeHandler(e){
        this.setState({videoDescription: e})
    }

    videoLinkOnChangeHandler(e){
        this.setState({videoLink: e})
    }

    videoThumbnailOnChangeHandler(e){
        this.setState({backgroundImage: e})
    }

    render(){
        return (
            <div>
                <AdminMenu />
                <VideoDetailsForm
                    emptyForm={false}
                    formTitle={`${this.state.initialTitle} Video Details`}
                    onVideoTitleOnChange={this.videoTitleOnChangeHandler}    
                    onVideoDescriptionOnChange={this.videoDescriptionOnChangeHandler}
                    onVideoLinkOnChange={this.videoLinkOnChangeHandler} 
                    onVideoThumbnailOnChange={this.videoThumbnailOnChangeHandler}
                    backgroundImage={this.state.backgroundImage}
                    videoTitle={this.state.videoTitle}
                    videoDescription={this.state.videoDescription}
                    videoLink={this.state.videoLink}
                    videoId={this.state.videoId}
                    existingVideo
                />
            </div>
        )
    }
}

export default AdminExistingVideoDetails;

// videoId={this.props.videoId}