import React, { Component } from 'react';

/** The input content component */
class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue
        };

        this.onChange = (e) => this.onInputChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value);
        }
    }

    onInputChange(e) {
        let value = e.target.value;
        this.setState({value: value});
    }

    render() {
        return (
            <input type="text" placeholder={this.props.placeholder} className="mm-popup__input" value={this.state.value} onChange={this.onChange} />
        )
    }
}

export default Input;
