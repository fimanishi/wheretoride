import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import GettingStartedExample from './Map'

class Item extends Component{
    constructor(props){
        super(props);
        this.state = {title: "", subtitle: ""}
        // this.setState = {title: this.props.title, subtitle: this.props.subtitle}
    }

    render() {
        return(
            <MuiThemeProvider>
                <Card className="md-card">
                    <CardTitle title={this.props.title} subtitle={this.props.subtitle}/>
                    <GettingStartedExample />
                </Card>
            </MuiThemeProvider>
        )
    }
}

export default Item