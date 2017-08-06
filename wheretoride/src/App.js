import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import Item from "./Item";

const cities = [
  "Houston",
  "Atlanta",
  "Belo Horizonte"
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {search: "", errorText: "", frontPage: true};
  }

  updateState(event){
    this.setState({search: event.target.value})
  }

  handleSubmit(event){
    console.log(document.getElementById("search").value);
    event.preventDefault();
  }

  handleClose(event){
    console.log(document.getElementById("search").value);
    this.setState({frontPage: false})
    this.setState({errorText: "We do not support this city yet. Contribute!"})
  }

  clearError(event){
    this.setState({errorText: ""})
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.state.frontPage ? 
        <div className="Main">
            <div>
              <form onSubmit={this.handleSubmit}>
                <AutoComplete id="search" onFocus={event => this.clearError(event)} floatingLabelText="Enter city name" dataSource={cities} filter={AutoComplete.caseInsensitiveFilter} onClose={event => this.handleClose(event)} errorText={this.state.errorText}/>
              </form>
            </div>
          </div>:
        <div className="All">
          <div className="Main">
            <div>
              <form onSubmit={this.handleSubmit}>
                <AutoComplete id="search" onFocus={event => this.clearError(event)} floatingLabelText="Enter city name" dataSource={cities} filter={AutoComplete.caseInsensitiveFilter} onClose={event => this.handleClose(event)} errorText={this.state.errorText}/>
              </form>
            </div>
          </div>
          <div className="Main">
            <div className="Items">
              <Item title="test" subtitle="test"/>
            </div>
          </div>
        </div>}
      </MuiThemeProvider>
    );
  }
}

export default App;
