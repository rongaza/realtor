import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Typography } from 'antd'

const ListData = ({ id, data }) => {
    return (
        <Col key={id}>
            <Card style={{ width: 300, height: 200 }}>
                <Card.Meta title={`${data.street}`} />
                <Row gutter={16}>
                    <Col>
                        <Typography.Text>Price: ${data.price}</Typography.Text>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col>
                        <Typography.Text>
                            {data.city},{data.state}
                        </Typography.Text>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col>
                        <Typography.Paragraph>
                            {data.description}
                        </Typography.Paragraph>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col>
                        <Link to={`/listing/details?id=${id}`}>
                            View Listing Details
                        </Link>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default ListData
