import React, { Component } from 'react';
import './App.css';
import { uiproperties } from './uiproperties.js';

class App extends Component {

  onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }

  render() {
    return (
        <div className="w3-container w3-dark-grey w3-center w3-text-light-grey w3-padding-32" id="about">
          <h4>
            <b>About Us</b>
          </h4>
          <div className="w3-content w3-justify" style={{ maxWidth: '600px' }}>
            <h4>Creative Technical Services</h4>
            <p>A group of technocrats engaged in the vehicle inspection and asset verification profession.
               </p>
               Contact Person/ Principal Officer<span/>
               <p>{uiproperties.contactPersonOneName}</p>
               <p>{uiproperties.contactPersonTwoName}</p>
               <p>Mobile: {uiproperties.contactnumber}</p>
               <div> {uiproperties.addressLine1}</div>
               <p> {uiproperties.addressLine2}</p>
                <p>mail:  {uiproperties.mailId}</p>
            
            {/* <hr className="w3-opacity" />
            <h4 className="w3-padding-16">Technical Skills</h4>
            <p className="w3-wide">Photography</p>
            <div className="w3-white">
              <div className="w3-container w3-padding-small w3-center w3-grey" style={{ width: '95%' }}>95%</div>
            </div>
            <p className="w3-wide">Web Design</p>
            <div className="w3-white">
              <div className="w3-container w3-padding-small w3-center w3-grey" style={{ width: '85%' }}>85%</div>
            </div>
            <p className="w3-wide">Photoshop</p>
            <div className="w3-white">
              <div className="w3-container w3-padding-small w3-center w3-grey" style={{ width: '80%' }}>80%</div>
            </div>
            <p>
              <button className="w3-button w3-light-grey w3-padding-large w3-margin-top w3-margin-bottom w3-hover-black">Download Resume</button>
            </p>
            <hr className="w3-opacity" />
            <h4 className="w3-padding-16">How much I charge</h4>
            <div className="w3-row-padding" style={{ marginRight: '16px' }}>
              <div className="w3-half w3-margin-bottom">
                <ul className="w3-ul w3-white w3-center">
                  <li className="w3-black w3-xlarge w3-padding-32">Basic</li>
                  <li className="w3-padding-16">Web Design</li>
                  <li className="w3-padding-16">Photography</li>
                  <li className="w3-padding-16">5GB Storage</li>
                  <li className="w3-padding-16">Mail Support</li>
                  <li className="w3-padding-16">
                    <h2>$ 10</h2>
                    <span className="w3-opacity">per month</span>
                  </li>
                  <li className="w3-light-grey w3-padding-24">
                    <button className="w3-button w3-white w3-padding-large">Sign Up</button>
                  </li>
                </ul>
              </div> 

              <div className="w3-half">
                <ul className="w3-ul w3-white w3-center">
                  <li className="w3-black w3-xlarge w3-padding-32">Pro</li>
                  <li className="w3-padding-16">Web Design</li>
                  <li className="w3-padding-16">Photography</li>
                  <li className="w3-padding-16">50GB Storage</li>
                  <li className="w3-padding-16">Endless Support</li>
                  <li className="w3-padding-16">
                    <h2>$ 25</h2>
                    <span className="w3-opacity">per month</span>
                  </li>
                  <li className="w3-light-grey w3-padding-24">
                    <button className="w3-button w3-white w3-padding-large">Sign Up</button>
                  </li>
                </ul>
              </div>
            </div>*/}
          </div>
        </div>
    );
  }
}

export default App;
