import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TopNav from "./frames/TopNav";
import Home from "./Home";
import Work from "./Work";
import Video from "./Video";
import Resume from "./Resume";
import Contact from "./Contact";
import history from "../history";
import Register from "./admin/Register";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import AdminHome from "./admin/home/AdminHome";
import AdminContact from "./admin/contact/AdminContact";
import AdminWork from "./admin/work/AdminWork";
import AdminResume from "./admin/resume/AdminResume";
import AdminNewVideoDetails from "./admin/work/AdminNewVideoDetails";
import AdminCV from "./admin/resume/AdminCV";
import AdminExistingVideoDetails from "./admin/work/AdminExistingVideoDetails";
import VideoDelete from "./frames/admin/work/VideoDelete";
import ProductionDelete from "./frames/admin/resume/ProductionDelete";
import CategoryDelete from "./frames/admin/resume/CategoryDelete";
import IconDelete from "./frames/admin/contact/IconDelete";
import SocialDelete from "./frames/admin/contact/SocialDelete";
import ContactDelete from "./frames/admin/contact/ContactDelete";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <TopNav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/work" exact component={Work} />
            <Route path="/work/video/:videoId" component={Video} />
            <Route path="/resume" exact component={Resume} />
            <Route path="/contacts" component={Contact} />
            <Route path="/admin/register" component={Register} />
            <Route path="/admin/login" component={Login} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/admin-home" component={AdminHome} />
            <Route exact path="/admin/work/videos" component={AdminWork} />
            <Route
              exact
              path="/admin/work/new-video-details/:positionId"
              component={AdminNewVideoDetails}
            />
            <Route
              path="/admin/work/existing/:videoId"
              component={AdminExistingVideoDetails}
            />
            <Route
              exact
              path="/admin/work/delete/:videoId"
              component={VideoDelete}
            />
            <Route path="/admin/admin-contact" component={AdminContact} />
            <Route exact path="/admin/admin-resume" component={AdminResume} />
            <Route
              path="/admin/resume/category/delete/:categoryId"
              component={CategoryDelete}
            />
            <Route
              path="/admin/resume/production/delete/:productionId"
              component={ProductionDelete}
            />
            <Route path="/admin/admin-resume/cv" component={AdminCV} />
            <Route path="/admin/icon/delete/:iconId" component={IconDelete} />
            <Route
              path="/admin/social/delete/:socialId"
              component={SocialDelete}
            />
            <Route
              path="/admin/contact/delete/:contactId"
              component={ContactDelete}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
