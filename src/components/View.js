import React, { Component } from 'react';
import './App.css';

class App extends Component {

  showModal(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }

  hideModal(element) {
    document.getElementById("modal01").style.display = "none";
  }

  componentDidMount() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

  render() {
    return (
      <div>
        <div className="w3-row w3-grayscale-min" id="view">
          <div className="w3-quarter">
            <img src="/w3images/girl.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="Canoeing again" />
            <img src="/w3images/boy.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="Quiet day at the beach. Cold, but beautiful" />
            <img src="/w3images/girl.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="The Beach. Me. Alone. Beautiful" />
          </div>

          <div className="w3-quarter">
            <img src="/w3images/girl_train.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="A girl, and a train passing" />
            <img src="/w3images/man_bench.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="Waiting for the bus in the desert" />
            <img src="/w3images/natureboy.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="Nature again.. At its finest!" />
          </div>

          <div className="w3-quarter">
            <img src="/w3images/man_bench.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="Waiting for the bus in the desert" />
            <img src="/w3images/girl_mountain.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="What a beautiful scenery this sunset" />
            <img src="/w3images/closegirl.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="The Beach. Me. Alone. Beautiful" />
          </div>

          <div className="w3-quarter">
            <img src="/w3images/natureboy.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="A boy surrounded by beautiful nature" />
            <img src="/w3images/girl_train.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="A girl, and a train passing" />
            <img src="/w3images/boy.jpg" style={{ width: '100%' }} onClick={this.showModal} alt="Quiet day at the beach. Cold, but beautiful" />
          </div>
        </div>
        <div className="w3-center w3-padding-32">
          <div className="w3-bar">
            <a href="#a" className="w3-bar-item w3-button w3-hover-black">«</a>
            <a href="#a" className="w3-bar-item w3-black w3-button">1</a>
            <a href="#a" className="w3-bar-item w3-button w3-hover-black">2</a>
            <a href="#a" className="w3-bar-item w3-button w3-hover-black">3</a>
            <a href="#a" className="w3-bar-item w3-button w3-hover-black">4</a>
            <a href="#a" className="w3-bar-item w3-button w3-hover-black">»</a>
          </div>
        </div>

        <div id="modal01" className="w3-modal w3-black" style={{ paddingTop: 0 }} onClick={this.hideModal}>
          <span className="w3-button w3-black w3-xlarge w3-display-topright">×</span>
          <div className="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
            <img id="img01" className="w3-image" alt="" />
            <p id="caption"></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
