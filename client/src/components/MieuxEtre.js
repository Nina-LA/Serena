import React, { Component } from "react";

class MieuxEtre extends Component {
  render() {
    return (
        <div className= "Activités" style={{margin: '100px auto' }}>
            <div style={{ margin: 20, height: 300, width: 300, background: 'linear-gradient(#e66465, #9198e5)'}}><a href="VideosInspirantes">Vidéos inspirantes</a>
            </div>
            <div style={{ margin: 20, height: 300, width: 300, background: "linear-gradient(#E2BEBD, #FFEFD5)"}}><a href="RoutineMatinale">Routine matinale</a>
            </div>
            <div style={{ margin: 20, height: 300, width: 300, background: "linear-gradient(#0B99C1, #00FFFF)"}}><a href="Meditation">Méditation</a>
            </div>
            <div style={{ margin: 20, height: 300, width: 300, background: "linear-gradient(#FCFDD8, #FFFF00)"}}><a href="RetrouverSaConfianceEnSoi">Retrouver sa confiance en soi</a>
            </div>
            <div style={{ margin: 20, height: 300, width: 300, background: "linear-gradient(#7AD9F5, #4169E1)"}}><a href="MaîtriserSonSommeil">Maîtriser son sommeil</a>
            </div>
      </div>
    );
  }
}

export default MieuxEtre;
