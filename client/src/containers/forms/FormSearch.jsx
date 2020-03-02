import React from "react";
import { connect } from "react-redux";
import {Form, FormControl, Button} from "react-bootstrap";

class FormSearch extends React.Component {
    render() {
        let input = this.props.search.input;
        let button = this.props.search.button;
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
    search: state.navbar.search
});

const mapDispatchToProps = dispacth => ({
    onSearchInputChange: () => { console.log("Search Input onChanged()"); },
    onSearchButtonClick: () => { console.log("Search Button onClick()"); }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);