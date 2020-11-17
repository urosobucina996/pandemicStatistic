import React from 'react';

import axios from 'axios';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import HeaderCard from '../HeaderCard/HeaderCard';

export default class PandemicReport extends React.Component {
    state = {
        data: [],
        countries : []
      }

      // izdovjiti u json fajl
      columns = [
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'Total Cases',
          dataIndex: 'totalCases',
          key: 'totalCases',
        },
        {
          title: 'New Cases',
          dataIndex: 'newCases',
          key: 'newCases',
        },
        {
          title: 'Total Deaths',
          dataIndex: 'totalDeaths',
          key: 'totalDeaths',
        },
        {
          title: 'New Deaths',
          dataIndex: 'newDeaths',
          key: 'newDeaths',
        },
        {
          title: 'Total Recover',
          dataIndex: 'totalRecove',
          key: 'totalRecove',
        },
        {
          title: 'Active Cases',
          dataIndex: 'activeCases',
          key: 'activeCases',
        },
        {
          title: 'Critic',
          dataIndex: 'seriousCritic',
          key: 'seriousCritic',
        },
      ];

    
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
          console.log(res.data);
          this.setState({
            data: res.data
          })
          const state = this.state.data.groupByCountry.map(single => {
            let object = single[Object.keys(single)[0]];
            
            return {
              key          : Object.keys(single)[0],
              country      : Object.keys(single)[0],
              ...object
            }
          })
          this.setState({
            countries : state
          });

          console.log(this.state.countries);
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
            <HeaderCard />
            <Table dataSource={this.state.countries} columns={this.columns} />
        </div>
      );
    }
  }