import { Result, Button } from 'antd';

export default function About() {
    return (
        <Result
        status="success"
        title="We built report about pandemic."
        subTitle="Daily report show global and Balkan region statistic."
        extra={[
          <Button type="primary" key="console" href='https://www.worldometers.info/coronavirus/' target="_blank">
              Go to Reports
          </Button>
        ]}
      />
    );
}