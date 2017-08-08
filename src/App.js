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
    this.state = {searchText: "", errorText: "", frontPage: true, city: "", error: true};
  }

  handleUpdateInput (t) {
    this.setState({ searchText: t })
  }

  handleSelect (t) {
    this.setState( { searchText: '' })
  }

  handleClose(event){
    var temp = this.state.searchText.toLowerCase();
    if (temp !== ""){
      var error = true;
      cities.forEach(item => {
        if (item.toLowerCase() === temp){
          this.setState({frontPage: false, city: temp, searchText: "", error: false});
          error = false;
        }
      })
      if (error){
      this.setState({errorText: "We do not support this city yet. Contribute!"})
      }
      else{
        this.setState({error: true, errorText: ""})
      }
      document.querySelector("#search").blur();
    }
    else{
      document.querySelector("#search").blur();
    }
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
              <AutoComplete id="search" onFocus={event => this.clearError(event)} searchText={this.state.searchText} onNewRequest={this.handleSelect.bind(this)} onUpdateInput={this.handleUpdateInput.bind(this)} floatingLabelText="Enter city name" dataSource={cities} filter={AutoComplete.caseInsensitiveFilter} onClose={event => this.handleClose(event)} errorText={this.state.errorText}/>
            </div>
          </div>:
        <div className="All">
          <div className="Main">
            <div>
              <AutoComplete id="search" onFocus={event => this.clearError(event)} searchText={this.state.searchText} onNewRequest={this.handleSelect.bind(this)} onUpdateInput={this.handleUpdateInput.bind(this)} floatingLabelText="Enter city name" dataSource={cities} filter={AutoComplete.caseInsensitiveFilter} onClose={event => this.handleClose(event)} errorText={this.state.errorText}/>
            </div>
          </div>
          <div className="Main">
            <div className="Items">
              <p>Results for {this.state.city}:</p>
            </div>
          </div>
          <div className="MainList">
            <div className="ItemsList">
              <Item city={this.state.city} subtitle="test"/>
            </div>
          </div>
        </div>}
      </MuiThemeProvider>
    );
  }
}

export default App;
