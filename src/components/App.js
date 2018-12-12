import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Add from './Add';
import Search from './Search';
import About from './About';
import Contact from './Contact';

const divStyle = {
  marginTop: '83px'
};

class App extends Component {

  onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  w3Open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
  w3Close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }
  componentDidUpdate() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

  render() {
    
    return (
      <div>
        <nav className="w3-sidebar w3-bar-block w3-black w3-animate-right w3-top w3-text-light-grey w3-large"
          style={{ "zIndex": 3, 'width': '250px', 'fontWeight': 'bold', 'display': 'none', 'right': 0 }} id="mySidebar">
          <div onClick={this.w3Close} className="w3-bar-item w3-button w3-center w3-padding-32">CLOSE</div>
          <Link to='/' className="w3-bar-item w3-button w3-center w3-padding-16">ADD FILE</Link>
          <Link to='/search' className="w3-bar-item w3-button w3-center w3-padding-16">SEARCH FILE</Link>
          <Link to='/about' className="w3-bar-item w3-button w3-center w3-padding-16">ABOUT US</Link>
          <Link to='/contact' className="w3-bar-item w3-button w3-center w3-padding-16">CONTACT</Link>
        </nav>

        <header className="w3-container w3-top w3-white w3-xlarge w3-padding-16">
          <span className="w3-left w3-padding">Arving Gour Surveyor Company</span>
          <div href="#1" className="w3-right w3-button w3-white" onClick={this.w3Open}>☰</div>
        </header>

        <div className="w3-overlay w3-animate-opacity" onClick={this.w3Close} style={{ "cursor": "pointer" }} title="close side menu" id="myOverlay"></div>
        <div className="w3-overlay w3-animate-opacity" style={{ "cursor": "pointer" }} title="close side menu" id="myOverlayN"></div>

        <div className="w3-main w3-content" style={divStyle}>

          <Switch>
            <Route exact path='/' component={Add} />
            <Route path='/search' component={Search} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
          </Switch>

          {/*  
          <footer className="w3-container w3-padding-32 w3-grey">
            <div className="w3-row-padding">
              <div className="w3-third">
                <h3>INFO</h3>
                <p>Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue
                          gravida diam non fringilla.</p>
              </div>
            </div>
          </footer>
          */}
          <div className="w3-black w3-center w3-padding-24">Powered by</div>

        </div>
      </div>
    );
  }
}

export default App;
