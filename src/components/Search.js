import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      selectedFiles: null,
      loaded: 0,
      fileNumber: '',
      registrationNumber: '',
      surveyorName: '',
      msgStatus: '',
      msgType: ''
    }
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
    if (this.state.selectedFiles && this.state.selectedFiles.length > 0) {
      let count = 1;
      Object.keys(this.state.selectedFiles).forEach(key => {
        count++;
        body.append(`file${count}`, this.state.selectedFiles[key]);
      });
    }
    body.append('fileNumber', this.state.fileNumber);
    body.append('registrationNumber', this.state.registrationNumber);
    await axios.get('/search/' + this.state.fileNumber + '/' + this.state.registrationNumber)
      .then(response => {
        const data = response.data;
        if(data.message.imageData.length > 0){
          this.setState({
            msgStatus: 'Images For File# ' +data.message.fileNumber,
            msgType: data.code !== 200 ? 'e' : 'ne',
            surveyorName: data.message.imageData,
            loaded: 0
          })
        }
          else{
            this.setState({
              msgStatus: 'File Number Not Correct ',
              msgType: data.code !== 200 ? 'e' : 'ne',
              surveyorName: data.message.imageData,
              loaded: 0
            })
          }                
      })
      .catch(e => {
        this.setState({
          msgStatus: 'Some Technical issue!',
          msgType: 'e',
          loaded: 0
        })
      })
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
      registrationNumber: event.target.value.toUpperCase(),
    })
  }
  handleSurveyorName = event => {
    this.setState({
      surveyorName: event.target.value,
    })
  }

  showModal(element) {
    document.getElementById("img01").src = element.target.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.target.alt;
  }

  hideModal(element) {
    document.getElementById("modal01").style.display = "none";
  }

  render() {
    return (
      <div className="w3-container w3-light-grey w3-padding-32 w3-padding-large" id="add">
        <div className="w3-content" style={{ maxWidth: '600px' }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" id="surveyForm">
            <h4 className="w3-center">
              <b>SEARCH IMAGES</b>
            </h4>

            <div className="w3-section">
              <label>File Number*</label>
              <input value={this.state.fileNumber} className="w3-input w3-border" type="text" name="File Number"
                onChange={this.handleFileNumber} required />
            </div>
            <div className="w3-section">
              <label>Vehicle Registration Number*</label>
              <input value={this.state.registrationNumber} className="w3-input w3-border" type="text"
                name="Registration Number" onChange={this.handleRegistrationNumber} required />
            </div>
            <button type="submit" className="w3-button w3-block w3-black w3-margin-bottom">Search Pictures</button>
          </form>
        </div>
        <div className={this.state.msgType === 'e' ? 'w3-text-red' : 'w3-text-green'}>
        <h4> <b>{this.state.msgStatus}</b></h4>
        </div>

        <div className="w3-quarter">
          {this.state.surveyorName &&
            this.state.surveyorName.map(
              item => <img key={item.name} name={item.name}  onClick={this.showModal} 
                src={`data:image/jpeg;base64,${item.obj}`} style={{ width: '150px',height: '150px', padding: '10px' }} alt="" />
            )
          }
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
