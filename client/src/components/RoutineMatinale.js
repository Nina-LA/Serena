import React, { Component } from "react";

class RoutineMatinale extends Component {
  render() {
    return (
      <section className="videos">
        <h1> Routine Matinale </h1>
        <div>
          <h2>Méditation Matinale pour bien démarrer la journée | Force intérieure et Sérénité</h2>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/rnqsUiGpGXw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div>
          <h2>Méditation guidée pour une journée pleine d'énergie</h2>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/723lwelFRWc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </section>
    );
  }
}

export default RoutineMatinale;