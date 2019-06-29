import React, { Component } from "react";
import axios from "axios";
import { Form, Icon, Input, Button } from 'antd';


class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          encryptedPassword: "",
          message: null,
        };
    }

    genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("this.state")
        console.log(this.state)
        axios.post(
            "http://localhost:3001/api/login",
            this.state,
            { withCredentials: true } // FORCE axios to send cookies across domains
        )
        .then(response => {
            console.log("Login Page", response.data);
            const { userDoc } = response.data;
            // send "userDoc" to the App.js function that changes "currentUser"
            this.props.onUserChange(userDoc);
            alert('Logged in successfully!');
        })
        .catch(err => {
            console.log("error", err)
            if (err.response && err.response.data) {
              // console.error("API response", err.response.data)
              return  this.setState({ message: err.response.data.message }) 
            }
        });
    }
    render(){
        return(
            <section className="LoginPage">
                <h2>Log In</h2>

                {/* <Form onSubmit={event => this.handleSubmit(event)}> */}
                <Form>
                    <Form.Item>    
                        <label> Email:  </label>
                        <Input 
                            value={this.state.email}
                            name="email"
                            onChange={event => this.genericSync(event)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="superstar@ironhack.com" 
                            />
                    </Form.Item>

                    <Form.Item>
                        <label> Password: </label>
                        <Input 
                            name="encryptedPassword"
                            value={this.state.encryptedPassword}
                            onChange={event => this.genericSync(event)}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit}>Log In</Button>
                    </Form.Item>
                </Form>
                { this.state.message && <div> { this.state.message } </div> }
            </section>
        );
    }




}

export default Login;