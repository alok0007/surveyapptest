import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      selectedFiles: null,
      loaded: 0,
      fileNumber: '',
      registrationNumber: '',
      surveyorCode: '',
      surveyDate: new Date(),
      msgStatus: '',
      msgType: ''
    };
    this.handleSurveyDate = this.handleSurveyDate.bind(this);
  }

  onClick = (element) => {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }

  componentDidMount = () => {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

  componentDidUpdate = () => {
    if (this.state.loaded === 0) { this.modalClose(); } else { this.modalOpen(); }
  }
  modalOpen() {
    document.getElementById("myOverlayN").style.display = "block";
  }
  modalClose() {
    document.getElementById("myOverlayN").style.display = "none";
  }

  handleSubmit = async (event) => {

    event.preventDefault();
    this.setState({ loaded: 1 });
    const body = new FormData();
    if (this.state.surveyorCode == 'ARVIND'||this.state.surveyorCode == 'NIKHILESH'||this.state.surveyorCode == 'ALOK') {
      if (this.state.selectedFiles && this.state.selectedFiles.length > 0) {
        let count = 1;
        Object.keys(this.state.selectedFiles).forEach(key => {
          count++;
          body.append(`file${count}`, this.state.selectedFiles[key]);
        });
      }
      body.append('fileNumber', this.state.fileNumber);
      body.append('registrationNumber', this.state.registrationNumber);
      body.append('surveyorCode', this.state.surveyorCode);
      body.append('surveyDate', this.state.surveyDate);

      await axios.post('/upload', body)
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
    } else {
      this.setState({
        msgStatus: 'Wrong Upload Code!',
        msgType: 'e',
        loaded: 0
      })
    }
  };

  handleSelectedFile = event => {
    this.setState({
      selectedFiles: event.target.files,
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
  handleSurveyorCode = event => {
    this.setState({
      surveyorCode: event.target.value,
    })
  }
  handleSurveyDate(date) {
    this.setState({
      surveyDate: date
    });
  }

  render() {
    return (
      <div className="w3-container w3-light-grey w3-padding-32 w3-padding-large" id="add" >
        <div className="w3-content" style={{ maxWidth: '600px' }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" id="surveyForm">
            <h4 className="w3-center">
              <b>REPORT ACCIDENT</b>
            </h4>
            <div className={this.state.msgType === 'e' ? 'w3-text-red' : 'w3-text-green'}>
              {this.state.msgStatus}
            </div>
            <div className="w3-section">
              <label>Report Number</label>*
              <input value={this.state.fileNumber} className="w3-input w3-border" type="text" name="File Number"
                onChange={this.handleFileNumber} pattern="[0-9]*" maxLength="8" required />
            </div>
            <div className="w3-section">
              <label>Vehicle Registration Number</label>*
              <input value={this.state.registrationNumber} className="w3-input w3-border" type="text"
                name="Registration Number" onChange={this.handleRegistrationNumber} required />
            </div>
            <div className="w3-section">
              <label>Executive Code</label>*
              <input value={this.state.surveyorCode} className="w3-input w3-border" type="text"
                name="Surveyor" autoComplete="off" onChange={this.handleSurveyorCode} required />
            </div>
            <div className="w3-section">
              <label>Date Of Inception<p></p></label>*
            <DatePicker className="w3-input w3-border"
            dateFormat="yyyy/MM/dd"
                selected={this.state.surveyDate}
                onChange={this.handleSurveyDate}
              />
            </div>
            <div className="w3-section">
              <label>Upload Photos</label>
              <input className="w3-input w3-border" type="file" name="imgUploader[]"
                onChange={this.handleSelectedFile} multiple />
            </div>
            <button type="submit" className="w3-button w3-block w3-black w3-margin-bottom">Add Photos</button>
          </form>
        </div>
      </div >
    );
  }
}

export default App;
