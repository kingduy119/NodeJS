import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'


export const User = (props) => {
        return(
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>The User Page</Form.Label>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <p>Username: {props.username}</p>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
};
