import React, { Component } from 'react';
import './App.css';

class App extends Component {

  onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  
  componentDidMount() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

  render() {
    return (
      <div className="w3-container w3-light-grey w3-padding-32 w3-padding-large" id="contact">
        <div className="w3-content" style={{ maxWidth: '600px' }}>
          <h4 className="w3-center">
            <b>Contact Me</b>
          </h4>
          <p>Do you want me to send you photographs ? please mail me on gaursurveyor@googlemail.com or fill below form</p>
          <div className="w3-section">
            <label>Name</label>
            <input className="w3-input w3-border" type="text" name="Name" required />
          </div>
          <div className="w3-section">
            <label>Email</label>
            <input className="w3-input w3-border" type="text" name="Email" required />
          </div>
          <div className="w3-section">
            <label>Message</label>
            <input className="w3-input w3-border" type="text" name="Message" required />
          </div>
          <button type="submit" className="w3-button w3-block w3-black w3-margin-bottom">Send Message</button>
        </div>
      </div>
    );
  }
}

export default App;
