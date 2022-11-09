import axios from "axios";
import React from "react";
import history from "../../../history";
import AdminMenu from "../../frames/admin/AdminMenu";
import CategoryCardList from "../../frames/admin/resume/CategoryCardList";
import CVDownload from "../../frames/admin/resume/CVDownload";

class AdminResume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      productions: [],
    };
  }

  componentDidMount() {
    this.getCategories();
    this.getProductions();
  }

  getCategories = async () => {
    const response = await axios.get("/cv/resume/category");
    if (response.data === "Not Authorised") {
      history.push("/");
    } else if (response.status === 200) {
      this.setState({
        categories: response.data,
      });
    }
  };

  getProductions = async () => {
    const response = await axios.get("/cv/resume/production");
    if(response.data === 'Not Authorised'){
        history.push('/');
    }else if (response.status === 200) {
      this.setState({
        productions: response.data,
      });
    }
  };

  render() {
    return (
      <div className="resume">
        <AdminMenu />
        <h1>Resume</h1>
        <CategoryCardList
          categories={this.state.categories}
          productions={this.state.productions}
        />
        <CVDownload />
      </div>
    );
  }
}

export default AdminResume;
