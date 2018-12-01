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
      <div className="w3-container w3-light-grey w3-padding-32 w3-padding-large" id="add">
        <div className="w3-content" style={{ maxWidth: '600px' }}>
          <h4 className="w3-center">
            <b>ACCIDENT REPORT</b>
          </h4>
            <div className="w3-section">
              <label>File Number</label>
              <input className="w3-input w3-border" type="text" name="File Number" required />
            </div>
            <div className="w3-section">
              <label>Vehicle Registration Number</label>
              <input className="w3-input w3-border" type="text" name="Registration Number" required />
            </div>
            <div className="w3-section">
              <label>Surveyor Name</label>
              <input className="w3-input w3-border" type="text" name="Surveyor" required />
            </div>
            <div className="w3-section">
              <label>Upload Photos</label>
              <input className="w3-input w3-border" type="file" name="imgUploader" multiple />
            </div>
            <button type="submit" className="w3-button w3-block w3-black w3-margin-bottom">Submit Report</button>
        </div>
      </div>
    );
  }
}

export default App;
