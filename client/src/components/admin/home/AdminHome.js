import '../../../css/components/admin/home/admin-home.css';
import React from 'react';
import {Link} from 'react-router-dom';
import AdminMenu from '../../frames/admin/AdminMenu';
import axios from 'axios';
import history from '../../../history';
import ReactPlayer from 'react-player';

class AdminHome extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            initialVimeoLink: null,
            vimeoLink: '',
            sameVimeoLink: false,
            initialVimeoLinkId: null
        }
    }

    componentDidMount() {
        this.getInitialValues()
    }

    getInitialValues = async () => {
        const getData = await axios.get('/video/home');
        if(getData.data === 'Not Authorised'){
            history.push('/');
        }else if(getData.data.length !== 0){
            return this.setState({
                vimeoLink: getData.data[0].vimeoLink,
                initialVimeoLink: getData.data[0].vimeoLink,
                initialVimeoLinkId: getData.data[0]._id
            })
        }
    }

    submitShowreel = async(e) => {
        e.preventDefault()
        if(this.state.initialVimeoLink === this.state.vimeoLink){
            history.push('/admin/dashboard')
        } else if (this.state.initialVimeoLink === null){
            await axios.post('/video/home', {
                vimeoLink: this.state.vimeoLink
            })

            history.push('/admin/dashboard')
        } else {
            await axios.patch(`/video/home/${this.state.initialVimeoLinkId}`, {
                vimeoLink: this.state.vimeoLink
            })

            history.push('/admin/dashboard')
        }
    }

    onChangeHandler(e){
        this.setState({vimeoLink: e.target.value})
    }

    render(){
        return (
            <div className="admin-home">
                <AdminMenu />
                <div className="admin-home-form">
                    <h1>Edit Homepage Showreel Video</h1>
                    <form
                        onSubmit={this.submitShowreel}
                    >
                        <div>
                            <label>Link to Vimeo: </label>
                                <input
                                    name="vimeoLink"
                                    type="text"
                                    placeholder="Enter Vimeo Link to video"
                                    onChange={(e) => this.onChangeHandler(e)}
                                    value={this.state.vimeoLink}
                                />
                            <button type="submit">Submit</button>
                            <Link to="/admin/dashboard">
                                <button type="button">Cancel</button>
                            </Link>
                        </div>
                    </form>
                    <div className="home-div">
                        <div className="show-reel-wrapper">
                            <ReactPlayer 
                                    className="show-reel" 
                                    url={this.state.vimeoLink}
                                    volume={1}
                                    muted={true}
                                    playing={false}
                                    loop={true}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome;