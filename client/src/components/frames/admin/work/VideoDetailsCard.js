import React from 'react';
import { Link } from 'react-router-dom';

class VideoDetailsCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            card: {},
            cardIndex: '',

        }
    }

    componentDidMount(){
        this.setState({
            card: this.props.card,
            cardIndex: this.props.cardIndex
        })
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.setState({
                card: this.props.card,
                cardIndex: this.props.cardIndex
            })
        }
    }

    mainTile(){
        if(this.state.cardIndex % 3 === 0){
            return (
                <div>
                    Main Tile
                </div>
            )
        } else if ((this.state.cardIndex - 1) % 3 === 0){
            return (
                <div>
                    Right Upper Tile
                </div>
            )
        } else if ((this.state.cardIndex - 2) % 3 === 0){
            return (
                <div>
                    Right Lower Tile
                </div>
            )
        }
    }

    render(){
        return (
            <div className="video-detail-card">
                <div 
                    className="video-detail-card-image"
                >
                    <img 
                        alt={this.state.card.videoDescription}
                        src={this.state.card.thumbnail}
                    />
                </div>
                <div>
                    <h3>{this.state.card.videoTitle}</h3>
                </div>
                <div>
                    <label>Tile Position:</label>
                    <p>{this.state.cardIndex + 1}</p>
                    {this.mainTile()}
                </div>
                <div className="video-detail-card-buttons">
                    <Link to={`/admin/work/existing/${this.state.card._id}`} >
                        <button
                            className="video-detail-card-edit-button">Edit</button>
                    </Link>
                    <Link to={`/admin/work/delete/${this.state.card._id}`} >
                        <button 
                            className="video-detail-card-delete-button"
                            >Delete</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default VideoDetailsCard;