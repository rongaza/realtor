import React, { useState, useEffect } from 'react'
import { validLocation } from '../../helpers'
import {
    Row,
    Col,
    Form,
    Input,
    Typography,
    Button,
    InputNumber,
    DatePicker,
} from 'antd'

const AddListing = ({ addDoc }) => {
    const [formValues, setFormValues] = useState({})
    const [locationErrors, setLocationErrors] = useState({})

    const handleChange = (e) => {
        e.persist()
        setFormValues((formValues) => {
            return {
                ...formValues,
                [`${e.target.name}`]: e.target.value,
            }
        })
    }

    const handleDateChange = (date) => {
        setFormValues((formValues) => {
            return {
                ...formValues,
                date,
            }
        })
    }

    const handlePriceChange = (price) => {
        setFormValues((formValues) => {
            return {
                ...formValues,
                price,
            }
        })
    }

    const handleSubmit = () => {
        console.log('form submit')
        if (validLocation(formValues, locationErrors, setLocationErrors)) {
            addDoc(formValues)
        }
    }

    // useEffect(() => {
    //     console.log(locationErrors)
    // }, [locationErrors])

    return (
        <Row justify="center">
            <Col span={6}>
                <h1>Add Listing</h1>
                <Form layout={'vertical'} onFinish={handleSubmit}>
                    <Form.Item
                        label="MLS Number"
                        name="mls"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the MLS Number.',
                            },
                        ]}
                    >
                        <Input
                            name="mls"
                            value={formValues.mls}
                            placeholder="MLS Number"
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="street1"
                        label="Street"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the street!',
                            },
                        ]}
                    >
                        <Input
                            name="street"
                            value={formValues.street}
                            placeholder="Street"
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item name="street2" label="Street 2">
                        <Input
                            name="street2"
                            value={formValues.street2}
                            placeholder="Street 2"
                            onChange={handleChange}
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
                        <Input
                            name="city"
                            value={formValues.city}
                            placeholder="City"
                            onChange={handleChange}
                        />
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
                        <Input
                            name="state"
                            value={formValues.state}
                            placeholder="State"
                            onChange={handleChange}
                        />
                    </Form.Item>
                    {locationErrors.city ? (
                        <LocationError message={locationErrors.state} />
                    ) : null}
                    <Form.Item
                        name="zip"
                        label="Zip Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter zip code!',
                            },
                        ]}
                    >
                        <Input
                            name="zip"
                            value={formValues.zip}
                            placeholder="Zip Code"
                            onChange={handleChange}
                            minLength={5}
                        />
                    </Form.Item>
                    {locationErrors.zip ? (
                        <LocationError message={locationErrors.zip} />
                    ) : null}
                    <Form.Item name="neighborhood" label="Neighborhood">
                        <Input
                            name="neighborhood"
                            value={formValues.neighborhood}
                            placeholder="Neighborhood"
                            onChange={handleChange}
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
                    >
                        <InputNumber
                            name="price"
                            value={formValues.price}
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
                            onChange={handlePriceChange}
                        />
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
                    >
                        <DatePicker
                            name="listingDate"
                            style={{ width: '100%' }}
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                        />
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
                        <Input
                            name="bedrooms"
                            value={formValues.bedrooms}
                            placeholder="Bedrooms"
                            min={0}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="bathrooms"
                        label="Bathrooms"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter amount of bathrooms',
                            },
                        ]}
                    >
                        <Input
                            name="baths"
                            value={formValues.baths}
                            placeholder="Bathrooms"
                            min={0}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="garage-size"
                        label="Garage Size"
                        rules={[
                            {
                                required: true,
                                message: 'Please garage square feet',
                            },
                        ]}
                    >
                        <Input
                            name="garageSize"
                            value={formValues.garageSize}
                            placeholder="Garage Square Feet"
                            min={0}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="square-feet"
                        label="Square Feet"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter square feet!',
                            },
                        ]}
                    >
                        <InputNumber
                            value={formValues.squareFeet}
                            placeholder="Square Feet"
                            min={0}
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
                        <Input
                            name="lotSize"
                            value={formValues.lotSize}
                            placeholder="Lot Size"
                            min={0}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item name="photos" label="Photos">
                        <Input
                            name="photos"
                            placeholder="Photos"
                            onChange={handleChange}
                        />
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

export default AddListing
