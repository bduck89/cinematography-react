import '../css/components/work/work.css';
import React from 'react';
import axios from 'axios';
import TileBoard from './frames/TileBoard';

class Work extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = async() => {
        const response = await axios.get('/main/work');

        this.setState({
            list: response.data,
        })
    }

    render(){
        return (
            <div className="work">
            <h1>Work</h1>
            <TileBoard 
            allTiles={this.state.list}
            rowStyle="preview"
            isLink
            />
            </div>
        )
    }
}

export default Work;