import React, { useState, useEffect, useCallback } from 'react'
import zipcodes from 'zipcodes'
import { validLocation, replaceUndefinedToNull } from '../../helpers'
import {
    Row,
    Col,
    Form,
    Input,
    InputNumber,
    Typography,
    Button,
    DatePicker,
} from 'antd'
import moment from 'moment'

import { useLocation } from 'react-router-dom'

import { getListingDetails, mlsUnique } from '../Firebase/index'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const ListForm = ({ formCB }) => {
    const [formValues, setFormValues] = useState({})
    const [locationErrors, setLocationErrors] = useState({})

    // used to get url parameters
    const query = useQuery()
    const docID = query.get('id')

    // used to import values from props
    const [form] = Form.useForm()

    // get the listing details from db
    const memoGetListingDetails = useCallback(() => {
        getListingDetails(docID).then((doc) =>
            setFormValues({
                ...doc,
                listingDate: moment(doc.listingDate),
            })
        )
    }, [setFormValues, docID])

    // determine if form is going to edit a listing
    useEffect(() => {
        if (docID) {
            memoGetListingDetails()
        }
    }, [memoGetListingDetails, docID])

    // import field values in to form when editing listing
    useEffect(() => {
        form.resetFields()
    }, [formValues, form])

    const handleFinish = (values) => {
        values = replaceUndefinedToNull(values)

        if (validLocation(values, locationErrors, setLocationErrors)) {
            formCB({
                ...values,
                listingDate: moment(values.listingDate).format('YYYY-MM-DD'),
            }).catch((error) => console.log(error))
        }
    }

    return (
        <Row justify="center">
            <Col span={6}>
                <h1>Listing Form</h1>

                <Form
                    layout={'vertical'}
                    onFinish={handleFinish}
                    initialValues={formValues}
                    form={form}
                >
                    <Form.Item
                        name="mls"
                        label="MLS#"
                        validateFirst={true}
                        rules={[
                            {
                                required: true,
                                message: 'MLS Required',
                            },

                            () => ({
                                async validator(rule, value) {
                                    let isUnique = await mlsUnique(value)

                                    if (isUnique) {
                                        return Promise.resolve()
                                    }

                                    return Promise.reject('MLS# in use!')
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="listingDate"
                        label="Listing Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please set active listing day',
                            },
                        ]}
                        initialValue={moment()}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format="YYYY-MM-DD"
                        />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Sales Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Sales Price!',
                            },
                        ]}
                        shouldUpdate
                    >
                        <InputNumber
                            name="price"
                            placeholder="Sales Price"
                            min={0}
                            step={10000}
                            formatter={(value) =>
                                `$ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                )
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '260px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="street"
                        label="Street"
                        initialValue={formValues.street}
                        rules={[
                            {
                                required: true,
                                message: 'Please input the street!',
                            },
                        ]}
                    >
                        <Input placeholder="Street" />
                    </Form.Item>
                    <Form.Item name="street2" label="Street 2">
                        <Input name="street2" placeholder="Street 2" />
                    </Form.Item>
                    <Form.Item
                        name="zip"
                        label="Zip Code"
                        validateFirst={true}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter zip code!',
                            },
                            {
                                minLength: 5,
                            },
                            () => ({
                                validator(rule, value) {
                                    if (value.length >= 5) {
                                        let result = zipcodes.lookup(value)
                                        console.log(result)
                                        if (
                                            result !== undefined &&
                                            value === result.zip
                                        ) {
                                            return Promise.resolve()
                                        }
                                    }

                                    return Promise.reject('Not a valid zipcode')
                                },
                            }),
                        ]}
                    >
                        <Input
                            name="zip"
                            placeholder="Zip Code"
                            minLength={5}
                        />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the city!',
                            },
                        ]}
                    >
                        <Input placeholder="City" />
                    </Form.Item>
                    {locationErrors.city ? (
                        <LocationError message={locationErrors.city} />
                    ) : null}
                    <Form.Item
                        name="state"
                        label="State"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the state!',
                            },
                        ]}
                    >
                        <Input placeholder="State" />
                    </Form.Item>

                    {locationErrors.city ? (
                        <LocationError message={locationErrors.state} />
                    ) : null}
                    <Form.Item name="neighborhood" label="Neighborhood">
                        <Input placeholder="Neighborhood" />
                    </Form.Item>
                    <Form.Item
                        name="bedrooms"
                        label="Bedrooms"
                        rules={[
                            {
                                required: true,
                                message: 'Please input number of bedrooms!',
                            },
                        ]}
                    >
                        <InputNumber placeholder="Bedrooms" min={0} step={1} />
                    </Form.Item>
                    <Form.Item
                        name="baths"
                        label="Bathrooms"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter amount of bathrooms',
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Bathrooms"
                            min={0}
                            step={0.5}
                        />
                    </Form.Item>
                    <Form.Item
                        name="garageSize"
                        label="Garage Size sqft"
                        rules={[
                            {
                                required: true,
                                message: 'Please garage square feet',
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Garage Square Feet"
                            min={0}
                            step={100}
                        />
                    </Form.Item>
                    <Form.Item
                        name="squareFeet"
                        label="House sqft"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter square feet!',
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Square Feet"
                            min={0}
                            step={1000}
                        />
                    </Form.Item>
                    <Form.Item
                        name="lotSize"
                        label="Lot Size"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter lot size!',
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Lot Size"
                            min={0}
                            step={500}
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea
                            name="description"
                            placeholder="Description"
                        />
                    </Form.Item>
                    <Form.Item name="photos" label="Photos">
                        <Input placeholder="Photos" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit Listing
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

const LocationError = (props) => {
    return (
        <Form.Item>
            <Typography.Text type="danger">{props.message}</Typography.Text>
        </Form.Item>
    )
}

export default ListForm
