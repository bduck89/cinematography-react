import '../../css/components/admin/dashboard/dashboard.css';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import AdminMenu from '../frames/admin/AdminMenu';

class Dashboard extends React.Component {
    componentDidMount(){
        this.getData()
    }

    getData = async() => {
        const response = await axios.get('/api/dashboard')
        console.log(response.data)
        if(response.data === 'Not Authorised'){
            history.push('/')
        }
    }

    render(){
        return (
            <div className="dashboard">
                <AdminMenu />
                <h1>Admin Dashboard </h1>
                <div className="dashboard-buttons-menu">
                    <div className="dashboard-buttons"> 
                        <Link to="/admin/admin-home">
                            <button>Home Page</button> 
                        </Link>
                        <Link to="/admin/work/videos">
                            <button>Work Page</button> 
                        </Link>
                        <Link to="/admin/admin-resume">
                            <button>Resume Page</button> 
                        </Link>
                        <Link to="/admin/admin-contact">
                            <button>Contact Page</button> 
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;