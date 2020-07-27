import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Row, Col, Typography, Form, Input, Button } from 'antd'

import { auth } from '../Firebase'
import { AuthContext } from '../Firebase/context'
import * as SESSION from '../Firebase/authReducer'

const INITIAL_STATE = {
    email: '',
    password: '',
}

const SignIn = () => {
    const context = useContext(AuthContext)

    const [formValues, setFormValues] = useState({ ...INITIAL_STATE })
    const [error, setError] = useState({ error: null })

    let history = useHistory()

    const handleOnFinish = () => {
        auth.signInWithEmailAndPassword(formValues.email, formValues.password)
            .then((authUser) => {
                context.authUserDispatch({
                    type: SESSION.SIGN_IN,
                    payload: authUser,
                })
                history.push('/')
            })
            .catch((error) => setError(error))
    }

    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    return (
        <Row justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Typography.Title>Sign In</Typography.Title>
                <Form
                    initialValues={{ remember: true }}
                    onFinish={handleOnFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input
                            name="email"
                            placeholder="Email Address"
                            onChange={handleOnChange}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            name="password"
                            placeholder="Password"
                            onChange={handleOnChange}
                        />
                    </Form.Item>
                    {error && <Error message={error.message} />}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
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

export default SignIn
