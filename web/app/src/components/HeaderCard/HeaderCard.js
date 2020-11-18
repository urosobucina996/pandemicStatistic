import { Statistic, Card, Row, Col } from 'antd';

function HeaderCard(props){
    
    let name = '';
    switch(props.data.key){
        case "numberOfCases":
            name = "Number Of Cases";
            break;
        case "numberOfDeaths":
            name = "Number Of Deaths";
            break;
        case "numberOfRecovered":
            name = "Number Of Recovered";
            break;
        case "activeCases":
            name = "Active Cases";
            break;
        case "closedCases":
            name = "Number Of closed cases";
            break;
    }
    return(
        <Row gutter={16}>
            <Col span={24}>
                <Card>
                    <Statistic title={name} value={props.data.value} />
                </Card>
            </Col>
        </Row>
    );
}

export default HeaderCard;