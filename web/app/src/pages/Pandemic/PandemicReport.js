import React from 'react';

import 'antd/dist/antd.css';
import { Table } from 'antd';
import HeaderCards from '../../components/HeaderCards/HeaderCards';
import columns from "./tableStructure";
import PageLayout from "../../components/Layout/Layout";
import getPandemicData from "../../services/getPandemicData";

export default class PandemicReport extends React.Component {

    state = {
      countries        : [],
      globalStatistic  : {}
    }

    componentDidMount() {
      
      getPandemicData()
      .then(({data}) => {

        const { groupByCountry, ...globalStatistic } = data;

        const countries = groupByCountry.map(single => {

          const countryName = Object.keys(single)[0];
          const countryData = single[countryName];
          
          return {
            key          : countryName,
            country      : countryName,
            ...countryData
          }
        })

        this.setState({
          countries,
          globalStatistic
        });
        
      })
      .catch( err => {
          console.log(err)
      });
    }
        
    render() {
      return (
        <PageLayout>  
            <HeaderCards  dataSource={this.state.globalStatistic}/>
            <Table dataSource={this.state.countries} columns={columns} />
        </PageLayout>
      );
    }
    
  }