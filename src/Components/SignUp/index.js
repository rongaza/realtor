import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { auth, createNewUser } from '../Firebase'

import { Form, Input, Button, Row, Col, Typography } from 'antd'

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
    })

    const history = useHistory()

    const [error, setError] = useState({
        error: null,
    })

    const handleFinish = () => {
        // e.preventDefault();

        createNewUser(formValues, setError)

        setFormValues({
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
        })

        history.push('/')
    }

    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    useEffect(() => {
        console.log(formValues)
    }, [formValues])

    return (
        <Row justify="center">
            <Col Col span={8} style={{ textAlign: 'center', padding: '5px' }}>
                {' '}
                <Form onFinish={handleFinish} layout="vertical">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Username"
                            name="username"
                            onChange={handleOnChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        type="email"
                        rules={[{ required: true, type: 'email' }]}
                    >
                        <Input
                            placeholder="Your Email Address"
                            type="email"
                            name="email"
                            onChange={handleOnChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="passwordOne"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            name="passwordOne"
                            onChange={handleOnChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue('passwordOne') === value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        'The two passwords that you entered do not match!'
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {error.message && <Error message={error.message} />}
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

const Error = (props) => {
    return (
        <Row justify="center" gutter={[0, 10]}>
            <Col>
                <Typography.Text type="danger">{props.message}</Typography.Text>
            </Col>
        </Row>
    )
}

export default SignUp
