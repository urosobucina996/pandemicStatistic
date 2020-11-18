import React from "react";

function TableRow(props){

    const state = Object.keys(props.data)[0]; 
    const data  = props.data[state];
    console.log(state);
    console.log(data);
    return(
        <tr>
            <td>{state}</td>
            <td>{data.totalCases}</td>
            <td>{data.newCases}</td>
            <td>{data.totalDeaths}</td>
            <td>{data.newDeaths}</td>
            <td>{data.totalRecove}</td>
            <td>{data.activeCases}</td>
            <td>{data.seriousCritic}</td>
        </tr>
    );

}
export default TableRow