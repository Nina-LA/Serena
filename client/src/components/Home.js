import React, { Component } from "react";
import serena from "../images/serena_lifestyle.jpg";

class Home extends Component {
  render() {
    return (
      <section>
        <img
          alt="Homepage"
          src={serena}
          style={{ width: "100%", height: "700px" }}
        />
      </section>
    );
  }
}

export default Home;
