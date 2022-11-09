import '../../css/frames/topnav.css';
import React from "react";
import {Link} from 'react-router-dom';

class TopNav extends React.Component{
    render(){
        return(
            <div className="top-nav">
                <div className="top-nav-logo">
                    <Link to="/">
                    <div className="top-nav-logo-name">
                        <div>
                            <strong>ANCA</strong>
                        </div>
                        <div>
                            <strong>BADITA</strong>
                        </div>
                    </div>
                    <div className="top-nav-logo-cinema">
                        <strong>CINEMATOGRAPHER</strong>
                    </div>
                    </Link>
                </div>
                <div className="top-nav-menu">
                    <div className="top-nav-menu-link">
                        <Link to="/work">
                            <strong>Work</strong>
                        </Link>
                    </div>
                    <div className="top-nav-menu-link">
                        <Link to="/resume">
                            <strong>Resum&#233;</strong>
                        </Link>
                    </div>
                    <div className="top-nav-menu-link-end">
                        <Link to="/contacts">
                            <strong>Contact</strong>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default TopNav;