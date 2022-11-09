import React from 'react';
import AdminMenu from '../../frames/admin/AdminMenu';
import VideoDetailsForm from '../../frames/admin/work/VideoDetailsForm';

class AdminNewVideoDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            backgroundImage: '',
            videoTitle: 'Video Title',
            videoDescription: 'Video Description',
            videoLink: '',
            positionId: ''
        }
        this.videoTitleOnChangeHandler = this.videoTitleOnChangeHandler.bind(this);
        this.videoDescriptionOnChangeHandler = this.videoDescriptionOnChangeHandler.bind(this);
        this.videoLinkOnChangeHandler= this.videoLinkOnChangeHandler.bind(this);
        this.videoThumbnailOnChangeHandler = this.videoThumbnailOnChangeHandler.bind(this);
    }
    
    componentDidMount(){
        const positionId = this.props.match.params.positionId
        this.setState({
            positionId: positionId
        });
    };

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
            <div className="new-video-details">
                <AdminMenu />
                <VideoDetailsForm
                    emptyForm
                    formTitle="New Video Details"
                    onVideoTitleOnChange={this.videoTitleOnChangeHandler}    
                    onVideoDescriptionOnChange={this.videoDescriptionOnChangeHandler}
                    onVideoLinkOnChange={this.videoLinkOnChangeHandler} 
                    onVideoThumbnailOnChange={this.videoThumbnailOnChangeHandler}
                    backgroundImage={this.state.backgroundImage}
                    videoTitle={this.state.videoTitle}
                    videoDescription={this.state.videoDescription}
                    videoLink={this.state.videoLink}
                    positionId={this.state.positionId}
                />
            </div>
        )
    }
}

export default AdminNewVideoDetails;