import React from 'react';

import 'antd/dist/antd.css';
import { Table } from 'antd';
import HeaderCards from '../../components/HeaderCards/HeaderCards';
import columns from "./tableStructure";
import getPandemicData from "../../services/getPandemicData";
import {BounceLoader} from "react-spinners";

export default class PandemicReport extends React.Component {

    state = {
      countries        : [],
      globalStatistic  : {},
      loading          : false
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
          globalStatistic,
          loading : true
        });
        
      })
      .catch( err => {
          console.log(err)
      });
    }
        
    render() {
      return (
        <div>  
            <HeaderCards  dataSource={this.state.globalStatistic}/>
            {this.state.loading ? (
              <Table dataSource={this.state.countries} columns={columns} scroll={{ x: 1000 }} />
            ) : (
              <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <BounceLoader size={70} />
              </div>
            )}         
        </div>
      );
    }
    
  }