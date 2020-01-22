import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

import Button from 'react-bootstrap/Button';

export const Main = (props) => {
    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>The Main Page</Form.Label>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Button
                    variant="primary"
                    onClick={() => props.changeUsername('Anna')}
                >Change Username</Button>
                
            </Form.Row>
        </Form>
    );
}



