import React from 'react';

import axios from 'axios';


export default class PandemicReport extends React.Component {
    state = {
        data: []
      }

    
    headers = {
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Accept-Language': 'en-US,en;q=0.9,sr;q=0.8',
        'Cache-Control': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Pragma': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
    };

    componentDidMount() {
      axios.get(`http://localhost:5000/flask`,{ headers:this.headers})
        .then(res => {
          this.setState({
            data: res.data
          })
        })
        .catch( err => {
            console.log(err)
        });
    }

    render() {
      return (
        <div>
            <h3>{this.state.data.numberOfCases}</h3>
            <h3>{this.state.data.numberOfDeaths}</h3>
            <h3>{this.state.data.numberOfRecovered}</h3>
            <h3>{this.state.data.activeCases}</h3>
            <h3>{this.state.data.closedCases}</h3>
        </div>
      );
    }
  }