import React from "react";
import axios from "axios";
import AdminMenu from "../../frames/admin/AdminMenu";
import AdminVideoDetailsList from "./AdminVideoDetailsList";
import history from "../../../history";

class AdminWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await axios.get("/video/work");

    if (response.data === "Not Authorised") {
      history.push("/");
    } else if (response.status === 200) {
      this.setState({
        data: response.data,
      });
    }
  };

  render() {
    return (
      <div>
        <AdminMenu />
        <AdminVideoDetailsList {...this.state} />
      </div>
    );
  }
}

export default AdminWork;
