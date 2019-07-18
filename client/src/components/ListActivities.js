import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, Calendar, Badge, Button, Row, Col } from "antd";
import moment from "moment";
const { Option } = Select;
// import Activities from './Activities';

class ListActivities extends Component {
  constructor() {
    super();
    this.state = {
      value: moment("2019-07-25"),
      listOfActivities: [],
      categorie: [],
      categories: [
        "A l'extérieur",
        "A l'intérieur",
        "Mobile",
        "Immobile",
        "Cher",
        "Abordable",
        "En groupe",
        "En solitaire",
        "Culturelle",
        "Intellectuelle"
      ]
    };
  }

  handleChangeSelect = value => {
    console.log(value);
    this.setState({ categorie: value });
  };

  getAllActivities = () => {
    axios
      .get(`http://localhost:3001/api/ListActivities`)
      .then(responseFromApi => {
        this.setState({
          listOfActivities: responseFromApi.data,
          value: moment()
        });
      });
  };
  handleFormSubmit = event => {
    axios
      .post(
        "http://localhost:3001/api/ListActivities", // 1st and mandatory: which route I'm hitting in the backend
        { categories: this.state.categorie }, // 2nd and mandatory: what I'm sending (since it's POST route I have to send something)
        { withCredentials: true } // 3rd and optional: credentials:true in CORS
      )
      .then(responseFromServer => {
        console.log(responseFromServer);
        this.setState({
          listOfActivities: responseFromServer.data
        });
      })
      .catch(err => {
        console.log("error while creating a category: ", err);
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  chooseActivity = (event, id) => {
    axios
      .post("http://localhost:3001/api/addNewActivity/" + id, null, {
        withCredentials: true
      })
      .then(resp => {
        console.log("click");
        this.getAllActivities();
      });
  };

  componentDidMount() {
    this.getAllActivities();
  }

  //AntDesign calendar functino

  // populateGetListData = () => {
  //   {this.state.listOfActivities.map(e => {
  //     return(
  //       "case" + e.day +":"
  //       "listData = ["
  //         e.
  //       "]"
  //     )

  //   })}
  // }

  getListData = value => {
    return this.props.user.ActivityChoosen.filter(activity =>
      moment(value).isSame(moment(activity.date), "day")
    ).map(activity => ({ type: "success", content: activity.titre }));
    // let listData;
    // switch (value.date()) {
    //   // {this.populateGetListData}

    //   case 8:
    //     listData = [
    //       { type: "success", content: "Promenada à vélo" },
    //       { type: "success", content: "This is usual event." }
    //     ];
    //     break;
    //   case 10:
    //     listData = [
    //       { type: "warning", content: "This is warning event." },
    //       { type: "success", content: "This is usual event." },
    //       { type: "error", content: "This is error event." }
    //     ];
    //     break;
    //   case 15:
    //     listData = [
    //       { type: "warning", content: "This is warning event" },
    //       { type: "success", content: "This is very long usual event。。...." },
    //       { type: "error", content: "This is error event 1." },
    //       { type: "error", content: "This is error event 2." },
    //       { type: "error", content: "This is error event 3." },
    //       { type: "error", content: "This is error event 4." }
    //     ];
    //     break;
    //   default:
    // }
    // return listData || [];
  };

  dateCellRender = value => {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  getMonthData = value => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  monthCellRender = value => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <div className="plan" style={{ width: "100%", float: "left" }}>
          <p>
            Sélectionne les catégories d'activités qui t'intéressent pour créer
            ton plan de secours
          </p>
          {this.props.user.ActivityChoosen.map(ac => (
            <li>{ac.titre}</li>
          ))}
          {this.state.listOfActivities.map(activity => {
            return (
              <Row key={activity._id}>
                <Col span={8} offset={6}>
                  <h3>{activity.titre}</h3>
                  <p>{activity.date}</p>
                </Col>
                <Col span={4}>
                  <Button
                    className="buttonActivity"
                    type="primary"
                    onClick={e => this.chooseActivity(e, activity._id)}
                  >
                    Ajouter
                  </Button>
                </Col>
              </Row>
              // <div key={activity._id} className="chooseActivity">
              //   <div>
              //     <h3>{activity.titre}</h3>
              //     <p>{activity.date}</p>
              //   </div>
              //   {/* <p style={{maxWidth: '400px'}} >{activity.description} </p> */}
              //   <Button
              //     className="buttonActivity"
              //     type="primary"
              //     onClick={this.chooseActivity}
              //   >
              //     Ajouter
              //   </Button>
              // </div>
            );
          })}

          <Select
            name="categorie"
            mode="multiple"
            style={{ width: "60%" }}
            placeholder="Please select"
            // defaultValue={['a10', 'c12']}
            onChange={this.handleChangeSelect}
          >
            {this.state.categories.map(c => (
              <Option key={c}>{c}</Option>
            ))}
          </Select>
          <Button type="primary" onClick={this.handleFormSubmit}>
            Valider
          </Button>
        </div>
        <Calendar
          value={value}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
        />
      </React.Fragment>
    );
  }
}

export default ListActivities;
