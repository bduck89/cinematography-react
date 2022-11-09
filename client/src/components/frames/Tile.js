import '../../css/frames/work/tile.css'
import React from 'react';
import { Link } from 'react-router-dom';

class Tile extends React.Component {
    loadThumbnailImage(){
        if(this.props.backgroundImage !== ''){
            return `url("${this.props.backgroundImage}")`
        }

        return
    }

    ifALink(){
        if(this.props.isLink){
            return (
                <Link to={`/work/video/${this.props.videoId}`}>
            <div 
                style={{
                    backgroundImage: this.loadThumbnailImage(),
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                }}
                className={this.props.tileStyle}
            >
                <h1 className="tile-title" >{this.props.videoTitle}</h1> 
            </div>
            </Link>
            )
        } else {
            return (
                <div 
                style={{
                    backgroundImage: this.loadThumbnailImage(),
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                }}
                className={this.props.tileStyle}
            >
                <h1 className="tile-title" >{this.props.videoTitle}</h1> 
            </div>
            )
        }
    }

    render(){
        return (
            <div style={{width: '100%'}}>
                {this.ifALink()}
            </div>
        )
    }
}

export default Tile;