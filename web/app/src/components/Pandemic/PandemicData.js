import React from 'react';

import axios from 'axios';

import TableRow from '../TableRow/TableRow';

export default class PandemicReport extends React.Component {
    state = {
        data: [],
        countries : []
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
          //console.log(res.data);
          this.setState({
            data: res.data
          })
          const state = this.state.data.groupByCountry.map(country => {
            //console.log(country);
            return <TableRow key = {Object.keys(country)[0]}  data = {country} />
          })
          this.setState({
            countries: state
          });
          // Get key of groupCountries
          // this.state.data.groupByCountry.map(country =>{
          //   console.log(Object.keys(country)[0]);
          // });
          
        })
        .catch( err => {
            console.log(err)
        });
    }
    
    

    render() {
      return (
        <div>
            <h2>{this.state.data.numberOfCases}</h2>
            <h3>{this.state.data.numberOfDeaths}</h3>
            <h3>{this.state.data.numberOfRecovered}</h3>
            <h3>{this.state.data.activeCases}</h3>
            <h3>{this.state.data.closedCases}</h3>
            <table style={{width: "100% "}}>
                <tr>
                  <th>Country</th>
                  <th>Total Cases</th>
                  <th>New Cases</th>
                  <th>Total Deaths</th>
                  <th>New Deaths</th>
                  <th>Total Revocer</th>
                  <th>Active Cases</th>
                  <th>Critic</th>
                </tr>
                {this.state.countries}
            </table>
        </div>
      );
    }
  }