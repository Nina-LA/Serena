import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import {Button} from 'antd';
const { Option } = Select;
// import Activities from './Activities'; 

class ListActivities extends Component {
  constructor(){
      super();
      this.state = { 
          listOfActivities: [], 
          categorie: [],
          categories: ["A l'extérieur", "A l'intérieur", "Mobile", "Immobile", "Cher", "Abordable", "En groupe", "En solitaire", "Culturelle", "Intellectuelle"] };
  }

  handleChangeSelect = (value) => {
    console.log(value);
    this.setState({categorie: value});
  }

  getAllActivities = () =>{
    axios.get(`http://localhost:3001/api/ListActivities`)
    .then(responseFromApi => {
      this.setState({
        listOfActivities: responseFromApi.data
      })
    })
  }
  handleFormSubmit = event => {
    axios.post(
        "http://localhost:3001/api/ListActivities", // 1st and mandatory: which route I'm hitting in the backend
        {categories: this.state.categorie }, // 2nd and mandatory: what I'm sending (since it's POST route I have to send something)
        { withCredentials:true } // 3rd and optional: credentials:true in CORS
    )
    .then( responseFromServer => {
        console.log(responseFromServer)
        this.setState({
            listOfActivities: responseFromServer.data
          })
    } )
    .catch(err => {
        console.log("error while creating a category: ", err);
        if(err.response && err.response.data){
            return this.setState({ message:err.response.data.message });
        }
    })
}
  componentDidMount() {
    this.getAllActivities();
  }

  render(){
    return(
      <div style={{width: '60%', float:"left"}}>
        { this.state.listOfActivities.map( activity => {
            return (
              <div key={activity._id}>
                <h3>{activity.titre}</h3>
                <p>{activity.date}</p>

                {/* <p style={{maxWidth: '400px'}} >{activity.description} </p> */}
              </div>
            )})
        }

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
        <Button type="primary" onClick={this.handleFormSubmit}>Primary</Button>
      </div>
    )
  }
}

export default ListActivities;