import React from 'react';

import 'antd/dist/antd.css';
import { Table } from 'antd';
import HeaderCards from '../../components/HeaderCards/HeaderCards';
import columns from "./tableStructure";
import getPandemicData from "../../services/getPandemicData";
import {BounceLoader} from "react-spinners";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
}

export default class PandemicReport extends React.Component {

    state = {
      countries        : [],
      globalStatistic  : {},
      loading          : true
    }

    componentDidMount() {
      
      getPandemicData()
      .then(({data}) => {

        const { worldwide } = data;
        const { groupByCountry, ...globalStatistic } = worldwide;

        const countries = groupByCountry.map(single => {

          return {
            key : single['country'],
            ...single
          }
        })

        this.setState({
          countries,
          globalStatistic,
          loading : false
        });
        
      })
      .catch( err => {
          console.log(err)
      });
    }
        
    render() {
      const {countries, globalStatistic, loading} = this.state;
      return (
        <div>  
            <HeaderCards  dataSource={ globalStatistic }/>
            { loading ? (
              <div style={ style }>
                <BounceLoader size={70} />
              </div>
            ) : (
              <Table dataSource={countries} columns={columns} scroll={{ x: 1000 }} />
            )}         
        </div>
      );
    }
    
  }