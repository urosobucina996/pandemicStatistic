import React from 'react';

import axios from 'axios';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import HeaderCard from '../HeaderCard/HeaderCard';
import columns from "./tableStructure";
import headers from "./requestHeader";

export default class PandemicReport extends React.Component {
    state = {
        data      : [],
        countries : [],
        cardData  : []
      }

    componentDidMount() {
      axios.get(`http://localhost:5000/flask`,{ headers:headers})
        .then(res => {
          console.log(res.data);
          this.setState({
            data: res.data
          })

          const { groupByCountry, ...headerRender } = this.state.data;
          
          let arrayOfHeaders = [];
          for (const [key,value] of Object.entries(headerRender)){
            arrayOfHeaders.push(<HeaderCard  data={{key,value}} />);
          }

          const state = groupByCountry.map(single => {
            let object = single[Object.keys(single)[0]];
            
            return {
              key          : Object.keys(single)[0],
              country      : Object.keys(single)[0],
              ...object
            }
          })
          this.setState({
            countries : state,
            cardData  : arrayOfHeaders
          });
          
        })
        .catch( err => {
            console.log(err)
        });
    }
    
    
    
    render() {
      return (
        <div>
            {this.state.cardData}
            <Table dataSource={this.state.countries} columns={columns} />
        </div>
      );
    }
  }