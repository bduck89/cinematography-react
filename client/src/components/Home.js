import '../css/components/home/home.css';
import '../css/frames/video/reactplayer.css';
import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player/vimeo';

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            videoLink: []
        }
    }

    componentDidMount(){
        this.getVideoLink()
    }

    getVideoLink = async() => {
        const videoLink = await axios.get('/main/home');
            return this.setState({videoLink: videoLink.data[0].vimeoLink})
    }

    render(){
        return (
            <div className="home-div">
                <div className="show-reel-wrapper">
                    <ReactPlayer 
                    className="show-reel" 
                    url={this.state.videoLink}
                    volume={1}
                    muted={false}
                    playing={false}
                    loop={false}
                    controls={true}
                    width="100%"
                    height="100%"
                    />
               </div>
            </div>
        )
    }
};

export default Home;

