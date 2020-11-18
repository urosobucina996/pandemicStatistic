import React from 'react';

import axios from 'axios';
import 'antd/dist/antd.css';
import { Layout,Space,Table } from 'antd';
import HeaderCards from '../HeaderCard/HeaderCards';
import columns from "./tableStructure";
import headers from "./requestHeader";

export default class PandemicReport extends React.Component {

      state = {
        countries     : [],
        headerRender  : {}
      }

    componentDidMount() {
      axios.get(`http://localhost:5000/`,{ headers:headers})
        .then(res => {
          console.log(res.data);
          // this.setState({
          //   data: res.data
          // })

          const { groupByCountry, ...headerRender } = res.data;
          console.log(headerRender);
          
          // let arrayOfHeaders = [];
          // for (const [key,value] of Object.entries(headerRender)){
          //   arrayOfHeaders.push(<HeaderCard  data={{key,value}} />);
          // }

          const countries = groupByCountry.map(single => {
            let object = single[Object.keys(single)[0]];
            
            return {
              key          : Object.keys(single)[0],
              country      : Object.keys(single)[0],
              ...object
            }
          })
          this.setState({
            countries,
            headerRender
          });
          
        })
        .catch( err => {
            console.log(err)
        });
    }
    
    
    
    render() {
      return (
        <Layout>  
            <HeaderCards  dataSource={this.state.headerRender}/>
            <Table dataSource={this.state.countries} columns={columns} />
        </Layout>
      );
    }
  }