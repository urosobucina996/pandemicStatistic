import { Statistic, Card, Row, Col } from 'antd';

function HeaderCard(props){
    return(
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Infected Globalu" value={112893} />
            </Col>
        </Row>
    );
}

export default HeaderCard;