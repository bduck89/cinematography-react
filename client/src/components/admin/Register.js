import "../../css/components/admin/register.css";
import React from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../../history";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { adminPasswordWrong: false };
  }

  registerSubmit = async (values) => {
    const formData = await axios.post("/api/register", values);

    if (formData.data === "Failed") {
      this.setState({ adminPasswordWrong: true });
      console.log(this.state.adminPasswordWrong);
    } else if (formData.status === 201){
      history.push("/admin/login");
    } else {
      console.log(formData.data);
    }
  };

  render() {
    return (
      <div className="admin-register">
        <h1>Register</h1>
        <Form
          onSubmit={this.registerSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            if (!values.userPassword) {
              errors.userPassword = "Required";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            } else if (values.confirmPassword !== values.userPassword) {
              errors.confirmPassword = "Must match";
            }
            if (!values.adminPassword) {
              errors.adminPassword = "Required";
            }
            return errors;
          }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className="register-form">
              <div>
                <Field name="username">
                  {({ input, meta }) => (
                    <div>
                      <label>Username:</label>
                      <br />
                      <input
                        {...input}
                        type="text"
                        placeholder="Insert Username..."
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <Field name="userPassword">
                  {({ input, meta }) => (
                    <div>
                      <label>Password:</label>
                      <br />
                      <input
                        {...input}
                        type="password"
                        placeholder="Insert Password..."
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                      
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <Field name="confirmPassword">
                  {({ input, meta }) => (
                    <div>
                      <label>Confirm Password:</label>
                      <br />
                      <input
                        {...input}
                        type="password"
                        placeholder="Confirm Password..."
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <Field name="adminPassword">
                  {({ input, meta }) => (
                    <div>
                      <label>Admin Password:</label>
                      <br />
                      <input
                        {...input}
                        type="password"
                        placeholder="Admin Password..."
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="admin-register-buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Register
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
                <Link to="/">
                  <button type="button">Cancel</button>
                </Link>
              </div>
            </form>
          )}
        />
        <div className="admin-failed-password">
          {this.state.adminPasswordWrong
            ? "You have entered the wrong admin password!"
            : ""}
        </div>
      </div>
    );
  }
}

export default Register;
