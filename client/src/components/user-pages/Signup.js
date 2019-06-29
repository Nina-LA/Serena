import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            // these are req.body.name of each input field in the form
            username: "",
            email: "",
            encryptedPassword:"",
            message: null,
        }
    }
// 🎯 you can reuse this for every React form
genericSync = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]:value });
}


handleSubmit = event => {
    event.preventDefault();
    // console.log("username", this.state.username)
    // console.log("email", this.state.email)
    // console.log("encryptedPassword", this.state.encryptedPassword)

    axios.post(
        "http://localhost:3001/api/signup", // 1st and mandatory: which route I'm hitting in the backend
        this.state, // 2nd and mandatory: what I'm sending (since it's POST route I have to send something)
        { withCredentials:true } // 3rd and optional: credentials:true in CORS
    )
    .then( responseFromServer => {
        console.log("response is line 37: ", responseFromServer);
        const { userDoc } = responseFromServer.data;
        this.props.onUserChange(userDoc);
    } )
    .catch(err => {
        console.log("error while signup: ", err);
        if(err.response && err.response.data){
            return this.setState({ message:err.response.data.message });
        }
    })
}

render(){
    if(this.props.currentUser){
        return(
            <section>
                <h2> You are signed up! </h2>
                <p> Welcome, { this.props.currentUser.fullName }! 
                    Your email is: <b> { this.props.currentUser.email } 🙈 </b>
                </p>
            </section>
        )
    }

    return (
         <section>
            <h2> Sign Up </h2>
            
            {/* <Form onSubmit={ event => this.handleSubmit(event) } > */}
            <Form>
                <Form.Item>
                <label> Username:  </label>
                <Input
                    value = { this.state.username }
                    name="username"
                    onChange={ event => this.genericSync(event) }
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />
                </Form.Item>
                <Form.Item>
                <label> Email:  </label>
                    <Input
                        name="email"
                        value = { this.state.email }
                        onChange={ event => this.genericSync(event) }
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="superstar@ironhack.com"
                        />
                 </Form.Item>
                 <Form.Item>
                    <label> Password:  </label>
                    <Input
                        name="encryptedPassword"
                        value = { this.state.encryptedPassword }
                        onChange={ event => this.genericSync(event) }
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                <Button type="primary" onClick={this.handleSubmit}> Sign Up </Button>
                </Form.Item>
            </Form>
            {/* if the message is not NULL then show the message */}
            { this.state.message && <div> { this.state.message } </div> }
            <div className= "account">
                <p>Already have account?</p>
                <Link to={"/login-page"}> Login</Link>
            </div>
        </section>
    )
}




}

export default Signup;