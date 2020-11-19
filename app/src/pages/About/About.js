import { Result, Button } from 'antd';
import { Link } from "react-router-dom";

export default function About() {
    return (
        <Result
        status="success"
        title="We built report about pandemic."
        subTitle="Daily report show global and Balkan region statistic."
        extra={[
          <Button type="primary" key="console">
            <Link to='/report'>
                Go to Reports
            </Link>
          </Button>
        ]}
      />
    );
}