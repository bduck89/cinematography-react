import "../css/components/resume/resume.css";
import React from "react";
import axios from "axios";
import CategoryList from "./frames/resume/CategoryList";
import { ExternalLink } from "react-external-link";

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      productionList: [],
      cv: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.getCategories();
    this.getProductions();
    this.getCv();
  }

  getCategories = async () => {
    const response = await axios.get("/main/resume/category");

    if (response.status === 200) {
      this.setState({
        categoryList: response.data,
      });
    }
  };

  getProductions = async () => {
    const response = await axios.get("/main/resume/production");

    if (response.status === 200) {
      this.setState({
        productionList: response.data,
      });
    }
  };

  getCv = async () => {
    const response = await axios.get("/main/cv");

    if (response.status === 200 && response.data.length !== 0) {
      this.setState({
        cv: response.data[response.data.length - 1],
      });
    }
  };

  cvDownload() {
    if (this.state.cv !== null) {
      return this.state.cv.url;
    }
  }

  render() {
    return (
      <div className="resume">
        <h1>Resum&#233;</h1>
        <div className="cv-download-wrapper-1">
          <ExternalLink href={this.cvDownload()} className="cv-download">
            <h3>Download CV</h3>
          </ExternalLink>
        </div>
        <CategoryList
          categories={this.state.categoryList}
          productions={this.state.productionList}
        />
        <div className="end-spacer"></div>
        <div className="cv-download-wrapper-2">
          <ExternalLink href={this.cvDownload()} className="cv-download">
            <h3>Download CV</h3>
          </ExternalLink>
        </div>
      </div>
    );
  }
}

export default Resume;
