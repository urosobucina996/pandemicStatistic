import React from 'react';

import axios from 'axios';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import HeaderCard from '../HeaderCard/HeaderCard';
import columns from "./tableStructure";
import headers from "./requestHeader";

export default class PandemicReport extends React.Component {
    state = {
        data: [],
        countries : []
      }

    componentDidMount() {
      axios.get(`http://localhost:5000/flask`,{ headers:headers})
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
            <Table dataSource={this.state.countries} columns={columns} />
        </div>
      );
    }
  }