import React from "react";

import { Form, Input, Button, message } from 'antd';

import sendMail from "../../services/sendMail";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
        <Form onFinish={this.submitForm} name="nest-messages" className='content-position'>
              <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                  <Input />
              </Form.Item>
              <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                  <Input />
              </Form.Item>
              <Form.Item name={['user', 'introduction']} label="Introduction">
                  <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                      Submit
                  </Button>
              </Form.Item>
          </Form>
    );
  }

  
  submitForm = ({user}) => {
    sendMail(user)
    .then(({data}) => {
      message.success('Mail was sent!', 5);
    })
    .catch( err => {
        message.error('Mail wasn\'t sent!', 5);
    });
  }
}