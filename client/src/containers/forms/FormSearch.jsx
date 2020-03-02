import React from "react";
import { connect } from "react-redux";
import {Form, FormControl, Button} from "react-bootstrap";

class FormSearch extends React.Component {
    render() {
        let input = this.props.input;
        let button = this.props.button;
        return(
            <Form inline>
                <FormControl
                    type={input.type}
                    className={input.class}
                    placeholder={input.placeholder}/>
                <Button
                    variant={button.variant}
                    onClick={this.props.onClick}
                >{button.text}</Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    input: state.forms.search.input,
    button: state.forms.search.button
});

const mapDispatchToProps = dispacth => ({
    onClick: dispatch(() => {  })
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);