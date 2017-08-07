import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import Map from './Map'
import axios from "axios"


class Item extends Component{
    constructor(props){
        super(props);
        this.state = {title: "", subtitle: "", places: []}
        // this.setState = {title: this.props.title, subtitle: this.props.subtitle}
        var data = {city: this.props.city};
        var base_url = process.env.PUBLIC_URL || 'http://localhost:8000';
        axios.post(base_url + "/api/places", data)
        .then((result) =>{
            this.setState({
            places: result.data
            });
        }
        )
        .catch((error) =>
            console.log(error)
        )
        }

    titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
        }

    render() {
        return(
            <MuiThemeProvider>
                <div>
                    {this.state.places.map(item => 
                    <Card key={item.id} className="md-card">
                        <CardTitle title={this.titleCase(item.location)} subtitle={this.props.subtitle}/>
                        <Map />
                    </Card>
                    )}
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Item