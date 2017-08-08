import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import Map from './Map'
import axios from "axios"
import "./Item.css"


class Item extends Component{
    constructor(props){
        super(props);
        this.state = {title: "", subtitle: "", places: []}
        // this.setState = {title: this.props.title, subtitle: this.props.subtitle}
        this.city = null;
        this.get_places(this.props.city);
    }

    get_places(city) {
        if (this.city !== city) {
            this.city = city;
            var data = {city: city};
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
    }

    componentWillReceiveProps(props) {
        this.get_places(props.city);
    }

    titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
        }

    itemDisplay(id){
        var temp = JSON.parse(JSON.stringify(this.state.places));
        temp.forEach(item =>{
            if (item.id === id){
                item.visible = !item.visible;
            }
            else{
                item.visible = false;
            }
        }    
        )
        this.setState({places: temp});
    }

    render() {
        return(
            <MuiThemeProvider>
                <div>
                    {this.state.places.map(item => 
                    <Card key={item.id} className="md-card listItem">
                        <CardTitle title={this.titleCase(item.location)} subtitle={this.props.subtitle} onClick={event => this.itemDisplay(item.id)}/>
                        {this.state.places[item.id-1].visible ?
                        <div>
                            <Map center={{lat: item.lat, lng: item.lng}} place={item.id}/>
                        </div>
                        : <p></p>}
                    </Card>
                    )}
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Item