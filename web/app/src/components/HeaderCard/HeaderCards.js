import { Statistic, Card, Row, Col } from 'antd';

const titleByKey = {
    numberOfCases     : "Number Of Cases",
    numberOfDeaths    : "Number Of Deaths",
    numberOfRecovered : "Number Of Recovered",
    activeCases       : "Active Cases",
    closedCases       : "Number Of closed cases"
};

function HeaderCards({dataSource}){
    
    return(
        <Row gutter={16}>
            {Object.entries(dataSource).map(([key,value]) =>(
                <Col span={24}>
                    <Card>
                        <Statistic title={titleByKey[key]} value={value} />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default HeaderCards;