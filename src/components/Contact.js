import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { uiproperties } from './uiproperties.js';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loaded: 0,
      requestorName: '',
      fileNumber: '',
      registrationNumber: '',
      surveyDate: new Date(),
      msgStatus: '',
      msgType: ''
    };
    this.handleSurveyDate = this.handleSurveyDate.bind(this);
  }

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

  handleRequestorName = event => {
    this.setState({
      requestorName: event.target.value
    })
  }

  handleFileNumber = event => {
    this.setState({
      fileNumber: event.target.value
    })
  }
  handleRegistrationNumber = event => {
    this.setState({
      registrationNumber: event.target.value,
    })
  }
  handleSurveyDate(date) {
    this.setState({
      surveyDate: date
    });
  }


  handleSubmit = async (event) => {

    event.preventDefault();
    this.setState({ loaded: 1 });
    const body = new FormData();

    body.append('requestorName', this.state.requestorName);
    body.append('fileNumber', this.state.fileNumber);
    body.append('registrationNumber', this.state.registrationNumber);


    await axios.post('/requestForUpload', body)
      .then(response => {
        const data = response.data;
        this.setState({
          msgStatus: data.code !== 200 ? 'File Already in System please take different file number!' : 'Data inserted successfully!',
          msgType: data.code !== 200 ? 'e' : 'ne',
          loaded: 0
        })
      })
      .catch(e => {
        this.setState({
          msgStatus: 'Some Technical issue!',
          msgType: 'e',
          loaded: 0
        })
      })
    this.setState({
      msgStatus: 'Wrong Upload Code!',
      msgType: 'e',
      loaded: 0
    })
  };

  render() {
    return (
      <div className="w3-container w3-light-grey w3-padding-32 w3-padding-large" id="contact">
        <div className="w3-content" style={{ maxWidth: '600px' }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" id="requestForm">
            <h4 className="w3-center">
              <b>Contact Us</b>
            </h4>
            <p>For Any query about our inspection report and photos,  please mail us on {uiproperties.mailId}  or submit below details </p>
            <div className="w3-section">
              <label>Report Number</label>
              <input value={this.state.requestorName} className="w3-input w3-border" type="text" name="Requestor Name"
                onChange={this.handleRequestorName} required />
            </div>
            <div className="w3-section">
              <label>Report Date<p></p></label>*
            <DatePicker className="w3-input w3-border"
            dateFormat="yyyy/MM/dd"
                selected={this.state.surveyDate}
                onChange={this.handleSurveyDate}
              />
            </div>
            <div className="w3-section">
              <label>Vehicle Registration Number</label>
              <input value={this.state.registrationNumber} className="w3-input w3-border" type="text"
                name="Registration Number" onChange={this.handleRegistrationNumber} required />
            </div>
            <div className="w3-section">
              <label>Mail ID where details to be send</label>
              <input  className="w3-input w3-border" type="text"
                name="Registration Number"  required />
            </div>
            <button type="submit" className="w3-button w3-block w3-black w3-margin-bottom">Please Upload Above Picture</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
