import '../../css/components/admin/login.css';
import React from "react";
import { Form, Field } from "react-final-form";
import {Link} from "react-router-dom";
import axios from 'axios';
import history from '../../history';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {failedLogin: false}
    }

    submitLogin = async(values) => {
        const formData = await axios.post('/api/login', values)

        if(formData.data === 'Login Success'){
            history.push('/admin/dashboard')
        } else {
            this.setState({failedLogin: true})
        }
    }

    render(){
        return (
            <div className="admin-login">
                <h1>Login</h1>
                <Form 
                onSubmit={this.submitLogin}
                validate={(values) => {
                    const errors={};
                    if(!values.username){
                        errors.username = "Required";
                    }
                    if(!values.userPassword){
                        errors.userPassword = "Required";
                    }
                    return errors;
                }}
                render={({ handleSubmit, form, submitting, pristine}) => (
                    <form 
                    onSubmit={handleSubmit}
                    className="login-form">
                        <div>
                            <Field 
                                name="username"
                            >
                            {({input, meta}) => (
                                <div>
                                    <label>Username:</label>
                                    <br />
                                    <input 
                                        {...input}
                                        type="text"
                                        placeholder="Insert Username..."
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    <br />
                                </div>
                            )}
                            </Field>
                            <Field
                                name="userPassword"
                            >
                            {({input, meta}) => (
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
                        <div className="admin-login-buttons">
                            <button type="submit" disabled={submitting || pristine}>Login</button>
                            <button type="button" disabled={submitting || pristine} onClick={form.reset}>Reset</button>
                            <Link to="/">
                                <button type="button">Cancel</button>
                            </Link>
                        </div>
                    </form>
                )}
                />
                <div>
                    {this.state.failedLogin ? 'You have entered a wrong username or password': ''}
                </div>
            </div>
        )
    }
}

export default Login;