import React, { Component } from "react";
import { Checkbox } from "react-bootstrap";

export class CheckBox extends React.Component{
      constructor(props){
        super(props);
        this.state = {
            isChecked: false
        }
    }

    toggleCheckboxChange = () =>{
        const {handleCheckboxChange, label} = this.props;
        this.setState(({isChecked}) => (
            {
                isChecked: !isChecked
            }
        ));

       handleCheckboxChange(label);
    }

    render(){
        const { label } = this.props;
        const { isChecked } = this.state;

        return(
            <div className="checkbox">
            <label>
                <input type="checkbox" value={label} checked={isChecked} onChange={this.toggleCheckboxChange} />
                {label}
            </label>
            </div>
        );
    }

}
