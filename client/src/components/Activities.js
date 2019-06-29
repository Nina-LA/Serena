import React, { Component } from "react";
import axios from "axios";
import { Select } from 'antd';
import {Button} from 'antd';
import { Input, DatePicker } from 'antd';

const { Option } = Select;

class Activities extends Component {
    state = {
        categories: ["A l'extérieur", "A l'intérieur", "Mobile", "Immobile", "Cher", "Abordable", "En groupe", "En solitaire", "Culturelle", "Intellectuelle"],
        titre: "",
        categorie: "",
        date: "",
        photo: "",
        description: ""
    }

    handleChange = (event) => {
        console.log(event.target.name);
        let {name, value} = event.target
        this.setState({[name]: value});
      }

    handleChangeSelect = (value) => {
        console.log(value);
        this.setState({categorie: value});
      }

      handleChangeDate = (value) => {
        console.log(value);
        this.setState({date: value});
      }
    handleFormSubmit = event => {
        axios.post(
            "http://localhost:3001/api/Activities/add", // 1st and mandatory: which route I'm hitting in the backend
            this.state, // 2nd and mandatory: what I'm sending (since it's POST route I have to send something)
            { withCredentials:true } // 3rd and optional: credentials:true in CORS
        )
        .then( responseFromServer => {
            console.log(responseFromServer)
        } )
        .catch(err => {
            console.log("error while creating a category: ", err);
            if(err.response && err.response.data){
                return this.setState({ message:err.response.data.message });
            }
        })
    }

    render() {
        return (
            <div className="categories">
                <Input name="titre" placeholder="Titre" onChange={this.handleChange} />
                <Select
                name="categorie"
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                onChange={this.handleChangeSelect}
                >
                {this.state.categories.map(c => <Option key={c}>{c}</Option>)}
                </Select>
                <DatePicker name="date" onChange={this.handleChangeDate} />
                <Input name="photo" placeholder="Photo" onChange={this.handleChange} />
                <Input name="description" placeholder="Description" onChange={this.handleChange} />
                <Button type="primary" onClick={this.handleFormSubmit}>Primary</Button>
            </div>
        );
    }
}

export default Activities;
