import { Form, Input, InputNumber, Button } from 'antd';
import emailjs from 'emailjs-com';
emailjs.init("user_RNv67L5T5exWqCES7xu9q");

export default function Contact() {

    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 12 },
      };
      
    const validateMessages = {
        required: '${label} is required!',
        types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        },
        number: {
        range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = values => {
        console.log(values);
        const templateParams = {
            from_name: values.email,
            to_name: 'user_RNv67L5T5exWqCES7xu9q',
            subject: values.introduction,
       }
      
        emailjs.send(
            'service_f16yxjl', 
            'template_r5i61qt',
            templateParams,
            'user_RNv67L5T5exWqCES7xu9q'
            ).then(res => {
              console.log('Email successfully sent!')
            })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      };


    return (
        <div>
            <h1 style={{textAlignVertical: "center",textAlign: "center"}}>Contact</h1>
            <Form {...layout} onFinish={onFinish}s name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}