import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import VideoDetailsCard from '../../frames/admin/work/VideoDetailsCard';
import TileBoardPreview from '../../frames/admin/work/TileBoardPreview';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import history from '../../../history';



class AdminVideoDetailsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        this.setState({
            list: this.props.data
        })
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.setState({
                list: this.props.data
            })
        }
    }

    renderList(){
        const list = this.state.list
        return list.map((card, index) => (
                <Draggable 
                    draggableId={card._id} 
                    index={index}
                    key={card._id}
                    >
                    {(provided) => (
                        <div 
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{...provided.draggableProps.style}}
                        >
                            <VideoDetailsCard
                                card={card}
                                cardIndex={index}
                                listLength={list.length}
                            />
                        </div>   
                    
                    )}
                </Draggable>
            )
        )   
    }

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const newList = this.state.list;
        const [removed] = newList.splice(result.source.index, 1);
        newList.splice(result.destination.index, 0, removed);
        this.setState({list: newList});
    }

    uploadNewOrder = async() => {
        const newOrder = this.state.list;
        for(const video of newOrder){
            const index = newOrder.findIndex(x => x._id === video._id)
            await axios.patch(`/video/work/${video._id}`, {
                thumbnail: video.thumbnail,
                videoTitle: video.videoTitle,
                videoDescription: video.videoDescription,
                videoLink: video.videoLink,
                positionId: index + 1
            })
        }
        history.push('/admin/dashboard')
    }

    renderDragDrop(){
        return(
            <DragDropContext 
                onDragEnd={this.onDragEnd}
            >
                <Droppable 
                    droppableId="videoList"
                >
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.renderList()}
                            {provided.placeholder}
                            <div className="new-video-details-card">
                                <Link to={`/admin/work/new-video-details/${this.state.list.length + 1}`} >
                                    <button className="video-list-new-button">New Video</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
    
    render(){
        return (
            <div>
                <div className="video-list">    
                    <Link to={`/admin/work/new-video-details/${this.state.list.length + 1}`} >
                        <button
                            className="video-list-new-button">New Video
                        </button>
                    </Link>
                    <div>
                        {this.renderDragDrop()}
                        <div className="video-submit-buttons">
                            <button
                                className="submit-button"
                                onClick={this.uploadNewOrder}
                            >Submit</button>
                            <Link to='/admin/dashboard'>
                                <button
                                className="cancel-button"
                                >Cancel</button>
                            </Link>
                        </div>
                    </div>   
                </div>
                <TileBoardPreview 
                    {...this.state}
                />
            </div>
        )
    }
}

export default AdminVideoDetailsList;