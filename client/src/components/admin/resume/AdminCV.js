import React from 'react';
import axios from 'axios';
import AdminMenu from '../../frames/admin/AdminMenu';

class AdminCV extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            selectedFile: null,
            loaded: null,
            uploadedFileName: null,
            uploaded: false
        };
    }

    onChangeHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    }

    onClickHandler = async() => {
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        const response = await axios.post('/upload/file', data);

        this.setState({uploadedFileName: response.data.filename})

        const upload = await axios.post('/cv/upload', {uniqueFileName: this.state.uploadedFileName});

        if(upload.data.uniqueFileName){
            this.setState({uploaded: true})
        }; 
    }

    render(){
        return (
            <div>
                <AdminMenu />
                <label>Admin CV</label>
                <input 
                    type="file" 
                    name="file"
                    onChange={this.onChangeHandler}
                />
                <button 
                    type="button"
                    onClick={this.onClickHandler}
                >Submit</button>
            </div>
        )
    }
}

export default AdminCV;